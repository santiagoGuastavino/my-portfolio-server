import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const file = path.resolve(__dirname + '/../files/resume.pdf')

export function serveFile (req, res, next) {
  res.download(file)
}
