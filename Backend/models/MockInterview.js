import mongoose from "mongoose"

const mockInterviewSchema = new mongoose.Schema({
  userId:        { type:String, required: true },
  difficulty:    { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
selectedTopics: {type: [String], required: true},
  questions:     [String],
}, { timestamps: true })

const MockInterview = mongoose.model('MockInterview', mockInterviewSchema)
export default MockInterview 