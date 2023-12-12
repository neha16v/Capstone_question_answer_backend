import User from "../Models/user.schema.js";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
dotenv.config();

export const question = async(req,res)=>{
  try {
    const {title,body,tags,user}=req.body
    const newQuestion=new User({ title, body, tags, user })
    await newQuestion.save()
    res.status(200).json({ message: "Question raised", data: newQuestion });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: " Question failed" });
  }
}

export const getquestion=async(req,res)=>{
  try {
    const question=await User.find()
    res.status(200).json(question)
  } catch (error) {
    console.log(error);
  }
}

export const answer = async (req, res) => {
  try {
    const { question_id } = req.body;
    console.log(req.params);
    const { answer } =  req.body ;
    console.log(req.body);
    const objectId = new ObjectId(question_id);
    const questionn = await User.findByIdAndUpdate(objectId,{
      answer:answer
    });
    console.log("Question",questionn);
    if (!questionn) {
      return res.status(404).json({ error: "Question not found" });
    }
    await questionn.save()
    res.status(200).json({ message: "Answered", data: answer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Answer failed" });
  }
};

export const updateUser=async(req,res)=>{
  try {
      const{id}=req.params
      const{username,email,password}=req.body
      const user=await User.findOne({_id:id})
      if(!user){
          return response.status(401).json({message:"User not found"})
      }
      const hashPassword=await bcrypt.hash(password,10)
      const result= await User.updateOne({_id:id},{username,email,password:hashPassword})
      if(result.matchedCount===0){
          return res.status(401).json({message:"user not found"})
      }
      const updateUser=await User.findById(id)
      res.status(200).json({message:"Updated succesfully",data:updateUser})
  } catch (error) {
      console.log(error);
      res.status(500).json({error:"Update failed"})
  }
}

export const deleteUser=async(req,res)=>{
  try {
      const userId=req.params.id
      const deleteUser=await User.deleteOne({_id:userId})
      if(deleteUser.deletedCount===0){
          return res.status(404).json({message:"user not found"})
      }
      res.status(200).json({message:"deleted successfully"})
  } catch (error) {
      console.log(error);
      res.status(500).json({error:"deletion failed"})
  }
}   