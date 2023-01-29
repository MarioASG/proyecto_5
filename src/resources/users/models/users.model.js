//Se define el modelo de mongoose
import bcrypt from 'bcrypt'; //Se importa la librería con el fin de encriptar password
import mongoose from 'mongoose';

const SALT_WORK_FACTOR = 12;

//Esquema de mongoose
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        index: {unique: true}
    },
    password:{
        type: String,
        required: true
    }
});


//Se agrega un middleware que se ejecuta antes del save
//Cada vez que ingrese un nuevo usuario, el valor de la contraseña genera un hash, guardandose en DB
userSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next();
    try{
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    }catch (err){
        return next(err);
    }
});

//Método que valida la constraseña, comparando si la constraseña(data) conincide con la guardada en DB
userSchema.methods.validatePassword = async function validatePassword(data){
    return bcrypt.compare(data, this.password);
}

export const UserModel = new mongoose.model('User', userSchema);