import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  department: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  timeStart: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  timeEnd: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  qualification: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  yearofExperience: {
    type: mongoose.Schema.Types.String,
  },
});
const doctor = mongoose.model("Doctor", doctorSchema);
export default doctor;
