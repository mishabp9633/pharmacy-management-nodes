import express from 'express'
import { searchDoctor, searchPatient } from '../controllers/search.controller.js'
import { doctorMiddleware, patientMiddleware } from '../middlewares/auth.middleware.js'



const router = express.Router()

const path = "/search"

//.....................doctor....................//
router.get(`${path}/get-patients`,doctorMiddleware,searchPatient)

//.....................patient...................//
router.get(`${path}/get-doctors`,patientMiddleware,searchDoctor)



export default router;