import express from 'express'
import {comments} from '../Controllers/comments.controller.js'

const router=express.Router()

router.post("/comments/:id",comments)

export default router