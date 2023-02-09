import { HttpException } from "../exceptions/exceptions.js";
import {prescriptionModel} from "../models/priscription.model.js";


export async function save(data){
   const priscription = new prescriptionModel(data)

   await priscription.save()
   return {priscription}
}

export async function getAll(){
   const priscription = await prescriptionModel.find()
   .populate("userId",["name","place","mobileNo"])
   .populate("doctorId",["name","mobileNo"])
   .populate("appoinmentId",["gender","age","dateOfBirth","allocatedToken"])
   return {priscription}
}


export async function getAllByTokenDoctor(doctorId){
   const priscription = await prescriptionModel.find({doctorId:doctorId})
   .populate("userId",["name","place","mobileNo"])
   .populate("doctorId",["name","mobileNo"])
   .populate("appoinmentId",["gender","age","dateOfBirth","allocatedToken"])
   if(!priscription)throw HttpException(400,("No prescription is there"))
  
   return {priscription}
}


export async function getAllByTokenPatient(patientId){
   const priscription = await prescriptionModel.find({userId:patientId})
   .populate("userId",["name","place","mobileNo"])
   .populate("doctorId",["name","mobileNo"])
   .populate("appoinmentId",["gender","age","dateOfBirth","allocatedToken"])
   if(!priscription)throw HttpException(400,("No prescription is there"))
  
   return {priscription}
}


export async function getSingle(priscriptionId){
   const priscription = await prescriptionModel.findById(priscriptionId)
   .populate("userId",["name","place","mobileNo"])
   .populate("doctorId",["name","mobileNo"])
   .populate("appoinmentId",["gender","age","dateOfBirth","allocatedToken"])
   if(!priscription)throw HttpException(400,("No prescription is there"))
   
   return {priscription}
}


export async function updateByToken(doctorId, data) {
   const prescription = await prescriptionModel.findById(doctorId);
   if (!prescription) throw HttpException(400, "No doctor is there");
   let prescriptionId = prescription._id

   const prescriptioData = await prescriptionModel.findByIdAndUpdate(prescriptionId,data,{ new: true });

   if (!prescriptioData) throw HttpException(400, "No prescription is there")
   return { prescriptioData };
}


export async function update(prescriptionId, data) {
   const prescriptioData = await prescriptionModel.findByIdAndUpdate(prescriptionId,data,{ new: true });

   if (!prescriptioData) throw HttpException(400, "No prescription is there")
   return { prescriptioData };
}


export async function DeleteByToken(doctorId){
   const prescription = await prescriptionModel.findOne({doctorId:doctorId})
   if(!prescription) throw new HttpException(400, "No prescription is there")

   const prescriptionId = prescription._id

   const prescriptionData = await prescriptionModel.findByIdAndDelete(prescriptionId)
   return {prescriptionData}
}


export async function Delete(prescriptionId){
   const prescriptionData = await prescriptionModel.findByIdAndDelete(prescriptionId)
   if(!prescriptionData) throw new HttpException(400, "No prescription is there")
   
   return {prescriptionData}
}

