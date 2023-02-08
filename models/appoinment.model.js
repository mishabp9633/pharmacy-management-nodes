import mongoose from 'mongoose'

const appoinmentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    gender:{
        type:String,
        required:true,
        enum:["Male","Female","Other"]
    },
    dateOfBirth:{
        type:Date,
        required:true,
     
    },
    age:{
        type:Number,
        required:true,
        min: [0,"Age cannot be negative"],
        max: [120,"Age exceeds the maximum limit of 120"]
        },
        
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor',
        required:true
    },
    appoinmentDate:{
        type:Date,
        default:Date.now
    },
    // expieryOfAppoinment:{
    //     type:Date  
    // },
    allocatedToken:{
        type:Number,
        min:[0,"allocated Token cannot be negative"],
    }
})

export const appoinmentModel = mongoose.model("Appoinment",appoinmentSchema)