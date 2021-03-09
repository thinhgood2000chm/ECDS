const User = require("../models/User");
const bcrypt= require("bcryptjs")
const jwt =  require("jsonwebtoken");
const product = require("../models/product")
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


exports.login=(req,res,next)=>{
    var{email , password}= req.body;

    User.findOne({email:email})
    .then(user=>{
        if(user){
            bcrypt.compare(password,user.password,(err, result)=>{
                if(err){
                    res.json({
                        error:err
                    })
                }
                if(result){
                    let token = jwt.sign({name: user.name},'secrectValue',{expiresIn:'1h'})
                    res.cookie('jwt', token)
                    console.log(token);
                   /* res.json({
                       message:"đăng nhập thành công",
                      // token:token // gửi token
                        token// ghi tắt lịa là thế này vì giống nhau

                    })*/
                    
                   
                    //req.session.user =email
                   res.redirect("/admin")
                }
                else {
                    
                    res.json({
                    message:"password không trùng khớp"
                })
                
                    //res.redirect("/login")
                }
            })
        }
        else{
            res.json({
                message:'người dùng không tồn tại'
            })
        }
    })
}

/*exports.addProduct=(req,res)=>{
    var {name,size,color,amount, color2, color3,amount2,amount3}= req.body
    //console.log(size,classify:[{ color, amount}]);
    //res.send("ahiahi")
   
        let addProduct = new product({
            name: name,
            properties:[{size: size,classify:[{ color:color, amount:amount},{ color:color2, amount:amount2},{ color:color3, amount:amount3}]}]
        })
        addProduct.save()
        .then(addProduct=>
            res.json({
                message: "them tk thanh cong"
            })
        )
        .catch(error =>res.json({
            message:'loi ko them duoc tk'
        }))
   
}*/
//module.exports=register
