import express from "express";
import { dayPreparation, PreparationPlan } from "../controllers/PreparationController.js";
import { protect } from "../middleware/authmiddleware.js";
import upload from "../middleware/multer.js";

const PreparationRouter = express.Router();

PreparationRouter.post('/preparation',PreparationPlan);
PreparationRouter.post('/day-wise-preparation',protect,upload.single('file'),dayPreparation);

export default PreparationRouter;