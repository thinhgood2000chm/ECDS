const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const upload = require("../middleWare/upload");

router.post('/register',authController.register)
router.post('/login', authController.login)
router.post('/addProduct',upload.single('image'),authController.addProduct)
router.post('/delete',authController.deleteProduct)
router.post('/update',authController.updateProduct)
module.exports=router