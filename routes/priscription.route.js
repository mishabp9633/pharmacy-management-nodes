import express from 'express'
import { 
    deletePriscription,
    getAllPriscriptionPharmacist,
    getPriscriptionByTokenDoctor,
    getSinglePriscription,
    savePriscription,
    updatePriscription,
    updatePriscriptionByTokenDoctor,
    getPriscriptionByTokenPatient,
    deletePriscriptionByTokenDoctor
    } from '../controllers/priscription.controller.js'
import { doctorMiddleware,patientMiddleware,roleCheckMiddleware } from '../middlewares/auth.middleware.js'
import { priscriptionValidator } from '../middlewares/priscription.validation.js'


const router = express.Router()

const path = "/prescription"



//...............pharmacist and doctor ...............//
router.get(`${path}/all`,roleCheckMiddleware,getAllPriscriptionPharmacist)
router.get(`${path}/single/:id`,roleCheckMiddleware,getSinglePriscription)
router.put(`${path}/update/:id`,roleCheckMiddleware,updatePriscription)
router.delete(`${path}/delete/:id`,roleCheckMiddleware,deletePriscription)

//................doctor................//
router.post(`${path}/new`,priscriptionValidator,doctorMiddleware,savePriscription)
router.get(`${path}/all-doctor`,doctorMiddleware,getPriscriptionByTokenDoctor)
router.put(`${path}/update-doctor`,doctorMiddleware,updatePriscriptionByTokenDoctor)
router.delete(`${path}/delete-doctor`,doctorMiddleware,deletePriscriptionByTokenDoctor)

//................patient....................//
router.get(`${path}/all-patient`,patientMiddleware,getPriscriptionByTokenPatient)

export default router