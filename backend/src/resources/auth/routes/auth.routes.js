import {Router} from 'express';
import {login} from '../controllers/auth.controller.js';
import {signup} from '../controllers/auth.controller.js'
//Se define router
const authRouter = Router();
//Se define la base de la URI
const baseURI = '/auth';
//Se generan los recursos login y signup
authRouter.post(`${baseURI}/login`, login);
authRouter.post(`${baseURI}/signup`, signup);
//Se exporta authRouter
export default authRouter