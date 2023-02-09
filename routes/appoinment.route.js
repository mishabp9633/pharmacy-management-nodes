import express from 'express'
import { appoinmentDataSave, 
    deleteAppoinment, 
    deleteAppoinmentByToken, 
    deleteFullAppoinment, 
    getAllAppoinmentsDoctorByToken, 
    getAllAppoinmentsByToken,
    tokenAllocation, 
    updateAppoinment, 
    updateAppoinmentByToken,
    getSingleAppoinment
} from '../controllers/appoinment.controller.js'
import { appoinmentValidator } from '../middlewares/appoinment.middleware.js'
import { tokenValidator } from '../middlewares/token.middleware.js'
import { doctorMiddleware, patientMiddleware} from '../middlewares/auth.middleware.js'

const router = express.Router()

const path = "/appoinment"

router.post(`${path}/save`,patientMiddleware,appoinmentValidator,appoinmentDataSave)

router.get(`${path}/all-doctor`,doctorMiddleware,getAllAppoinmentsDoctorByToken)
router.get(`${path}/single-doctor`,doctorMiddleware,getSingleAppoinment)
router.get(`${path}/all-patient`,patientMiddleware,getAllAppoinmentsByToken)

router.delete(`${path}/delete-doctor/:id`,doctorMiddleware,deleteAppoinment)
router.delete(`${path}/delete-full-doctor`,doctorMiddleware,deleteFullAppoinment)
router.delete(`${path}/delete-patient`,patientMiddleware,deleteAppoinmentByToken)

router.put(`${path}/update-doctor/:id`,doctorMiddleware,updateAppoinment)
router.put(`${path}/token-allocation/:id`,tokenValidator,doctorMiddleware,tokenAllocation)
router.put(`${path}/update`,patientMiddleware,updateAppoinmentByToken)


export default router