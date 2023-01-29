import {Router} from 'express';
import {verifyToken} from '../../auth/middlewares/auth.middlewares.js';
import {createOrder} from '../controllers/orders.controller.js';

//Se define la instancia de express router
const ordersRouter = Router();

//Se define la base de la URI
const baseURI = '/orders';

ordersRouter.post(baseURI, verifyToken, createOrder);



export default ordersRouter;