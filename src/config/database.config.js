import mongoose from 'mongoose';
import environment from './environment.js';

mongoose.set('strictQuery', false);

const mongoDBURI = environment.DB_URI;

export const startConnection = ()=>{
  mongoose.connect(mongoDBURI).then(()=> console.log('Conexión establecida')).catch(error => console.error(error))
};

const db = mongoose.connection;
export default db;