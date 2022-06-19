import express from 'express'
import { serveFile } from '../controllers/filesController.js'

const router = express.Router()

router.get('/', serveFile)

export default router
