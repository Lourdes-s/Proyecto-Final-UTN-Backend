import express from 'express'
import authMiddleware from '../middlewares/auth.middleware.js'
import { getContactsController, postContactController, getContactController } from '../controllers/contact.controllers.js'

const contactRouter = express.Router()

contactRouter.get('/', authMiddleware, getContactsController)
contactRouter.get('/:user_id_contact', authMiddleware, getContactController)
contactRouter.post('/', authMiddleware, postContactController)

export default contactRouter