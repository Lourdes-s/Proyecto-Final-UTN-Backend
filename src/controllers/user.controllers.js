import AppError from "../helpers/errors/app.error.js"
import User from "../model/user.model.js"
import UserRepository from "../repository/user.repository.js"

export const getUserController = async (req, res, next) => {
    try{
        const { id } = req.params

        if (req.user.id != id) {
            next(new AppError("User is not allow", 403))
            return
        }

        const user = await UserRepository.getUser(id)
        if(!user){
            next(new AppError("User not found", 404))
            return
        }

        return res.status(200).json(User.createUserPublic(user))
    }
    catch (error){
        next(error)
    }
}

const validateUpdate = (thumbnail, telephone, public_state, description_content, address_content) => {
    const validator = {
        thumbnail: {
            value: thumbnail,
            validation: [
                verifyString
            ]
        },
        telephone: {
            value: telephone,
            validation: [
                verifyString,
                (field_name, field_value) => verifyMinLength(field_name, field_value, 10)
            ]
        },
        public_state: {
            value: public_state,
            validation: [
                verifyString,
                (field_name, field_value) => verifyMinLength(field_name, field_value, 10)
            ]
        },
        description_content: {
            value: description_content,
            validation: [
                verifyString,
                (field_name, field_value) => verifyMinLength(field_name, field_value, 10)
            ]
        },
        address_content: {
            value: address_content,
            validation: [
                verifyString,
                (field_name, field_value) => verifyMinLength(field_name, field_value, 10)
            ]
        }
    }
    return verifyValidator(validator)
}

export const updateUserController = async (req, res, next) => {
    try{
        const { id } = req.params
        const { thumbnail, telephone, public_state, description_content, address_content } = req.body

        const errors = validateUpdate(thumbnail, telephone, public_state, description_content, address_content)
        if (errors !== undefined) {
            next(new AppError(errors, 400))
            return
        }

        if (req.user.id != id) {
            next(new AppError("User is not allow", 403))
            return
        }

        const user = await UserRepository.getUser(id)
        if(!user){
            next(new AppError("User not found", 404))
            return
        }
        user.thumbnail = thumbnail
        user.telephone = telephone
        user.public_state = public_state
        user.description_content = description_content
        user.address_content = address_content

        const userId = await UserRepository.updateUser(user)

        return res.status(200).json(User.createUserPublic(user))
    }
    catch (error){
        next(error)
    }
}
