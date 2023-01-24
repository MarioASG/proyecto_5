import {awaitCatcher} from 'await-catcher';
import jwt from 'jsonwebtoken';
import environment from '../../../config/environment.js';
import {createUser, findUserByEmail} from '../../users/controllers/users.controllers.js';
import validateCreateUserBody from '../../users/validators/users.validators.js';
const {TOKEN_SECRET} = environment;

//Código de login de usuario
export const login = async (req, res)=>{
    const {email, password} = req.body; //Se obtiene el correo y contraseña del body
//Busqueda de usuario en DB para verificar si password es válido
    const [userFound, userFoundError] = await awaitCatcher(findUserByEmail(email)); //Buscar usuario por email
//En caso de error, se retorna error 404
    if(!userFound || userFoundError){
        return res.status(404).json({
            status: 'ERROR',
            details: 'El usuario no existe'
        });
    };
//Teniendo al usuario, se valida la constraseña comparando con la que está en DB
    const [passwordValid, passwordValidError] = await awaitCatcher(userFound.validatePassword(password));
    if (!passwordValid, passwordValidError){
        return res.status(404).json({
            status: 'ERROR',
            details: 'El usuario no existe'
        });
    };

//Generación de token
    const payload = {
        id: userFound._id,
        fullName: `${userFound.name} ${userFound.surname}`,
        email: userFound.email
    };
    const token = jwt.sign(payload, TOKEN_SECRET,{
//Revisar este tiempo-------------------------------------------------------
        expiresIn: '1h'
    });
    return res.json({token});
};


//Código de registro de usuario
export const signup = async (req, res)=>{
    const body = req.body
//Validación del body
    const [bodyValidated, validateUserError] = await awaitCatcher(validateCreateUserBody(body));
    if(!bodyValidated || validateUserError){
        return res.status(400).json({
            status: 'ERROR',
            details: validateUserError?.message || 'Debe completar todos los campos'
        });
    };
    
//Se crea un nuevo usuario
    const [userCreated, userCreatedError] = await awaitCatcher(createUser(bodyValidated));
    if (!userCreated || userCreatedError){
        return res.status(400).json({
            status: 'ERROR',
            details: userCreatedError?.message || 'Ocurrió un error mientras se creaba el usuario'
        });
    };

//Generación de token
    const payload = {
        id: userCreated._id,
        fullName: `${userCreated.name} ${userCreated.surname}`,
        email: userCreated.email
    };
    const token = jwt.sign(payload, TOKEN_SECRET,{
//Revisar este tiempo también-----------------------------------------------
        expiresIn: '1h'
    });
    return res.status(201).json({token})
};


