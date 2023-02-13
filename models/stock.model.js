import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  medicinName: {
    type: String,
    required: true,
  },
  noInStock: {
    type: Number,
    required: true,
  },
  dateOfAdding: {
    type: Date,
    default: Date.now,
  },
  expieryDate: {
    type: Date,
    required: true,
  },
  priceOfOne: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  batchNo: {
    type: String,
    required: true,
  },
});

const stockModel = mongoose.model("Stock", stockSchema);
export default stockModel;
