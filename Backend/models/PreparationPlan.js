import mongoose from "mongoose"

const dayTaskSchema = new mongoose.Schema({
  day:        { type: Number, required: true},   
  topic:      { type: String, required: true },    
  task:       { type: String, required: true },  
  
})

const PreparationPlanSchema = new mongoose.Schema({
  userId:          { type: String, required: true },
  resumeText:      { type: String, required: true },
  jobDescription:  { type: String, required: true }, 
  role:            { type: String, required: true }, 
  totalDays:       { type: Number, required: true }, 
  gapAreas:        [String],                          
  days:            [dayTaskSchema],    
}, { timestamps: true })

const PreparationPlan = mongoose.model('PreparationPlan', PreparationPlanSchema)
export default PreparationPlan