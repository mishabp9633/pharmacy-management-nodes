import { HttpException } from '../exceptions/exceptions.js';
import {pharmacybillModel} from '../models/pharmacybill.model.js'
import stockModel from "../models/stock.model.js";
import mongoose from 'mongoose'


export async function saveBillData(billData,medicineArray){

    console.log(medicineArray);

    await medicineArray.forEach(async item => {
        console.log(item);

        let stockId = mongoose.Types.ObjectId(item.stockId)
        let quantity =item.quantity

        const medicine = await stockModel.findById(stockId)     

            if(medicine.noInStock===0) return 
            const totalprice = medicine.priceOfOne*quantity
            billData.totalprice=totalprice

            let bill = new pharmacybillModel({...billData,totalPrice:totalprice}) 
            bill = await bill.save()

            medicine.noInStock -= quantity
            await medicine.save()
        
    });
    
return 'successfull'
}
