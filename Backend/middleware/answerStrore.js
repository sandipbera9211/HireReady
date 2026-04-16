import MockInterviewAnswer from "../models/MockInterviewAnswer.js";
export const answerStore=async(req,res,next)=>{
try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: please log in" });
    } 
    const {interviewId,answers}=req.body;
 if (!interviewId || !answers) {
      return res.status(400).json({
        message: "InterviewId and answers are required"
      });
    }
    const answersArray = Object.values(answers);
   await MockInterviewAnswer.create({
        userId,
        interviewId,
         answers: answersArray
    })
     req.savedAnswers = answersArray;
    req.interviewId = interviewId;
    next();
} catch (error) {
    return res.status(500).json({
        message:error.message
    })
}
}