import Answer from "../Models/answer.schema.js";
import dotenv from "dotenv";
dotenv.config();

export const answer = async(req,res)=>{
    try {
      const {question_id,answer,user}=req.body
      const newAnswer=new Answer({question_id,answer,user})
      await newAnswer.save()
      res.status(200).json({ message: "Answered", data: newAnswer });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: " Answer failed" });
    }
  }