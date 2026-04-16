import ResumeAnalysis from "../models/ResumeAnalysis.js";
import { dayWisePreparation, generatePreparationPlan } from "../service/AiService.js";
import { extractTextFromPDF } from "../service/PdfExtractor.js";
export const PreparationPlan=async(req,res)=>{
    try {
         const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: please log in" });
    }
        const analysis=await ResumeAnalysis.findOne({userId}).sort({createdAt:-1});
        if(!analysis){
            return res.status(404).json({message:"No analysis found for this user"});
        }
        const  matchScore=analysis.matchScore;
        const missingKeyWords=analysis.missingKeyWords;
        const strengths=analysis.strengths;
        const weaknesses=analysis.weaknesses;
        const suggestions=analysis.suggestions;
       const preparation=await generatePreparationPlan(matchScore,missingKeyWords,strengths,weaknesses,suggestions);
       return res.status(200).json({message:"Preparation plan generated successfully",preparation});
    } catch (error) {
        console.log(error); 
        return res.status(500).json({message:"Internal server error"});
    }
}

export const dayPreparation=async(req,res)=>{
    try {
     const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: please log in" });
    }
    const file=req.file;
    if(!file){
        return res.status(400).json({message:"Resume file is required"});
    }
   const resumeText=await extractTextFromPDF(file.buffer);
   console.log(resumeText);
   
    const {jobDescription,totalDays,gapAreas}=req.body;
    if(!jobDescription || !totalDays || !gapAreas){
        return res.status(400).json({message:"Job description, total days, and gap areas are required"});
    }
    const preparationPlan=await dayWisePreparation(resumeText,jobDescription,totalDays,gapAreas);
    return res.status(200).json({message:"Day-wise preparation plan generated successfully",preparationPlan});
    } catch (error) {
        console.error("Error generating day-wise preparation plan:", error);
        return res.status(500).json({message:"Internal server error"});
    }
}
