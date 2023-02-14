import userModel from '../models/user.model.js'
import doctorModel from '../models/doctor.model.js'
import { HttpException } from '../exceptions/exceptions.js'



export async function searchpatient(search) {
    const patientData = await userModel.find({ "name": { $regex: ".*" + search + ".*", $options: 'i' }, "role": { $nin: ["doctor", "pharmacist", "admin"] } })
        .select({ name: { $toLower: "$name" }, mobileNo: 1, email: 1, _id: 0, place: 1 });
    if (patientData.length <= 0) throw new HttpException(404, "patient not found")
    return { patientData }
}

export async function searchdoctor(search) {
    const doctorData = await userModel.find({ "name": { $regex: ".*" + search + ".*", $options: 'i' }, "role": { $nin: ["patient", "pharmacist", "admin"] } })
        .select({ name: { $toLower: "$name" }, mobileNo: 1, email: 1, _id: 0, place: 1  })
    if (doctorData.length <= 0) throw new HttpException(404, "doctor not found")
    return { doctorData }
}