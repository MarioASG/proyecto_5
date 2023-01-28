import {Router} from 'express';
import {createProduct, deleteProductById, getProductById, getProducts, updateProductById} from '../controllers/products.controller.js';

const productsRouter = Router();

const baseURI = '/products';

productsRouter.post(baseURI, createProduct)
productsRouter.get(baseURI, getProducts)
productsRouter.get(`${baseURI}/:id`,getProductById)
productsRouter.put(`${baseURI}/:id`,updateProductById)
productsRouter.delete(`${baseURI}/:id`,deleteProductById)

export default productsRouter