import {Router} from 'express';
import {verifyToken} from '../../auth/middlewares/auth.middlewares.js';
import {getProfile} from '../controllers/users.controllers.js';

const usersRouter = Router();

const baseURI = '/users';
//Se define la ruta que entregará la info del perfil del usuario
usersRouter.get(`${baseURI}/profile`, verifyToken, getProfile);//Se valida el token
//Si el token es válido, en la request se agregan los datos del usuario
//Se extraen los datos de la request y luego la retorna

export default usersRouter;
