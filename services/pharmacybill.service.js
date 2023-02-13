import { pharmacybillModel } from "../models/pharmacybill.model.js";
import stockModel from "../models/stock.model.js";
import mongoose from "mongoose";
import { HttpException } from "../exceptions/exceptions.js";

export async function saveBillData(billData, medicineArray, userId, doctorId) {
  let totalPrice = 0;

  for (const item of medicineArray) {
    const stockId = mongoose.Types.ObjectId(item.stockId);
    const quantity = item.quantity;

    const medicine = await stockModel.findById(stockId);

    if (medicine.noInStock === 0) {
      return;
    }

    const price = medicine.priceOfOne * quantity;
    console.log("price", price);
    item.price = price;
    totalPrice += item.price;
  }

  const bill = new pharmacybillModel({
    ...billData,
    totalPrice: totalPrice,
    patientId: userId,
    doctorId: doctorId,
  });
  console.log(bill);
  await bill.save();

  for (const item of medicineArray) {
    const stockId = mongoose.Types.ObjectId(item.stockId);
    const medicine = await stockModel.findById(stockId);
    medicine.noInStock -= item.quantity;
    await medicine.save();
  }

  return "successfull";
}

export async function getAll(pageNumber, pageSize) {
  const pharmacybill = await pharmacybillModel
    .find()
    .populate("patientId", ["name", "place", "mobileNo"])
    .populate("doctorId", ["name", "mobileNo"])
    .populate("prescriptionId", ["medicinNameWithQty"])
    .populate("medicine.stockId", ["medicinName", "dateOfAdding"])
    .limit(pageSize)
    .skip((pageNumber - 1) * pageSize);
  return { pharmacybill };
}

export async function getAllByTokenPatient(Id) {
  const pharmacybill = await pharmacybillModel
    .find({ patientId: Id })
    .populate("patientId", ["name", "place", "mobileNo"])
    .populate("doctorId", ["name", "mobileNo"])
    .populate("prescriptionId", ["medicinNameWithQty"])
    .populate("medicine.stockId", ["medicinName", "dateOfAdding"]);
  return { pharmacybill };
}

export async function getSingle(Id) {
  const pharmacybill = await pharmacybillModel
    .findById(Id)
    .populate("patientId", ["name", "place", "mobileNo"])
    .populate("doctorId", ["name", "mobileNo"])
    .populate("prescriptionId", ["medicinNameWithQty"])
    .populate("medicine.stockId", ["medicinName", "dateOfAdding"]);
  if (!pharmacybill) throw new HttpException(400, "pharmacy bill is not found");
  return { pharmacybill };
}

export async function Delete(Id) {
  const pharmacybill = await pharmacybillModel.findByIdAndDelete(Id);
  if (!pharmacybill) throw new HttpException(400, "pharmacy bill is not found");
  return { pharmacybill };
}

export async function updateBillData(
  billId,
  billData,
  medicineArray,
  userId,
  doctorId
) {
  console.log(medicineArray);
  let totalPrice = 0;

  for (const item of medicineArray) {
    console.log(item);

    const stockId = mongoose.Types.ObjectId(item.stockId);
    const quantity = item.quantity;

    const medicine = await stockModel.findById(stockId);

    if (medicine.noInStock === 0) {
      return;
    }

    const price = medicine.priceOfOne * quantity;
    console.log("price", price);
    item.price = price;
    totalPrice += item.price;
  }

  const bill = await pharmacybillModel.findById(billId);
  bill.set({
    ...billData,
    totalPrice: totalPrice,
    patientId: userId,
    doctorId: doctorId,
  });
  console.log(bill);
  await bill.save();

  for (const item of medicineArray) {
    const medicine = await stockModel.findById(
      mongoose.Types.ObjectId(item.stockId)
    );
    medicine.noInStock -= item.quantity;
    await medicine.save();
  }

  return "successful";
}
