import {getAll, 
    save, 
    getSingle, 
    Delete, update, DeleteByToken, updateByToken, 
    getAllByTokenDoctor, 
    getAllByTokenPatient
} from '../services/priscription.service.js'
import {findUserId} from '../services/appoinment.service.js'


export async function savePriscription(req, res, next) {
    try {
        const doctorId = req.body.doctor._id
        const appoinmentId = req.body.appoinmentId
        const priscriptionData = req.body
        const {userId} = await findUserId(appoinmentId)
        console.log(userId)
       const priscription = await save({
        ...priscriptionData,
        doctorId:doctorId,
        userId:userId
       })
       console.log(priscription);
       res.status(200).send(priscription)
    } catch (err) {
        console.log(err)
        next(err)
    }
}


export async function getAllPriscriptionPharmacist(req, res, next) {
    try {
        
       const priscription = await getAll()

       res.status(200).send(priscription)
    } catch (err) {
        console.log(err)
        next(err)
    }
}


export async function getPriscriptionByTokenDoctor(req, res, next) {
    try {
        const doctorId = req.body.doctor._id
       const priscription = await getAllByTokenDoctor(doctorId)

       res.status(200).send(priscription)
    } catch (err) {
        console.log(err)
        next(err)
    }
}


export async function getPriscriptionByTokenPatient(req, res, next) {
    try {
        const patientId = req.body.patient._id
       const priscription = await getAllByTokenPatient(patientId)

       res.status(200).send(priscription)
    } catch (err) {
        console.log(err)
        next(err)
    }
}


export async function getSinglePriscription(req, res, next) {
    try {
        const priscriptionId = req.params.id
       const priscription = await getSingle(priscriptionId)

       res.status(200).send(priscription)
    } catch (err) {
        console.log(err)
        next(err)
    }
}



export async function deletePriscriptionByTokenDoctor(req, res, next) {
    try {
        const doctorId = req.body.doctor._id
       const priscription = await DeleteByToken(doctorId)

       res.status(200).send(priscription)
    } catch (err) {
        console.log(err)
        next(err)
    }
}


export async function deletePriscription(req, res, next) {
    try {
        const prescriptionId = req.params.id
       const priscription = await Delete(prescriptionId)

       res.status(200).send(priscription)
    } catch (err) {
        console.log(err)
        next(err)
    }
}


export async function updatePriscriptionByTokenDoctor(req, res, next) {
    try {
        const doctorId = req.body.doctor._id
        const priscriptionData = req.body
       const priscription = await updateByToken(doctorId,priscriptionData)

       res.status(200).send(priscription)
    } catch (err) {
        console.log(err)
        next(err)
    }
}


export async function updataPriscription(req, res, next) {
    try {
        const prescriptionId = req.params.id
        const prescriptionData = req.body
       const priscription = await update(prescriptionId,prescriptionData)

       res.status(200).send(priscription)
    } catch (err) {
        console.log(err)
        next(err)
    }
}

