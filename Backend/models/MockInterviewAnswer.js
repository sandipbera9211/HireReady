import mongoose from "mongoose";

const MockInterviewAnswerSchema= new mongoose.Schema({
    interviewId:{type:String,required:true},
    userId:{type:String,required:true},
    answers:[String]
})

const  MockInterviewAnswer=mongoose.model("MockInterviewAnswer", MockInterviewAnswerSchema);
export default MockInterviewAnswer;