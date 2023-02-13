import express from "express";
import {
  getUserDetailsByToken,
  updateUserByToken,
  deleteUserByToken,
} from "../controllers/user.controller.js";
import { patientMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

const path = "/patient";

//..............patient...............//
router.get(`${path}/get`, patientMiddleware, getUserDetailsByToken);
router.put(`${path}/update`, patientMiddleware, updateUserByToken);
router.delete(`${path}/dalete`, patientMiddleware, deleteUserByToken);

export default router;
