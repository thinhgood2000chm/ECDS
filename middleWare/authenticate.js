 const e = require("express");
const jwt = require("jsonwebtoken");
const { unsubscribe } = require("../route/auth");
 const authenticate=(req,res,next)=>{
    // try {
         
        const token = req.cookies.jwt;
        if(token){
            jwt.verify(token,'secrectValue',(err, decode)=>{
                if(err){
                    res.redirect('/login')
                }
                else {
                    console.log(decode);
                    next()
                }
            })
        }
        else  res.redirect('/login')
        //console.log(token);
        /*const decode = jwt.verify(token,'secrectValue')
        req.user= decode
        next();*/  
        //  }
 /*}
     catch(error){
        res.json({
            message: " xác minh danh tính thất bại"
        })
     }*/
 }

 module.exports= authenticate