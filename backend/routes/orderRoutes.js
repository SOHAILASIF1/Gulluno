import express from 'express'
import { authToken } from '../middleware/authToken.js'
import { deleteOrder, getOrders, orderCreate, updateOrderStatus } from '../controller/orderController.js'
const router=express.Router()

router.post("/create-order",authToken,orderCreate)
router.get("/getOrder",authToken,getOrders)
router.put("/update-order-status/:orderId",authToken,updateOrderStatus );
router.delete('/deleteOrder/:orderId', authToken, deleteOrder)
  


export default router