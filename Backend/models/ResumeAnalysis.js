import mongoose from "mongoose";

const ResumeAnalysisSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    resumeText:{type:String,required:true},
    jobDescription:{type:String,required:true},
    matchScore:{type:Number, min:0, max:100, required:true},
    missingKeyWords:[String],
    strengths:[String],
    weaknesses:[String],
    suggestions:[String],
},{timestamps:true});

const ResumeAnalysis=mongoose.model("ResumeAnalysis",ResumeAnalysisSchema);
export default ResumeAnalysis;