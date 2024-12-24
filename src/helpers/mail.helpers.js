import nodemailer from 'nodemailer'
import ENVIROMENT from "../config/eviroment.js"

const trasporterEmail = nodemailer.createTransport({
    service: 'gmail',
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: ENVIROMENT.EMAIL_USER,
        pass: ENVIROMENT.EMAIL_PASSWORD,
    }
})

export const sendResgisterMail = async (validationToken, email) => {
    const redirectUrl = `${ENVIROMENT.BACKEND_URL}/auth/verify-email/` + validationToken
    const result = await trasporterEmail.sendMail({
        subject: 'Valida tu email',
        to: email,
        html: `
            <h1>Valida tu mail</h1>
            <p>Para validar tu mail haz click <a href='${redirectUrl}'>aqui</a></p>
        `
    })
    return result
}

export const sendRecoveryMail = async (reset_token, email) => {
    const resetUrl = `${ENVIROMENT.FRONTEND_URL}/recovery-password/${reset_token}`
    const result = await trasporterEmail.sendMail({
        subject: 'Restablecer contraseña',
        to: email,
        html: `
            <h1>Para poder restablecer tu contraseña haz click <a href='${resetUrl}'> aqui </a></h1>
        `
    })
    return result
}