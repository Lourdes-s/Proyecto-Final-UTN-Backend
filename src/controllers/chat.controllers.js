import AppError from "../helpers/errors/app.error.js"
import { verifyMaxLength, verifyString, verifyValidator } from "../helpers/validations.helpers.js"
import ChatRepository from "../repository/chat.repository.js"
import ContactRepository from "../repository/contact.repository.js"

export const getChatsController = async (req, res, next) => {
    try{
        const { page, per_page } = req.query
        const chats = await ChatRepository.getChats(req.user.id, Number(page), Number(per_page))

        return res.status(200).json(chats)
    }
    catch (error){
        next(error)
    }
}

export const getChatController = async (req, res, next) => {
    try{
        const { page, per_page } = req.query
        const { user_id_contact } = req.params

        const isContact = await ContactRepository.isContact(req.user.id, user_id_contact)

        if (!isContact) {
            return next(new AppError("No tienes permiso para acceder a este chat.", 403))
        }

        const messages = await ChatRepository.getChat(req.user.id, user_id_contact, Number(page), Number(per_page))

        return res.status(200).json(messages)
    }
    catch (error){
        next(error)
    }
}

const validatePostMessage = (content) => {
    const validator = {
        name: {
            value: content,
            validation: [
                verifyString,
                (field_name, field_value) => verifyMaxLength(field_name, field_value, 255)
            ]
        }
    }
    return verifyValidator(validator)
}

export const postMessageController = async (req, res, next) => {
    try{
        const { user_id_contact } = req.params
        const { content } = req.body

        const errors = validatePostMessage(content)
        if (errors !== undefined) {
            next(new AppError(errors, 400))
            return
        }

        const messageId = await ChatRepository.createMessage({
            issurer_id: req.user.id, 
            receiver_id: user_id_contact, 
            content: content
        })

        return res.sendStatus(201)
    }
    catch (error){
        next(error)
    }
}