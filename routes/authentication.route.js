import express from "express";
import {
  signUpDoctor,
  signUpPatient,
  signIn,
  updateProfile,
  deleteProfile,
  getAllUsers,
  getAllDoctors,
  getSingleUsers,
  getSingleDoctors,
  getAllPharmacy,
  getSinglePharmacy,
  logoutUser,
  getAdminProfileByToken,
} from "../controllers/authentication.controller.js";
import { loginValidator } from "../middlewares/login.validation.middleware.js";
import { adminMiddleware } from "../middlewares/auth.middleware.js";
import { userValidation } from "../middlewares/user.validation.js";
import { doctorValidation } from "../middlewares/doctor.validation.js";

const router = express.Router();

const path = "/authentication";

//.................admin................//
router.get(`${path}/all-patients`, adminMiddleware, getAllUsers);
router.get(`${path}/all-doctors`, adminMiddleware, getAllDoctors);
router.get(`${path}/all-pharmacist`, adminMiddleware, getAllPharmacy);
router.get(`${path}/admin-profile`, adminMiddleware, getAdminProfileByToken);
router.get(`${path}/single-patients/:id`, adminMiddleware, getSingleUsers);
router.get(`${path}/single-doctors/:id`, adminMiddleware, getSingleDoctors);
router.get(`${path}/single-pharmacy/:id`, adminMiddleware, getSinglePharmacy);
router.put(`${path}/update/:id`, adminMiddleware, updateProfile);
router.delete(`${path}/delete/:id`, adminMiddleware, deleteProfile);

//........doctor signUp.........//
router.post(
  `${path}/signup-doctor`,
  doctorValidation,
  adminMiddleware,
  signUpDoctor
);

//.......patient signUp........//
router.post(`${path}/signup-patient`, userValidation, signUpPatient);

//.......signIn.........//
router.post(`${path}/signin`, loginValidator, signIn);

//...logout......//
router.post(`${path}/logout`, logoutUser);

export default router;
