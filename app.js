import cors from 'cors';
import express from 'express';
import {startConnection} from './src/config/database.config.js'
import environment from './src/config/environment.js';
import authRouter from './src/resources/auth/routes/auth.routes.js';
import productsRouter from './src/resources/products/routes/products.routes.js';
import usersRouter from './src/resources/users/routes/users.routes.js';
import ordersRouter from './src/resources/orders/routes/orders.routes.js';

//Instancia express
const app = express();

//Inicio de la conexión a la DB
startConnection();

//Se configura cors
app.use(cors());

//Se configura el middleware para aceptar las request tipo JSON
app.use(express.json());
//Ruta endpoint por default
app.get('/', function (req, res){
    res.json({
        message: 'Tu send es correcto'
    });
});

//Endpoint de auth
app.use(authRouter);
//Endpoint de products
app.use(productsRouter);
//Endpoint de users
app.use(usersRouter);
//Endpoint de orders
app.use(ordersRouter)

//Inicio de la aplicación
console.log(`La conexión se ha iniciado en el puerto: ${environment.PORT}`)
app.listen(environment.PORT)
