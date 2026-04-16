import express from 'express'
import { feedbackStore, generateMockInterview, getFeedbackReport } from '../controllers/MockInterviewController.js';
import { protect } from '../middleware/authmiddleware.js';
import { answerStore } from '../middleware/answerStrore.js';

const MockInterviewRouter=express.Router();

MockInterviewRouter.post('/questions',protect,generateMockInterview);
MockInterviewRouter.post('/feedback',protect,answerStore,feedbackStore)
MockInterviewRouter.get('/feedback-report/:id',protect,getFeedbackReport)

export default MockInterviewRouter;