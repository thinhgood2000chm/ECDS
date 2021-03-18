const express = require("express");
const router = express.Router();
const productModule = require('../models/product')
const authenticate = require("../middleWare/authenticate")
const authController = require("../controller/authController");
var product = productModule.find({})
//const Products = require("../models/product")
const userCartAndHistory = require('../models/userCartAndHistory')
var ucah= userCartAndHistory.find({})
const countData = require('../models/countData')


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
//thêm await vào 
router.get('/admin',authenticate, (req,res)=>{     
    if(req.cookies.user){
        if(req.cookies.user.includes("admin752")){
            countData.findOne({_id:"6052c92740e2ecb346533a29"},(err,doc)=>{
                // console.log(doc.size);
                 var sizeOfProduct =doc.size 
               
                     product.find({},(err, doc)=>{
                         for(var i=0;i<sizeOfProduct;i++){
                             console.log(doc[i].name);
                             var namePCheck=doc[i].name
                             var lengthOfproperties=doc[i].properties.length
                             //console.log(lengthOfproperties);
                             for(var j=0;j<lengthOfproperties;j++){
                                 console.log(doc[i].properties[j].color);
                                 var colorCheck= doc[i].properties[j].color
                                 for(var z=0; z<doc[i].properties[j].classify.length;z++){
                                     console.log(doc[i].properties[j].classify[z].amount);
                                     amountCheck=doc[i].properties[j].classify[z].amount;
                                     if(amountCheck<=10){
                                         //console.log("sản phẩm "+ namePCheck+" màu "+colorCheck+" chỉ còn lại "+amountCheck+" vui lòng bổ xung thêm" );
                                        res.render("admin",{notif:"sản phẩm "+ namePCheck+" màu "+colorCheck+" chỉ còn lại "+amountCheck+" vui lòng bổ xung thêm"})
                                   }
                                   else      res.render("admin",{notif:""})
                                 }
                             }
                         }
                     })
                 
               
             })

        

        }
           
    }
    else res.redirect('/cart')
    
})
router.get("/product",(req,res)=>{
  product.exec((err,data)=>{
      if(err) throw err;
      res.render('product',{product:data})
  })
    
})

router.get("/productUser",(req,res)=>{
    product.exec((err,data)=>{
        if(err) throw err;
        res.render('productUser',{product:data})
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
router.get('/payment/:id/:idFromProduct/:color/:size/:amount',authController.payment)

router.get("/deleteItemFCart/:id",authController.deleteItemFCart)

module.exports=router;
