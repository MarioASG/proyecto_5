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
    if (!passwordValid || passwordValidError){ //En caso que sea invalida o haya error, retorna un error 404
        return res.status(404).json({
            status: 'ERROR',
            details: 'El usuario no existe'
        });
    };

//Si lo anterior es válido, continúa la generación de token
    const payload = { //Lo que se guardará en el token
        id: userFound._id,
        fullName: `${userFound.name} ${userFound.surname}`, //Unión del nombre y el apellido
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
    const body = req.body;
//Validación del body
    const [bodyValidated, validateUserError] = await awaitCatcher(validateCreateUserBody(body));//Con joi se valida el body
    if(!bodyValidated || validateUserError){ //Si hay error, retorna 400, detallando el error
        return res.status(400).json({
            status: 'ERROR',
            details: validateUserError?.message || 'Debe completar todos los campos'
        });
    };
    
//Si lo anterior es válido, se crea un nuevo usuario
    const [userCreated, userCreatedError] = await awaitCatcher(createUser(bodyValidated));//Se llama al método createUser
    if (!userCreated || userCreatedError){
        return res.status(400).json({//Si hay error, retorna un 400 detallando el porqué
            status: 'ERROR',
            details: userCreatedError?.message || 'Ocurrió un error mientras se creaba el usuario'
        });
    };

//Si lo anterior es válido, se genera el token con la info del usuario
    const payload = {
        id: userCreated._id,
        fullName: `${userCreated.name} ${userCreated.surname}`,
        email: userCreated.email
    };
    const token = jwt.sign(payload, TOKEN_SECRET,{
//Revisar este tiempo también-----------------------------------------------
        expiresIn: '1h'
    });
    return res.status(201).json({token}) //Se devuelve la info con un 201
};


