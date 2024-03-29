import { Schema } from 'mongoose';

const paymentSchema = new Schema({
    razorpay_payment_id:{
        type:string,
        required:true
    },
    razorpay_subscription_id:{
        type:String,
        required:true

    },
    razorpay_signature: {
        type: String,
        required: true,
      },

},{
    timestamps: true // Saves created
})

export const Payment = mongoose.model("paymentSchema", paymentSchema);
 