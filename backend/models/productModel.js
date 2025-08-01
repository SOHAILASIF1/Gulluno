import mongoose from "mongoose";
const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    brandName:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    genderCategory:{
        type:String,
        required:true
    },

    sizes:[],
    description:{
        type:String,
        required:true
    },  
   
    productImage:[],
    
    price:{
        type:Number,
        required:true
    },
    sellingPrice:{
        type:Number,
       
    }},
    {
        timestamps:true
    
    
})
const Product = mongoose.model("Product", productSchema);
export default Product