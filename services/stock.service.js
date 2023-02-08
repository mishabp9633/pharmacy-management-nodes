import { HttpException } from "../exceptions/exceptions.js";
import stockModel from "../models/stock.model.js";

export async function save(stockData){
   const stock = new stockModel(stockData)

   await stock.save()
   return {stock}
}

export async function getAll(){
   const stock = await stockModel.find()
   return {stock}
}


export async function getSingle(stokcId){
   const stock = await stockModel.findById(stokcId)
   if(!stock)throw HttpException(400,("Stock not found by given id"))
   return {stock}
}


export async function update(stockId, data) {
   const currentStock = await stockModel.findById(stockId);
   if (!currentStock) throw HttpException(400, "Stock not found by given id");

   const updatedStock = {
      ...currentStock.toObject(),
      ...data,
      noInStock: currentStock.noInStock + data.noInStock || currentStock.noInStock,
      price: currentStock.price + data.price || currentStock.price
   };

   const stock = await stockModel.findByIdAndUpdate(stockId, { $set: updatedStock }, { new: true });

   if (!stock) throw HttpException(400, "Stock not found by given id");
   return { stock };
}



export async function Delete(stokcId){
   const stock = await stockModel.findByIdAndDelete(stokcId)
   if(!stock)throw HttpException(400,("Stock not found by given id"))
   return {stock}
}

