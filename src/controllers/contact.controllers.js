import AppError from "../helpers/errors/app.error.js"
import { verifyEmail, verifyMinLength, verifyValidator } from "../helpers/validations.helpers.js"
import ContactRepository from "../repository/contact.repository.js"
import UserRepository from "../repository/user.repository.js"

export const getContactsController = async (req, res, next) => {
    try{
        const { page, per_page } = req.query

        const contacts = await ContactRepository.getContacts(req.user.id, Number(page), Number(per_page))

        return res.status(200).json(contacts)
    }
    catch (error){
        next(error)
    }
}

export const getContactController = async (req, res, next) => {
    try{
        const { user_id_contact } = req.params

        const contact = await ContactRepository.getContact(req.user.id, user_id_contact)
        if(!contact){
            next(new AppError("Contact not found", 404))
            return
        }

        return res.status(200).json(contact)
    }
    catch (error){
        next(error)
    }
}

const validatePostContact = (email) => {
    const validator = {
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

export const postContactController = async (req, res, next) => {
    try{
        const { email } = req.body

        const errors = validatePostContact(email)
        if (errors !== undefined) {
            next(new AppError(errors, 400))
            return
        }

        const contactUser = await UserRepository.getUserByEmail(email)
        if(!contactUser){
            next(new AppError("Contact user not found", 404))
            return
        }

        const contactId = await ContactRepository.postContacts({
            user_id: req.user.id, 
            user_id_contact: contactUser.id
        })

        return res.status(201).json({ message: "Contacto creado exitosamente" })
    }
    catch (error){
        next(error)
    }
}