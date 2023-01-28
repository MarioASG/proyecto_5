import * as dotenv from 'dotenv';

//Acá se cargan las variables de entorno
dotenv.config();

export default {
  PORT: process.env.PORT || 4500,
  DB_URI: process.env.DB_URI,//Nuestra URI
  TOKEN_SECRET: process.env.TOKEN_SECRET,//Token secreto
  TOKEN_MERCADO_PAGO: process.env.TOKEN_MERCADO_PAGO //Access Token de mercadopago
};