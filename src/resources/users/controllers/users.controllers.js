//Se agregan 3 métodos
import {UserModel} from '../models/users.model.js';

//Método para crear usuarios
export const createUser = async (body)=>{
    const newUser = await UserModel.create(body);
    return newUser;
}

//Método para encontrar usuarios por email
export const findUserByEmail = async (email)=>{
    const userFound = await UserModel.findOne({
        email: email
    });
    return userFound;
}

//Método para obtener el perfil
//Token devuelve la información a traves de la request usando el middleware en la carpeta auth
//el cual verifica tokens, extrayendolo del header, validandolo si existe
export const getProfile = async (req, res)=>{
    const user = req.user; 
    return res.json(user);

}