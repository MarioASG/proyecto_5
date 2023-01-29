//Se crea el esquema de validación
import joi from 'joi';


//Validamos en el esquema si son 'STRINGS' y si son 'REQUIRED'
const createUserSchemaValidator = joi.object({
    name: joi.string().required(),
    surname: joi.string().required(),
    email: joi.string().email().required(),//Además de validar si el apartado email corresponde a un formato válido
    password: joi.string().required(),

})

//Se define el método para realizar la validación
const validateCreateUserBody = async (body)=>{
    return createUserSchemaValidator.validateAsync(body, {abordtEarly: false});
}

//Se exporta
export default validateCreateUserBody;