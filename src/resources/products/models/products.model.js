import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        maxLength: 100,
        required: true
    },
    description:{
        type: String,
        required: false,
        maxLength: 100,
        minLength: 2
    },
    price:{
        type: String,
        required: false,
        maxLength: 100
    },
    image:{
        type: String,
        required: false
    }

})

export const ProductModel = new mongoose.model('Product', productSchema)