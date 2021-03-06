const express = require("express");
const router = express.Router();

router.get("/login",(req,res)=>{
    res.render('login')
})
router.get("/product",(req,res)=>{
    res.render('product')
})
router.get("/register",(req,res)=>{
    res.render('register')
})
router.get("/cart",(req,res)=>{
    res.render('cart')
})

router.get("/detail",(req,res)=>{
    res.render('detail')
})

module.exports=router;
