import express from 'express'
import {startConnection} from './src/config/database.config.js'
import environment from './src/config/environment.js';
import authRouter from './src/resources/auth/routes/auth.routes.js';
import productsRouter from './src/resources/products/routes/products.routes.js'

const app = express();


startConnection()

app.use(express.json())
app.get('/', function (req, res){
    res.json({message: 'Tu send es correcto'});
});

app.use(authRouter);
app.use(productsRouter);

console.log(`La conexión se ha iniciado en el puerto: ${environment.PORT}`)
app.listen(environment.PORT)
