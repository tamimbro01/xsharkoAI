const mongoose = require("mongoose");


const paymentSchema = new mongoose.Schema(

    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,

        },

        planId:String,
        amount:Number,
        credits:Number,

        razorpayOrderId: String,
        razorpayPaymentId: String,
        razorpaySignature: String,

        status:{
            type:String,
            enum: ["pending", "success", "failed"],
            default: "pending",
        }    
        
    },
        
    
    
    {timestamps:true}
)
const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;