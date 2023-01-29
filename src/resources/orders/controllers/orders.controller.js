import {awaitCatcher} from 'await-catcher';
import mercadopago from 'mercadopago';
import environment from '../../../config/environment.js';
import {OrderModel} from '../models/orders.model.js';

//Método para crear una orden---------------------------

mercadopago.configure( {
    access_token: environment.TOKEN_MERCADO_PAGO //Se define el token para realizar la operación
  });
  export const createOrder = async (req, res)=>{
    const user = req.user //Se extrañe el usuario de la request
    //Se extraen los productos de la request y se mapea para devolver los ID
    //Devolviendo la ID del usuario que hizo la request
    const productsIds = req.body.products.map( product => product._id )
    const body = {
        products: productsIds,
        user: user.id
  }
  const [ orderCreated, orderCreatedError ] = await awaitCatcher( OrderModel.create( body ) )
  if ( !orderCreated || orderCreatedError ) {
    const errorResponse = {
      status: 'ERROR',
      details: orderCreatedError?.message || 'Error al realizar la petición'
    };
    return res.status(400).json(errorResponse)
  };

  const items = req.body.products.map(product =>{
    return {
      title: product.name,
      unit_price: parseInt(product.price),
      quantity: product.quantity
    };
  });

  const [preferenceId, preferenceIdError] = await awaitCatcher(mercadopago.preferences.create({
    payer: {
      name: user.fullName,
      email: user.email
    }, items 
  }));
  if (!preferenceId || preferenceIdError){
    const errorResponse = {
      status: 'ERROR',
      details: preferenceIdError?.message || 'Error al realizar la petición'
    };
    return res.status(400).json(errorResponse)
  };

  return res.status(201).json({preferenceId})
};