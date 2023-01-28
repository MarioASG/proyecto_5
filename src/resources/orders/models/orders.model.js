import mongoose, {SchemaTypes} from 'mongoose';
//Esquema de la orden de pago
const orderSchema = new mongoose.Schema({
    user:{ //Usuario que paga
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    products:[{ //Lista de productos a comprar
        type: SchemaTypes.ObjectId,
        ref: 'Product'
    }]
}, {
    timestamps: true
});


export const OrderModel = new mongoose.model('Order', orderSchema);