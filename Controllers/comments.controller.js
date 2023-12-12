import Comments from "../Models/comments.schema.js";
import dotenv from "dotenv";
dotenv.config();

export const comments = async(req,res)=>{
    try {
      const question_id=req.params.id
      const {comment,user}=req.body
      const newcomment=new Comments({question_id,comment,user})
      await newcomment.save()
      res.status(200).json({ message: "Commented", data: newcomment });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: " Comment failed" });
    }
  }