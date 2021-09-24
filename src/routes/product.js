const express=require('express')
const ProductController=require('../app/controllers/ProductController')
const router=express.Router()
const Product=require('../app/models/Product')
const multer=require('multer')
const shortid=require('shortid')
const path = require("path");
const { requireSignin, adminMiddleware } = require('../middleware')



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post('/create',requireSignin,adminMiddleware,upload.array('productPicture'), ProductController.create)
router.get('/products/:slug',ProductController.getProductBySlug)
router.get("/:productId", ProductController.getProductDetailsById);
module.exports = router;