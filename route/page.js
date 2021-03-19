const express = require("express");
const router = express.Router();
const productModule = require('../models/product')
const authenticate = require("../middleWare/authenticate")
const authController = require("../controller/authController");
const userCartAndHistory = require('../models/userCartAndHistory')
var ucah= userCartAndHistory.find({})
const total = require('../models/total')

var product = productModule.find({})

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
    var arr =[]// mảng dùng để lưu thông tin thông báo 
    if(req.cookies.user){
        if(req.cookies.user.includes("admin752")){
            /*countData.findOne({_id:"6052c92740e2ecb346533a29"},(err,doc)=>{
                 console.log(doc.size);
                 var sizeOfProduct =doc.size */
               
                 // dùng mảng để lưu giá trị thông báo sau đó gửi mảng qua ejs
                     product.find({},(err, doc)=>{
                        console.log(doc.length);
                         for(var i=0;i<doc.length;i++){
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
                                         console.log("sản phẩm "+ namePCheck+" màu "+colorCheck+" chỉ còn lại "+amountCheck+" vui lòng bổ xung thêm" );
                                        let temp ="sản phẩm "+ namePCheck+" màu "+colorCheck+" chỉ còn lại "+amountCheck+" vui lòng bổ xung thêm";
                                        arr.push(temp)
                                   }
                                 }
                             }
                         }
                         // vị trí cuối cùng nếu cho ra ngoài phạm vi này arr sẽ ko có giá trị
                         console.log('arr',arr[0]);
                         res.render('admin',{arr})
                     })

            // })

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
    var dataOfUser= []
   if(req.cookies.user){
    if(!req.cookies.user.includes("admin752")){
        /*ucah.exec((err,data)=>{
            
            if(err) throw err;
            res.render('cart',{ucah:data, message:""})
        })*/
        userCartAndHistory.find({},(err,data)=>{
            for(var i=0; i<data.length;i++){
                console.log(data[i].email);
                console.log(req.cookies.user);
                if(data[i].email===req.cookies.user){
                    dataOfUser.push(data[i])
                    console.log('dataOfUser',dataOfUser);
                    //console.log('data',data);
                   // return res.render('cart',{ucah:data, message:""})
                }
            }
            res.render('cart',{ucah:dataOfUser, message:""})
            //res.render('cart',{ucah=""})
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

router.get('/user/history', (req,res)=>{
    var dataHisttoryUser =[]
    userCartAndHistory.find({check: "true"},(err,result)=>{
        for(var i=0; i< result.length;i++){
            if(result[i].email===req.cookies.user){
                console.log("trùng khớp");
                dataHisttoryUser.push(result[i])
                console.log('dataHisttoryUser',dataHisttoryUser);
               
            }
           
        }
        res.render('historyUser',{results:dataHisttoryUser})
     
        
    })
   
   
})
router.get('/total',(req,res)=>{
    //var total=0
    userCartAndHistory.find({check: "true"},(err,results)=>{
         res.render('total',{results})
    })
})
router.get('/payment/:id/:idFromProduct/:color/:size/:amount',authController.payment)

router.get("/deleteItemFCart/:id",authController.deleteItemFCart)


module.exports=router;
