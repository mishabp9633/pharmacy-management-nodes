import doctorModel from "../models/doctor.model.js";
// import userModel from"../models/user.model.js"

//..............auth controller start.................//

//find doctor function (auth controller)
export async function findDoctor(userId) {
  const doctor = await doctorModel.findOne({ userId: userId });
  return { doctor };
}

//save doctor (auth controller)
export async function save(data) {
  const doctor = new doctorModel(data);
  await doctor.save();
  return { doctor };
}

//update doctor (auth controller)
export async function update(doctorId, doctorData) {
  const result = await doctorModel.findByIdAndUpdate(
    doctorId,
    doctorData,

    {
      new: true,
    }
  );
  return { result };
}

//delete doctor (auth controller)
export async function Delete(doctorId) {
  const deleteDoctor = await doctorModel.findByIdAndDelete(doctorId);
  return { deleteDoctor };
}

//get all doctors function (auth controller)
export async function getAll() {
  const doctorList = await doctorModel
    .find()
    .populate("userId", ["username", "name", "mobileNo", "email"]);

  return { doctorList };
}

//get single doctor function (auth controller)
export async function getSingle(doctorId) {
  const doctor = await doctorModel
    .findById(doctorId)
    .populate("userId", ["username", "name", "address", "mobileNo", "email"]);
  return { doctor };
}

//..............auth controller end.................//

export async function getSingelDoctorByToken(id) {
  const doctor = await doctorModel
    .findById(id, {}, { projection: { timeEnd: 0, timeStart: 0 } })
    .populate("userId", ["username", "name", "address", "mobileNo", "email"]);
  console.log(doctor);
  return { doctor };
}
