import mongoose , { Schema } from "mongoose";

const productSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    productName : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    productImage : {
        type : String
    },
    quantity : {
     type : Number,   
    }
}, {timestamps : true})

export const Product = mongoose.model('Product', productSchema)