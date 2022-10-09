import express from 'express'
import 'dotenv/config'
import cors from 'cors'

import mailerRouter from './routes/mailer.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/mailer', mailerRouter)
app.use('/', (req, res, next) => {
  console.log('Server ready to accept requests')
  res.status(204).send()
})

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Serving @ ${PORT}`))
