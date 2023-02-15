// import { MongoTopologyClosedError } from "mongodb";
import mongoose from "mongoose";
import { isValidEmail, isValidMobileNumber } from '../utils/util.js'



export const userSchema = new mongoose.Schema({
  doctorId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Doctor'
  },
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    maxLength: [225,{ message:"Your password cannot exceed 225 characters"}],
    minLength: [6, {message:"Your password should be contain minimum 6 characters"}],
  },
  name: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  mobileNo: {
    type: mongoose.Schema.Types.String,
    required: true,
    validate: {
      validator: (v)=> isValidMobileNumber(v),
      message: 'Invalid mobile number'
  }
  },
  email: {
    type: mongoose.Schema.Types.String,
    unique: true,
    required: true,
    validate: {
      validator: (v)=> isValidEmail(v),
      message: 'Invalid email address'
  }
  },
  place:{
    type:String,
    required:true
  },
  
  role: {
    type: String,
    default: "patient",
    enum:["patient","doctor","admin","pharmacist"]
  },
});

const user = mongoose.model("User", userSchema);
export default user;
