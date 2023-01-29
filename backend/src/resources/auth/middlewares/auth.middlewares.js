//Middleware para verificar tokens (Protegerlos)
import jwt from 'jsonwebtoken';
import environment from '../../../config/environment.js'
const {TOKEN_SECRET} = environment;

export const verifyToken = (req, res, next)=>{ //Petición - respuesta - next(llama al siguiente middleware)
//Se extrae el token del header y se guarda en la variable authHeader
    const authHeader = req.headers['authorization']; //Se extrae del header y que sea el authorization
    //{'authorization': Bearer <token>}
    const token = authHeader  &&  authHeader.split(' ')[1];// Se splitea para extraer el token [1] y dejar bearer[0] fuera
//Si existe, se extrae la información del token
    if(!token) //Si no existe devuelve un 401
    return res.status(401).json({
        status: 'ERROR',
        error: 'No se encuentra el token'
    })
    try{
//Se incorpopra la request en la variable user y luego se retorna
        const payload = jwt.verify(token, TOKEN_SECRET);//Verifica que el token sea valido y no haya expirado
        req.user = payload; //retorna la info en payload
        next();
    } catch(error){
        if (error instanceof jwt.TokenExpiredError){ //Error si el token expiró
            res.status(401).json({
                status: 'ERROR',
                error: 'Expiró el token'
            });
        }
        else if (error instanceof jwt.JsonWebTokenError){//Error si el token no es válido
            req.status(401).json({
                status: 'ERROR',
                error: 'El token no es válido'
            });
        };
    };

};