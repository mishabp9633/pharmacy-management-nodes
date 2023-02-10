import { pharmacybillModel } from '../models/pharmacybill.model.js'
import stockModel from "../models/stock.model.js";
import mongoose from 'mongoose'

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
        const medicine = await stockModel.findById(mongoose.Types.ObjectId(item.stockId));
        medicine.noInStock -= item.quantity;
        await medicine.save();
    }

    return "successfull";
}
