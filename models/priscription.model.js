import mongoose from 'mongoose'


const priscriptionSchema = new mongoose.Schema({
    appoinmentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Appoinment"
      },
    stockId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Stock"
    },
    // doctorId:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:"Doctor"
    // },
    QuantityOfMedicin:{
        type:Number,
        required:true
    },
    DateOfIssue:{
        type:Date,
        default:Date.now,
        required:true
    }
})

export const priscriptionModel = mongoose.model('Priscription',priscriptionSchema)




// Date of issue.
// Patient's name and address.
// Patient's date of birth.
// Clinician name, address, DEA number.
// Drug name.
// Drug strength.
// Dosage form.
// Quantity prescribed