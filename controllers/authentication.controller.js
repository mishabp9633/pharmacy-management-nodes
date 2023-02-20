import { save as saveUser } from "../services/user.service.js";
import { save as saveDoctor } from "../services/doctor.service.js";

import { update as updateUser } from "../services/user.service.js";
import { update as updateDoctor } from "../services/doctor.service.js";
import { updatePharmacist } from "../services/pharmacy.service.js";

import { Delete as deleteUser } from "../services/user.service.js";
import { Delete as deleteDoctor } from "../services/doctor.service.js";

import { getAll as getAllUser } from "../services/user.service.js";
import { getAll as getAllDoctor } from "../services/doctor.service.js";
import { getAll as getAllPharmacist } from "../services/pharmacy.service.js";

import { getSingle as getSingleUser } from "../services/user.service.js";
import { getSingle as getSingleDoctor } from "../services/doctor.service.js";
import { getSingle as getSinglePhamacist } from "../services/pharmacy.service.js";

import { findUser, findUserById } from '../services/user.service.js'
import { findDoctor } from '../services/doctor.service.js'

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()



//doctor register
export async function signUpDoctor(req, res, next) {
  
  let username = req.body.user.username
  
  console.log(username);
  
  let {user} = await findUser(username)
  if (user) return res.status(400).send({message:"user already registered"});

  const  password = req.body.user.password;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const { user } = await saveUser({
      ...req.body.user,
      password: hashedPassword,
    });

    console.log(user);
    if (user.role === "doctor") {
      await saveDoctor({
        userId: user._id,
        ...req.body.doctor,
      })
    }

    res.status(200).send({ success: true });
  } catch (err) {
    console.log(err);
    next(err);
  }
}


//doctor register
export async function signUpPatient(req, res, next) {

  let username = req.body.user.username
  let {user} = await findUser(username)
  if (user) return res.status(400).send({message:"user already registered"});

  
 let  password = req.body.user.password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const { user } = await saveUser({
      ...req.body.user,
      password: hashedPassword,
    });

    res.status(200).send({ success: true });
  } catch (err) {
    console.log(err);
    next(err);
  }
}



//login 
export async function signIn(req, res, next) {
  const username = req.body.username
  const Password = req.body.password
  
  try {

    let {user} = await findUser(username)
    console.log("user: ",user);

    if (!user) {
      return res.status(500).send({ message: "Username is invalid!" });
    } else{
    
      const validpassword = await bcrypt.compare(Password,user.password );
      console.log("validpassword :", validpassword);

      if (!validpassword)
        return res.status(500).send({ message: "invalid password" });
  
      let token = jwt.sign(
        { _id: user._id },
        process.env.TOKEN_KEY
      );

      let tokenRole = {
        role: user.role,
        token: token
      }
      res.status(200).header("x-auth-token", token).send({ tokenRole });
    }
  } catch (error) {
    console.log(err);
    next(error);
  }
}



//update profile
export async function updateProfile(req, res, next) {

  try {

    let userId = req.params.id
    let {user} = await findUserById(userId);
    if (!user) return res.status(400).send({ message: "user not found" })

    if (user) {
      const userData = req.body.user

      await updateUser(
        userId,
        userData)
    }

    if (user.role === "doctor") {
      const {doctor} = await findDoctor(userId)
      const doctorId = doctor._id;
      console.log("doctorId....",doctorId);
      const doctorData = req.body.doctor

      await updateDoctor(
        doctorId,
        doctorData

      )
    }

    if (user.role === "pharmacist") {
      const {pharmacist} = await findUserById(userId)
      const pharmacistId = pharmacist._id;
      const pharmacistData = req.body.user

      await updatePharmacist(
        pharmacistId,
        pharmacistData

      )
    }

    console.log(user);
    res.status(200).send({ success: true });
  } catch (err) {
    console.log(err);
    next(err);
  }
}




//delete profile
export async function deleteProfile(req, res, next) {
  try {
    const userId = req.params.id;
    const { user } = await findUserById(userId);
    if (!user) {
      return res.status(400).send("User not found.");
    }

    // Delete user document
    await deleteUser(userId);

    // If user is a doctor, delete doctor document
    if (user.role === "doctor") {
      const {doctor} = await findDoctor(userId);
      if (doctor) {
        const doctorId = doctor._id;
        await deleteDoctor(doctorId);
      } else {
        console.log("Doctor document not found for user:", user);
      }
    }

    res.status(200).send({ success: true });
  } catch (err) {
    console.error(err);
    next(err);
  }
}




//get all patients
export async function getAllUsers(req, res, next) {

  try {

    const users = await getAllUser()
    console.log(users);
    res.status(200).send(users);

  } catch (err) {
    console.log(err);
    next(err);
  }
}



//get all doctors
export async function getAllDoctors(req, res, next) {

  try {
    const doctor = await getAllDoctor()

    console.log(doctor);
    res.status(200).send(doctor);
  } catch (err) {
    console.log(err);
    next(err);
  }
}




//get all pharmacist
export async function getAllPharmacy(req, res, next) {

  try {

    let pharmacist = await getAllPharmacist()

    console.log(pharmacist);
    res.status(200).send(pharmacist);

  } catch (err) {
    console.log(err);
    next(err);
  }
}



//get single patient
export async function getSingleUsers(req, res, next) {

  try {
    const userId = req.params.id

    let user = await getSingleUser(userId)
    if (!user) {
      return res.status(400).send({ message: 'Patient not found by the given id...!' })
    }

    console.log(user);
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
}


//get single doctor
export async function getSingleDoctors(req, res, next) {

  try {
    const doctorId = req.params.id

    let doctor = await getSingleDoctor(doctorId)
    if (!doctor) {
      return res.status(400).send({ message: 'Doctor not found by the given id' })
    }

    console.log('Doctor', doctor);
    res.status(200).send(doctor);
  } catch (err) {
    console.log(err);
    next(err);
  }
}


//get admin profile by token
export async function getAdminProfileByToken(req, res, next) {

  try {
    const userId = req.body.admin._id

    let admin = await getSingleUser(userId)
    if (!admin) {
      return res.status(400).send({ message: 'admin not found by the given id' })
    }

    console.log('admin', admin);
    res.status(200).send(admin);
  } catch (err) {
    console.log(err);
    next(err);
  }
}


//get single patient
export async function getSinglePharmacy(req, res, next) {

  try {
    const pharmacyId = req.params.id

    const pharmacist = await getSinglePhamacist(pharmacyId)
    if (!pharmacist) {
      return res.status(400).send({ message: 'pharmacist not found by the given id' })
    }

    console.log(pharmacist);
    res.send(pharmacist);

  } catch (err) {
    console.log(err);
    next(err);
  }
}



export async function logoutUser(req, res, next) {
  try {
    res.cookie('x-auth-token')
    res.status(200).send({ message: 'Successfully logged out' });

  } catch (err) {
    console.log(err);
    next(err);
  }
}

