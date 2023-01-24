import {Router} from 'express'
import {login} from '../controllers/auth.controller.js'

const authRouter = Router()
const baseURI = '/auth'

authRouter.post(`${baseURI}/login`, login);

export default authRouter