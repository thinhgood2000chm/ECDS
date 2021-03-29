const mongoose = require("mongoose");

const Schema = mongoose.Schema

const UserCartAndHistory= new Schema({
    idFromProduct: String,
    nameUser: String,
    email: String,
    phone:String,
    check: String,// dùng để hiên thị trạng thái nếu false chwua mua, true đã mua 
    checkAdmin:String,// dùng để hiển thị sản phẩm lên trang total 
    acceptAdmin:String,// dùng để hiển thị hoặc xóa sp sau khi đã bấm chấp nhận
    type:String,
    name: String,
    image: String,
    price: Number,
    color: String,
    size: String,
    amount: Number,
    year:String,
    months: String

},{timestamps: true})
const cartAndHistory = mongoose.model('cartAndHistory',UserCartAndHistory,'cartAndHistory')
module.exports=cartAndHistory