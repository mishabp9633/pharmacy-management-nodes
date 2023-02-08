import express from 'express'
import { getPharmacistDetailsByToken } from "../controllers/pharmacy.controller.js"
import { pharmacistMiddleware } from '../middlewares/auth.middleware.js'



const router = express.Router()

const path = "/patient"

router.get(`${path}/get`,pharmacistMiddleware,getPharmacistDetailsByToken)




export default router;
