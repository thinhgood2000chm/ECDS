const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    /*id :{
        type: String
    },
    name :{
        type: String
    },
    cost :Number,
    /*image :{
        type: String
    },*/
    name :{
        type: String
    },
    properties:[{
        size: String,
        classify:[{
            color: String,
            amount: Number
        }]
        

    }]
    
},{timestamps:true})

const product = mongoose.model("product", productSchema, "product")
module.exports= product;