import AppError from "../helpers/errors/app.error.js"
import { verifyEmail, verifyMinLength, verifyString, verifyValidator } from "../helpers/validations.helpers.js"
import bcrypt from "bcrypt"
import UserRepository from "../repository/user.repository.js"
import User from "../model/user.model.js"
import jwt from 'jsonwebtoken'
import ENVIROMENT from "../config/eviroment.js"
import { sendResgisterMail, sendRecoveryMail } from "../helpers/mail.helpers.js"

const validateRegister = (name, password, email) => {
    const validator = {
        name: {
            value: name,
            validation: [
                verifyString,
                (field_name, field_value) => verifyMinLength(field_name, field_value, 5)
            ]
        },
        password: {
            value: password,
            validation: [
                verifyString,
                (field_name, field_value) => verifyMinLength(field_name, field_value, 10)
            ]
        },
        email: {
            value: email,
            validation: [
                verifyEmail,
                (field_name, field_value) => verifyMinLength(field_name, field_value, 10)
            ]
        }
    }
    return verifyValidator(validator)
}

const validateLogin = (password, email) => {
    const validator = {
        password: {
            value: password,
            validation: [
                verifyString,
                (field_name, field_value) => verifyMinLength(field_name, field_value, 10)
            ]
        },
        email: {
            value: email,
            validation: [
                verifyEmail,
                (field_name, field_value) => verifyMinLength(field_name, field_value, 10)
            ]
        }
    }
    return verifyValidator(validator)
}

const validateRecovery = (password, reset_token) => {
    const validator = {
        password: {
            value: password,
            validation: [
                verifyString,
                (field_name, field_value) => verifyMinLength(field_name, field_value, 10)
            ]
        },
        reset_token: {
            value: reset_token,
            validation: [
                verifyString
            ]
        }
    }
    return verifyValidator(validator)
}

export const registerController = async (req, res, next) => {
    try{
        const { name, password, email } = req.body
        const errors = validateRegister(name, password, email)
        if (errors !== undefined) {
            next(new AppError(errors, 400))
            return
        }

        const validationToken = jwt.sign({ email: email }, ENVIROMENT.SECRET_KEY, { expiresIn: '1d' })
        const result = await sendResgisterMail(validationToken, email)

        const hashedPassword = await bcrypt.hash(password, 10)
        const userId = await UserRepository.createUser(User.createUserRegister(name, email, hashedPassword, true, false))

        return res.status(201).json({})
    }
    catch (error){
        next(error)
    }
}

export const verifyEmailController = async (req, res, next) => {
    try {
        const { validation_token } = req.params
        const payload = jwt.verify(validation_token, ENVIROMENT.SECRET_KEY)
        const emailToVerify = payload.email
        const userToVerify = await UserRepository.getUserByEmail(emailToVerify)
        userToVerify.verify_email = true

        await UserRepository.updateUser(userToVerify)
        return res.status(200).json({
            ok: true,
            message: 'El correo electronico ha sido enviado'
        })
    }
    catch (error) {
        next(error)
    }
}


export const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const errors = validateLogin(password, email)
        if (errors !== undefined) {
            next(new AppError(errors, 400))
            return
        }

        const user = await UserRepository.getUserByEmail(email)
        if(!user){
            next(new AppError("User not found", 404))
            return
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password)
        if (!isCorrectPassword) {
            next(new AppError("Incorrect password", 401))
            return
        }

        
        if (!user.verify_email) {
            next(new AppError("User is not verify", 403))
            return
        }

        const userPublic = User.createUserToken(user)
        const access_token = jwt.sign({ userPublic }, ENVIROMENT.SECRET_KEY, { expiresIn: '1d' })

        return res.status(200).json({
            access_token: access_token,
            user: userPublic 
        })
    }
    catch (error) {
        next(error)
    }
}

export const forgotPasswordController = async (req, res, next) => {
    try {
        const { email } = req.body  
        const user = await UserRepository.getUserByEmail(email)
        if (!user) {
            next(new AppError("User not found", 404))
            return
        }
        const reset_token = jwt.sign({ email: email }, ENVIROMENT.SECRET_KEY, { expiresIn: '1d' })
        const result = await sendRecoveryMail(reset_token, email)

        return res.status(200).json({
            ok: true,
            message: 'El correo electronico ha sido enviado'
        })

    }
    catch (error) {
        next(error)
    }
}

export const recoveryPasswordController = async (req, res, next) => {
    try {
        const { password, reset_token } = req.body   
        const errors = validateRecovery(password, reset_token)
        if (errors !== undefined) {
            next(new AppError(errors, 400))
            return
        }     
        const {email} = jwt.verify(reset_token, ENVIROMENT.SECRET_KEY)
        const user = await UserRepository.getUserByEmail(email)
        if(!user){
            next(new AppError("User not found", 404))
            return
        }
        const passwordHash = await bcrypt.hash(password, 10)        
        user.password = passwordHash

        await UserRepository.updateUser(user)
        res.status(200).json({})
    }
    catch (error) {
        next(error)
    }
}

