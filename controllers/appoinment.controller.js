import { getAll, 
    saveAppoinment, 
    getAllUserAppoinments, 
    update,
     Delete, 
     getSingle, 
    updateTokenValue,
    updateByToken,  
    deleteMany
} from "../services/appoinment.service.js"


export async function appoinmentDataSave(req,res,next){
    try{
        const userId = req.body.patient._id
        const appoinmentData = req.body
        const result = await saveAppoinment({
            ...appoinmentData,
            userId:userId
        })
        res.status(200).send(result)
    }catch(err){
        next(err)
    }  
}


export async function getAllAppoinmentsDoctorByToken(req,res,next){
    try{
        const doctorId = req.body.doctor._id
        console.log(doctorId)
        const appoinmentData = await getAll(doctorId)
        res.status(200).send(appoinmentData)

    }catch(err){
        next(err)
    }
}


export async function getSingleAppoinment(req,res,next){
    try{
        const appoinmentId = req.params.id
        const appoinmentData = await getSingle(appoinmentId)
        res.status(200).send(appoinmentData)

    }catch(err){
        next(err)
    }
}



export async function getAllAppoinmentsByToken(req,res,next){
    try{

        const userId = req.body.patient._id
        const appoinments = await getAllUserAppoinments(userId);
        res.status(200).send(appoinments)

    }catch(err){
        next(err)
    }
}


export async function tokenAllocation(req,res,next){
    try{

        const appoinmentId = req.params.id
        const tokenNumber = req.body
        const appoinments = await updateTokenValue(tokenNumber,appoinmentId);
        res.status(200).send(appoinments)

    }catch(err){
        next(err)
    }
}

export async function deleteAppoinment(req,res,next){
    try{

        const appoinmentId = req.params.id
        const appoinments = await Delete(appoinmentId);
        res.status(200).send(appoinments)

    }catch(err){
        next(err)
    }
}


export async function deleteAppoinmentByToken(req,res,next){
    try{
        const userId = req.body.patient._id
        const appoinments = await Delete(userId);
        res.status(200).send(appoinments)

    }catch(err){
        next(err)
    }
}


export async function deleteFullAppoinment(req,res,next){
    try{
        const appoinments = await deleteMany()
        res.status(200).send(appoinments)
    }catch(err){
        next(err)
    }
}



export async function updateAppoinment(req,res,next){
    try{

        const appoinmentId = req.params.id
        const appoinmentData = req.body
        const appoinments = await update(appoinmentData,appoinmentId);
        console.log(appoinments);
        res.status(200).send(appoinments)

    }catch(err){
        next(err)
    }
}



export async function updateAppoinmentByToken(req,res,next){
    try{

        const userId = req.body.patient._id
        const appoinmentData = req.body
        const appoinments = await updateByToken(userId,appoinmentData);
        res.status(200).send(appoinments)

    }catch(err){
        next(err)
    }
}