import {saveBillData} from '../services/pharmacybill.service.js'
import { findDoctorId, findUserId } from '../services/priscription.service.js';



// export async function save(req,res,next){
//     try {

//         const billData  = req.body
//         const stockId  = req.body.medicine.stockId
//         const quantity = req.body.medicine.quantity
    
//         const pharmadcyBill = await saveBillData(billData,stockId,quantity)
//         res.status(200).send(pharmadcyBill)
//     } catch (error) {
//         console.log(error)
//         next(error)
//     }
    
// }

export async function save(req,res,next){
    try {

        const billData  = req.body
        const prescriptionId = req.body.prescriptionId
        console.log("prescriptionId",prescriptionId);
        const medicine  = req.body.medicine
        console.log("medicine",medicine);
      
        const {userId} = await findUserId(prescriptionId)
        console.log("userId",userId);
        if(!userId) return res.status(400).send('user not found')

        const {doctorId}= await findDoctorId(prescriptionId)
        console.log("doctorId",doctorId);
        if(!doctorId) return res.status(400).send('doctor not found')

        const pharmadcyBill = await saveBillData(
            billData,
            medicine,
            userId,
            doctorId
           
            )
        res.status(200).send({success:true})
    } catch (error) {
        console.log(error)
        next(error)
    }
    
}