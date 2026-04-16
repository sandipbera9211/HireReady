import express from "express";
import { bookInterview } from "../controllers/BookInterviewController.js";
import { protect } from "../middleware/authmiddleware.js";

const InterviewRouter=express.Router();

InterviewRouter.post("/book-Online-Interview",protect,bookInterview);

export default InterviewRouter;