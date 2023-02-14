import { searchdoctor, searchpatient } from "../services/search.service.js";


export async function searchPatient(req,res,next){
    try{

        const searchData = req.body.search
        const patientData = await searchpatient(searchData)
        res.status(200).send(patientData)

    }catch(err){
        console.log(err);
        next(err)
    }
}

export async function searchDoctor(req,res,next){
    try{

        const searchData = req.body.search
        const doctorData = await searchdoctor(searchData)
        res.status(200).send(doctorData)

    }catch(err){
        console.log(err);
        next(err)
    }
}