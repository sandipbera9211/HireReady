import Feedback from "../models/Feedback.js";
import MockInterview from "../models/MockInterview.js";
import { feedbackReport, generateMockInterviewQuestions } from "../service/AiService.js";

export const generateMockInterview=async(req,res)=>{
 try {
       const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: please log in" });
    }
    const difficulty=req.body.difficulty.toLowerCase();
    const questionTypes=req.body.questionTypes.toLowerCase();
    if(!difficulty || !questionTypes){
       return res.status(400).json({
            message:"Difficulty and question types are required"
        })
    }

    const selectedTopics=questionTypes;

    const questions= await generateMockInterviewQuestions(difficulty,selectedTopics);

   const interview= await MockInterview.create({
        userId,
        difficulty,
        selectedTopics,
        questions
    })
    return res.status(201).json({
        message:"Mock Interview generated successfully.",
        questions,
        interview:interview._id
    })
 } catch (error) {
    console.log(error);
    res.status(500).json({
        message:error.message
    })
    
 }
}

export const feedbackStore=async(req,res)=>{
    try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: please log in" });
    }
    const answers=req.savedAnswers;
    const interviewId=req.interviewId;
    if(!interviewId || !answers ){
           return res.status(401).json({ message: "Give a proper Interview" });
    }
      const interview=await MockInterview.findOne({_id:interviewId}).select("difficulty selectedTopics  questions");
      if (!interview) {
          return res.status(404).json({ message: "Interview not found" });
         }
      const { difficulty, selectedTopics: questionTypes, questions } = interview;
      const report=await feedbackReport(answers,questions,difficulty,questionTypes);
      console.log(report);
      const feedbackFullReport=await Feedback.create({
        userId,
        interviewId,
        summary:report.summary,
        totalScore:report.totalScore,
        feedback:report.feedbacks
      })
      console.log(feedbackFullReport);
      
      return res.status(201).json({message:"Feedback Created Successfully",id:feedbackFullReport._id})
    } catch (error) {
         console.log(error);
    res.status(500).json({
        message:error.message
    })
    }
}


export const getFeedbackReport=async(req,res)=>{
try {
  const {id}=req.params;
  const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

   const report = await Feedback.findOne({
  _id: id,
  userId: req.user._id
});
   if(!report){
    return res.status(404).json({
    message:"Feedback Report not found."
   })
   }
   return res.status(200).json({
    message:"Feedback Report fetched successfully.",
    report
   })
} catch (error) {
  console.log(error);
    res.status(500).json({
        message:error.message
    })
}
}
