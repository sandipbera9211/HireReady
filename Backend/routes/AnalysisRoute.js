import  express from "express";
import { analyzeResume,DownloadResume,history } from "../controllers/ResumeAnalysisController.js";
import upload from "../middleware/multer.js";
import { protect } from "../middleware/authmiddleware.js";
const AnalysisRouter = express.Router();

AnalysisRouter.post("/analyze",protect,upload.single("resume"),analyzeResume);
AnalysisRouter.get("/analyze/download",protect,DownloadResume);
AnalysisRouter.get("/analyze/history",protect,history);
export default AnalysisRouter;