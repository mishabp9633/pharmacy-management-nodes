import {saveBillData} from '../services/pharmacybill.service.js'


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
        const medicine  = req.body.medicine
        console.log(medicine);
      
    
        const pharmadcyBill = await saveBillData(billData,medicine)
        res.status(200).send({success:true})
    } catch (error) {
        console.log(error)
        next(error)
    }
    
}