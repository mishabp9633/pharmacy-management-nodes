import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    // priscriptionId:{
    //     type:Number,
    // },
    appoinmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appoinment",
      required: true,
    },
    medicinNameWithQty: {
      type: String,
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const prescriptionModel = mongoose.model(
  "Prescription",
  prescriptionSchema
);

// Date of issue.
// Patient's name and address.
// Patient's date of birth.
// Clinician name, address, DEA number.
// Drug name.
// Drug strength.
// Dosage form.
// Quantity prescribed

// QuantityOfMedicin:{
//     type:Number,
//     required:true
// },
// DateOfIssue:{
//     type:Date,
//     default:Date.now,
//     required:true
// }
// stockId:{
//     type: mongoose.Schema.Types.ObjectId,
//     ref:"Stock"
// },
