const express = require("express");
const router = express.Router();
const productModule = require('../models/product')
const authenticate = require("../middleWare/authenticate")
const authController = require("../controller/authController");
var product = productModule.find({})
const Products = require("../models/product")
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
  product.exec((err,data)=>{
      if(err) throw err;
      res.render('product',{product:data})
  })
        
  
    
})
router.get("/register",(req,res)=>{
    res.render('register')
})
router.get("/cart",(req,res)=>{
    res.render('cart')
})


router.get('/logout',(req,res)=>{
    res.clearCookie("jwt");
    res.redirect('/login')
})
router.get('/delete/:id',authController.deleteProduct)


router.get('/addProduct',(req,res)=>{
    res.render('adProduct')
})
router.get('/update/:id', (req,res)=>{
    var id = req.params.id;
    console.log("id: ",id);
    console.log(id);
    Products.findById(id,(err,result)=>{
        res.render('update',{result})
    })
   
})


router.get("/detail/:id",(req,res)=>{
    const id2 = req.params.id;
    console.log(id2);
    Products.findById(id2,(err,result)=>{
        res.render('detail',{result})
    })


    
})


module.exports=router;
