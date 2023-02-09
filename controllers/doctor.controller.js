import {getSingle,
  findDoctor,
  update as updateDoctor
} from "../services/doctor.service.js";

import {findUserById,
  update as updateUser
} from "../services/user.service.js";


export async function updateDoctorByToken(req, res, next) {

  try {

    let userId = req.body.doctor._id
    console.log(userId)
    let user = await findUserById(userId);
    if (!user) return res.status(400).send({ message: "user not found" })

    if (user) {
      const userData = req.body.user

      await updateUser(
        userId,
        userData)
    }

    if (user.role === "doctor") {
      const doctor = await findDoctor(userId)
      const doctorId = doctor._id;
      const doctorData = req.body.doctor

      await updateDoctor(
        doctorId,
        doctorData

      )
    }

    console.log(user);
    res.send({ success: true });
  } catch (err) {
    console.log(err);
    next(err);
  }
}


export async function getDoctorDetailsByToken(req, res, next) {
  const doctorId = req.body.doctor._id
  console.log(doctorId);
  try {
    const doctorDetails = await getSingle(doctorId)
    res.send(doctorDetails)
  } catch (err) {
    next(err)
  }
}


