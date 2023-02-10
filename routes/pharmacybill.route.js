import express from 'express'
import { deletePharmacybill,
     getAllPharmacyBill, getPharmacybillByTokenPatient, 
     getSinglePharmacybill,
      save, 
      updatePharmacybill, 
    } from '../controllers/pharmacybill.controller.js'
import { pharmacybillValidator } from '../middlewares/pharmacybill.validation.js'
import { patientMiddleware, pharmacistMiddleware, roleCheckMiddleware } from '../middlewares/auth.middleware.js'



const router = express.Router()

const path = "/pharmacybill"

router.post(`${path}/new`,pharmacistMiddleware,pharmacybillValidator,save)

router.get(`${path}/all`,roleCheckMiddleware,getAllPharmacyBill)
router.get(`${path}/all-patient`,patientMiddleware,getPharmacybillByTokenPatient)

router.get(`${path}/single/:id`,roleCheckMiddleware,getSinglePharmacybill)

router.put(`${path}/update/:id`,roleCheckMiddleware,updatePharmacybill)

router.delete(`${path}/delete/:id`,roleCheckMiddleware,deletePharmacybill)


export default router