import express from 'express'
import {updateDoctorByToken,getDoctorDetailsByToken} from '../controllers/doctor.controller.js'
import { doctorMiddleware } from '../middlewares/auth.middleware.js'
import { updateMiddleware } from '../middlewares/update.middleware.js'


const router = express.Router()

const path = "/doctor"

router.get(`${path}/get`,doctorMiddleware,getDoctorDetailsByToken)
router.put(`${path}/update`,doctorMiddleware,updateDoctorByToken)



export default router;