import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import AnalysisRouter from "./routes/AnalysisRoute.js";
import PreparationRouter from "./routes/PreparationRoute.js";
import InterviewRouter from "./routes/InterviewRoute.js";
import MockInterviewRouter from "./routes/MockInterviewRouter.js";
import authRouter from "./routes/AuthRoute.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
connectDB();
app.use(cookieParser());
app.use(cors({
    origin:process.env.FRONTEND_URL||"http://localhost:5173",
    credentials:true
}))

app.use(express.json());                      
app.use("/api/auth",authRouter)

app.use("/api/resume",AnalysisRouter);
app.use('/api/prepare',PreparationRouter);
app.use("/api/interview",InterviewRouter);
app.use("/api/mock-interview",MockInterviewRouter);
app.get("/", (req, res) => {
  res.send("HireReady API is running ");
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`server is listening on port ${process.env.PORT || 5000}`);
});



//next steps comment in backend-- #Sandip Bera