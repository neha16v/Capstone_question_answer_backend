import express from 'express'
import cors from 'cors'
import connectDB from './Database/dbConfig.js'
import userRouter from './Router/user.router.js'
import answerRouter from './Router/answer.router.js'
import commentsRouter from './Router/comments.router.js'
import dotenv from 'dotenv'
const app=express()

dotenv.config()
const port=process.env.PORT

app.use(cors())
app.use(express.json())
app.use("/api/user",userRouter)
app.use("/api/answer",answerRouter)
app.use("/api/comments",commentsRouter)

connectDB()

app.listen(port,()=>{
    console.log("App is listening",port);
})