import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
  id: String,
  question: String,
  answer: String,
  title: String,
  body: String,
  tags: [
    {
      type:String,
    }
  ],
  created_at: {
    type: Date,
    default: Date.now(),
  },
  user: Object,
  comment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comments",
  },
});

const User = mongoose.model("User", userScheme);

export default User;
