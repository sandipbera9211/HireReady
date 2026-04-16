
import BookInterview from "../models/BookInterview.js";
import User from "../models/User.js";
import { sendInterviewBookingMail } from "../utils/nodemailer.js";

export const bookInterview = async (req, res) => {
  try {
    const userId = req.user._id  

    const { difficulty, questionTypes } = req.body;
    if (!difficulty || !questionTypes) {
      return res.status(400).json({ message: "Difficulty and question types are required" });
    }

    const newBooking = new BookInterview({ userId, difficulty, questionTypes });
    await newBooking.save();

    
    const user = await User.findOne(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   
    await sendInterviewBookingMail({
      toEmail: user.email,
      userName: user.name,
      difficulty,
      questionTypes,
    });

  
    return res.status(201).json({ message: "Interview booked & confirmation sent!" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}