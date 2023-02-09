import express from 'express'
import { save } from '../controllers/pharmacybill.controller.js'
import { pharmacybillValidator } from '../middlewares/pharmacybill.validation.js'



const router = express.Router()

const path = "/pharmacybill"

router.post(`${path}/new`,pharmacybillValidator,save)

router.get(`${path}/all`,)

router.get(`${path}/single/:id`,)

router.put(`${path}/update/:id`,)

router.delete(`${path}/delete/:id`,)


export default router