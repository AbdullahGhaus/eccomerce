const nodemailer = require("nodemailer")

const sendEmail = async (options) => {

    const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_USER,
            password: process.env.SMTP_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.SMTP_FROM,
        to: options.email,
        subject: options.subject,
        text: options.message
    }
}

module.exports = sendEmail