const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countSchema = new Schema({
    name:String,
    size :Number
  
},{timestamps:true})

const count = mongoose.model("count", countSchema, "count")
module.exports= count;