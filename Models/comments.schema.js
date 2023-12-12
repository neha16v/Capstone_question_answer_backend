import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questions",
  },
  comment: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
  user: Object,
});

const Comments = mongoose.model("comments", CommentSchema);

export default Comments;
