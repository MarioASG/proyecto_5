import awaitCatcher from 'await-catcher';
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
    const body = {
        products: req.body.products.map(product => product._id),
        user: user.id};
    const [orderCreated, orderCreatedError] = await awaitCatcher( OrderModel.create(body)); //Se crea la orden
    if (!orderCreated || orderCreatedError){//Retorna error si éste existe
      const errorResponse = {
        status: 'ERROR',
        details: orderCreatedError?.message || 'Error al hacer la petición'
      };
      return res.status(400).json(errorResponse);
    }
  
    //Se realiza el populate de los productos
    const [orderPopulated, orderPopulatedError] = await awaitCatcher(orderCreated.populate('user').populate('products').execPopulate());
    if (!orderPopulated || orderPopulatedError){
      const errorResponse = {
        status: 'ERROR',
        details: orderPopulatedError?.message || 'Error al hacer la petición'
      };
      return res.status(400).json(errorResponse);
    }
  //Se define el producto a enviar a mercadopago para que devuelva el ID solicitado
    const items = orderPopulated.products.map( product =>{
      return {
        title: product.name,
        unit_price: parseInt(product.price),
        quantity: 1
    }
    });//Listado de productos de compra
  
//Método preferencesCreate para obtener el ID de preferencia usado en el FRONT
    const [preferenceId, preferenceIdError] = await awaitCatcher(mercadopago.preferences.create({items}));
    if (!preferenceId || preferenceIdError){//Devuelve un error si éste existe
      const errorResponse = {
        status: 'ERROR',
        details: preferenceIdError?.message || 'Error al hacer la petición'
      }
      return res.status(400).json(errorResponse);
    };
  
    return res.status(201).json({preferenceId}); //Obtenemos el ID si todo sale bien
  };