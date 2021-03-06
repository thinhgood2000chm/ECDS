const User = require("../models/User");
const bcrypt= require("bcryptjs")
const jwt =  require("jsonwebtoken");

exports.register = (req,res, next)=>{
    var {password, name, email, confirmPassword} = req.body; 
    bcrypt.hash(password, 10 , (err, hashedPass)=>{
        if(err){
            res.json({
                error:err
            })
        }
        let user = new User({
            name : name,
            email :email,
            password:hashedPass
        }) 
    
        user.save()
        .then(user=>
            res.json({
                message: "them tk thanh cong"
            })
        )
        .catch(error =>res.json({
            message:'loi ko them duoc tk'
        }))
    })
 


}

//module.exports=register
