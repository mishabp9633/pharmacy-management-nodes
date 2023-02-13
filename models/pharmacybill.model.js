import mongoose from "mongoose";

const pharmacybillSchema = new mongoose.Schema(
  {
    prescriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prescription",
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    medicine: [
      {
        stockId: {
          type: String,
          ref: "Stock",
        },
        quantity: {
          type: Number,
          default: 0,
        },
        price: {
          type: Number,
        },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const pharmacybillModel = mongoose.model(
  "Pharmacybill",
  pharmacybillSchema
);
