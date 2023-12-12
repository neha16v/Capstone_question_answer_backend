import express from 'express'
import {answer} from '../Controllers/answer.controller.js'

const router=express.Router()

router.post("/answer",answer)

export default router