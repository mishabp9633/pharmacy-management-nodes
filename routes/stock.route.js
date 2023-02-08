import express from 'express'
import { stockValidator } from '../middlewares/stock.middleware.js'
import { 
    getAllStock,
    saveStock,
    getSingleStock,
    updateStoke,
    deleteStoke
    } from '../controllers/stock.controller.js'
import { roleCheckMiddleware } from '../middlewares/auth.middleware.js'


const router = express.Router()

const path = "/stock"

router.post(`${path}/new`,roleCheckMiddleware,stockValidator,saveStock )

router.get(`${path}/all`,roleCheckMiddleware,getAllStock)

router.get(`${path}/single/:id`,roleCheckMiddleware,getSingleStock)

router.put(`${path}/update/:id`,roleCheckMiddleware,updateStoke)

router.delete(`${path}/delete/:id`,roleCheckMiddleware,deleteStoke)


export default router