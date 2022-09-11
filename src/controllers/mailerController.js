import { createTransport } from 'nodemailer'
import nodemailerSendgrid from 'nodemailer-sendgrid'

const apiKey = process.env.SENDGRID_KEY

const transport = createTransport(
  nodemailerSendgrid({
    apiKey
  })
)

export async function sendMail (req, res, next) {
  const { name, email, message } = req.body

  const result = await transport.sendMail({
    from: 'smguastavino@gmail.com',
    to: 'smguastavino@gmail.com',
    subject: 'hello',
    html: `
      <span>from: </span>
      <strong>${name}</strong>
      <br>
      <span>email: </span>
      <strong>${email}</strong>
      <br>
      <p>${message}</p>
    `
  })

  try {
    return res.status(200).json({
      success: 'Message delivered',
      code: result.stausCode,
      message: result.statusMessage
    })
  } catch (err) {
    next(err)
  }
}
