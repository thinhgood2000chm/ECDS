const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countSchema = new Schema({
    name:String,
    size :Number
  
},{timestamps:true})

const countData = mongoose.model("countData", countSchema, "countData")
module.exports= countData;