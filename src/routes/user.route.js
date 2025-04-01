import express from 'express'
import { getUserController, updateUserController, findEmailUserController } from '../controllers/user.controllers.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const userRouter = express.Router()

userRouter.get('/:id', authMiddleware, getUserController)
userRouter.put('/:id', authMiddleware, updateUserController)
userRouter.post('/check-email', authMiddleware, findEmailUserController)

export default userRouter