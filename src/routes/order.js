const router=require("express").Router()
const {requireSignin, userMiddleware}=require('../middleware')
const OrderController=require('../app/controllers/OrderController')

router.post("/addOrder",requireSignin,userMiddleware,OrderController.addOrder)
router.get("/getOrders",requireSignin,userMiddleware,OrderController.getOrders)

module.exports=router