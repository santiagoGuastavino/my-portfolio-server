import express from 'express'
import 'dotenv/config'
// import mongoose from 'mongoose'

// import mailerRouter from './routes/mailer.js'
import fileRouter from './routes/files.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.use('/mailer', mailerRouter)
app.use('/file', fileRouter)

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message })
})

const PORT = process.env.PORT || 3001
// await mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.i7dpk1w.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`)
// try {
//   app.listen(PORT, () => console.log(`Serving @ ${PORT}`))
// } catch (err) {
//   console.log(err)
// }
app.listen(PORT, () => console.log(`Serving @ ${PORT}`))
