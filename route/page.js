const express = require("express");
const router = express.Router();
const productModule = require('../models/product')
const authenticate = require("../middleWare/authenticate")
const authController = require("../controller/authController");
var product = productModule.find({})
//const Products = require("../models/product")
const userCartAndHistory = require('../models/userCartAndHistory')
var ucah= userCartAndHistory.find({})



router.get("/register",(req,res)=>{
    res.render('register')
})
router.get("/login",(req,res)=>{
    if(req.cookies.user){
        if(req.cookies.user.includes("admin752")){
            res.redirect('/admin')
        }
        else{
                 res.redirect('/cart')
        }
    }
  
    else
    res.render("login")
})
router.get('/admin',authenticate, (req,res)=>{     
    if(req.cookies.user){
        if(req.cookies.user.includes("admin752"))
            res.render("admin")
    }
    else res.redirect('/cart')
    
})
router.get("/product",(req,res)=>{
  product.exec((err,data)=>{
      if(err) throw err;
      res.render('product',{product:data})
  })
    
})

router.get("/cart",authenticate,(req,res)=>{
   if(req.cookies.user){
    if(!req.cookies.user.includes("admin752")){
        ucah.exec((err,data)=>{
            if(err) throw err;
            res.render('cart',{ucah:data})
        })
     
      }
      else res.redirect('/admin')
    }
        
    

})


router.get('/logout',(req,res)=>{
    res.clearCookie("jwt");
    res.clearCookie("user");
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
    productModule.findById(id,(err,result)=>{
        res.render('update',{result})
    })
   
})


router.get("/detail/:id",(req,res)=>{
    const id2 = req.params.id;
    console.log(id2);
    productModule.findById(id2,(err,result)=>{
        res.render('detail',{result})
    })


    
})
//router.get("/payment",(req,res)=>{

module.exports=router;
