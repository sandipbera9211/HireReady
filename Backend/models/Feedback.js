import mongoose from "mongoose";

const feedbackSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    interviewId:{type:mongoose.Schema.Types.ObjectId,ref:"MockInterview",required:true},

    totalScore:{
        type:Number,min:0,max:100,required:true
    },
    summary:{type:String,required:true}, //this is for ai feedback summary

    feedback:[
        {
            question:{type:String,required:true},
            answer:{type:String,default:""},
            score:{type:Number,min:0,max:10,required:true},
            strength:{type:String,required:true},
            improvement:{type:String,required:true},
        }
    ]
},{timestamps:true});


const Feedback=mongoose.model("Feedback",feedbackSchema);
export default Feedback;