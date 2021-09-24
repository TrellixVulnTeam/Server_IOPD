const express=require('express')
const router=express.Router()
const CartController=require('../app/controllers/CartController')
const { requireSignin, userMiddleware } = require('../middleware')

router.post('/addtocart',requireSignin,userMiddleware,CartController.addItemToCart)
router.post('/getCartItems',requireSignin,userMiddleware,CartController.getCartItems) 

module.exports = router;