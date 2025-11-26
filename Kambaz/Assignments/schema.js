import mongoose from "mongoose";
const schema = new mongoose.Schema({
  _id: String,
  title: String,
  course: String,
  description: String,
  group: {
    type: String,
    enum: ["Assignments", "Quizzes", "Projects", "In-Class Activities"],
    default: "Assignments",
  },
  due: String,
  from: String,
  until: String,
  points: Number,
});
export default schema;
