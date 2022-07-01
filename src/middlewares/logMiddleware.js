import { appendFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const logFile = join(__dirname + './../data/log.txt')

export default function logMiddleware (req, res, next) {
  const today = new Date()
  const yyyy = today.getFullYear()
  let mm = today.getMonth() + 1
  let dd = today.getDate()

  if (dd < 10) dd = '0' + dd
  if (mm < 10) mm = '0' + mm

  const dateToday = dd + '/' + mm + '/' + yyyy

  const text = `Requested ${dateToday} ${req.url} \r\n`
  appendFileSync(logFile, text)
  next()
}
