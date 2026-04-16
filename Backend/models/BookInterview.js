import mongoose from "mongoose";

const BookInterviewSchema=new mongoose.Schema({
  userId:{type:String,required:true},  

  difficulty:{type:String,enum:['easy','medium','hard'],default:'medium'},
  questionTypes:[{type:String,enum:['technical','behavioral','role-based','hr','system-design','coding','situational']}],
 
},{timestamps:true});

const BookInterview=mongoose.model("BookInterview",BookInterviewSchema);
export default BookInterview;