import mongoose from "mongoose"
const cartSchema = new mongoose.Schema({
    productId:{
        ref: "Product",
        type:String
    },
    quantity:Number,
    userId:String
},{
    timestamps:true

})
const Cart=mongoose.model("Carts",cartSchema)
export default Cart