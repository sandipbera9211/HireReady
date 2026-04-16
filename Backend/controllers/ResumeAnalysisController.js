import ResumeAnalysis from "../models/ResumeAnalysis.js";
import { analyzeWithAI,generateOptimizedResume } from "../service/AiService.js";
import { extractTextFromPDF } from "../service/PdfExtractor.js";

export const analyzeResume = async (req, res) => {
  
    try {
     const {jobDescription} = req.body;
      console.log(req.user);
     const userId=req.user._id;
    
     
     if(!userId){
        return res.status(401).json({message:"Unauthorized: please log in"});
     }
     const resuumeFile=req.file;
     if(!resuumeFile){
        return res.status(400).json({message:"Resume file is required"});
     }
     if(!jobDescription){
        return res.status(400).json({message:"Job description is required"});
     }
     
        const resumeText=await extractTextFromPDF(resuumeFile.buffer);

        const analysisRes=await analyzeWithAI(resumeText,jobDescription);
        const analysis=await ResumeAnalysis.create({
            userId,
            resumeText,
            jobDescription,
            matchScore:analysisRes.matchScore,
            missingKeyWords:analysisRes.missingKeyWords,
            strengths:analysisRes.strengths,
            weaknesses:analysisRes.weaknesses,
            suggestions:analysisRes.suggestions
        })
          
           
        return res.status(200).json({message:"Resume analyzed successfully",analysis});
    } catch (error) {
        console.error("Error analyzing resume:", error);
        return res.status(500).json({message:"Internal server error"});
    }
}

export const DownloadResume=async(req,res)=>{
    try {
        
        const userId=req.user?._id;
        console.log(userId);
        
        const analysis=await ResumeAnalysis.findOne({userId}).sort({createdAt:-1});
        if(!analysis){
            return res.status(404).json({message:"No analysis found for this user"});   
        }
        const resumeText=analysis.resumeText;
        const missingKeyWords=analysis.missingKeyWords;
        const jobDescription=analysis.jobDescription;
        const enhancedResume=await generateOptimizedResume(resumeText,jobDescription,missingKeyWords);
        
       res.setHeader("Content-Type", "application/x-tex");
        res.setHeader("Content-Disposition", `attachment; filename="optimized_resume.tex"`);
           return res.status(200).send(enhancedResume)
    } catch (error) {
        console.error("Error downloading resume:", error);
        return res.status(500).json({message:"Internal server error"});
    }
}

export const history=async(req,res)=>{
    
   try {
    const userId=req.user?._id;
        if(!userId){
            return res.status(404).json({message:"Log in first"}); 
        }
    const data=await ResumeAnalysis.find({userId}).sort({createdAt:-1});
    return res.status(200).json({
        message:"Complete analysis history",
        data
    })
   } catch (error) {
    return res.status(404).json({message:"No analysis found for this user",error}); 
   }
}