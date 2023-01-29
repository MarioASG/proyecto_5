//Este archivo sirve para implementar las validaciones de la API

import joi from 'joi';

const createProductSchemaValidator = joi.object({
    name: joi.string().max(100).required(),
    description: joi.string().max(300),
    price: joi.string().required(),
    image: joi.string().required()
});

const validateCreateProductBody = async (body)=>{
    return createProductSchemaValidator.validateAsync(body, {
        abortEarly: false
    });
}

export default validateCreateProductBody