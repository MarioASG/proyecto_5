import {awaitCatcher} from 'await-catcher'
import {ProductModel} from '../models/products.model.js'
import validateCreateProductBody from '../validators/products.validators.js'

//createProduct para validar data entrante

export const createProduct = async (req, res)=>{
    const body = req.body
    const [bodyValidated, validationError] = await awaitCatcher(validateCreateProductBody(body))
    if(validationError){
        console.log('error', validationError);
        const errorResponse = {
            status: 'ERROR',
            details: validationError.message
        }
        return res.status(400).json(errorResponse)
    }

    const [newProduct, creationError] = await awaitCatcher(ProductModel.create(bodyValidated))
    if(creationError){
        console.log('error', creationError);
        const errorResponse = {
            status: 'ERROR',
            details: creationError.message
        }
        return res.status(400).json(errorResponse)
    }
    return res.json(newProduct)
}

//CRUD

export const getProducts = async (req, res)=>{
    
    const [products, getProductsError] = await awaitCatcher(ProductModel.find())
    if(getProductsError){
        console.log('error', getProductsError);
        const errorResponse = {
            status: 'ERROR',
            details: getProductsError.message
        }
        return res.status(400).json(errorResponse)
    }
    return res.json(products)
}

export const getProductById = async (req, res)=>{
    const id = req.params.id
    const [product, getProductError] = await awaitCatcher(ProductModel.findById(id))
    
    if(getProductError){
        console.log('error', getProductError);
        const errorResponse = {
            status: 'ERROR',
            details: getProductError.message
        }
        return res.json(product)
    }
    
    res.json(product)
}

export const updateProductById = async (req, res)=>{
    const body = req.body
    const id = req.params.id

    const [productUpdated, updateError] = await awaitCatcher(ProductModel.findByIdAndUpdate(id, body, {new:true}))
        
    if(updateError){
        console.log('error', updateError);
        const errorResponse = {
            status: 'ERROR',
            details: updateError.message
        }
        return res.status(400).json(errorResponse)
    }
    
    res.json(productUpdated)
}

export const deleteProductById = async (req, res)=>{
    const id = req.params.id
    const [productDeleted, deleteError] = await awaitCatcher(ProductModel.findByIdAndDelete(id))
    
    if(deleteError){
        console.log('error', deleteError);
        const errorResponse = {
            status: 'ERROR',
            details: deleteError.message
        }
        return res.status(400).json(errorResponse)
    }


    res.json(productDeleted)
}