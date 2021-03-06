const express = require("express");
const router = express.Router();
const authenticate = require("../middleWare/authenticate")
router.get("/login",(req,res)=>{
    if(req.cookies.jwt){
        res.redirect('/admin')
    }
    else
    res.render("login")
})
router.get('/admin',authenticate, (req,res)=>{     
    res.render("admin")
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

router.get('/logout',(req,res)=>{
    res.clearCookie("jwt");
    res.redirect('/login')
})

module.exports=router;
