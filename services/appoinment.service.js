import { appoinmentModel } from "../models/appoinment.model.js"
import {HttpException}  from "../exceptions/exceptions.js"

export async function saveAppoinment(appoinmentData) {

    const appoinment = new appoinmentModel(appoinmentData)
    await appoinment.save()
   
    return {appoinment}
}


export async function getAll(doctorId){
    const appoinmentData = await appoinmentModel.find({doctorId:doctorId})
    .populate('userId',["name","place","mobileNo"])
    .populate('doctorId',["name"])
    return {appoinmentData}
}


export async function getSingle(appoinmentId){
    const appoinmentData = await appoinmentModel.findById(appoinmentId)
    .populate('userId',["name","place","mobileNo"])
    .populate('doctorId',["name"])
    if(!appoinmentData) throw new HttpException(400, "No appoinment is there")
    
    return {appoinmentData}
}


export async function getAllUserAppoinments(userId){
    const appoinmentData = await appoinmentModel.find({ userId:userId })
    .populate('userId',["name","place","mobileNo"])
    .populate('doctorId',["name"])
    if(!appoinmentData) throw new HttpException(400, "No appoinment is there")
   
    return {appoinmentData}
}

//token allocation
export async function updateTokenValue(data,appoinmentId){
    const appoinment = await appoinmentModel.findByIdAndUpdate(appoinmentId,data,{new:true})
    if(!appoinment) throw new HttpException(400, "No appoinment is there")
    return {appoinment}
}


export async function update(data,appoinmentId){

    const appoinmentData = await appoinmentModel.findByIdAndUpdate(appoinmentId,data,{new:true})
    if(!appoinmentData) throw new HttpException(400,'appoinment Data is not found')
    return {appoinmentData}
}


export async function updateByToken(userId,data) {

      const appoinment = await appoinmentModel.findOne({ userId:userId })
      console.log(appoinment);
    
    if(!appoinment) throw new HttpException(400, "No appoinment is there")
    const appoinmentId = appoinment._id

  
    const appoinmentData = await appoinmentModel.findByIdAndUpdate(appoinmentId,data,{new:true})

    return {appoinmentData}
    
}


export async function Delete(userId){
    const appoinment = await appoinmentModel.findOne({userId:userId})
    if(!appoinment) throw new HttpException(400, "No appoinment is there")

    const appoinmentId = appoinment._id

    const appoinmentData = await appoinmentModel.findByIdAndDelete(appoinmentId)
    return {appoinmentData}
}


export async function deleteMany(){
    const appoinment = await appoinmentModel.deleteMany()
    return {appoinment}
}


//find userId (priscription controller)
export async function findUserId(appoinmentId){
    const appoinment = await appoinmentModel.findById(appoinmentId)
    if(!appoinment) throw new HttpException(400, "No appoinment is there")
    const userId = appoinment.userId
    return {userId}
}