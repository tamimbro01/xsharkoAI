const razorpayInstance = require("../../config/razerPay.config");
const Payment = require("../models/payment.models");
const User = require("../models/user.models");
const crypto = require("crypto");

const createOrder = async (req, res) => {
    try {
        const { planId, amount, credits } = req.body;

        if (!amount || !credits) {
            return res.status(400).json({ message: "Invalid Plan Data" })
        }

        const options = {
            amount: Math.max(amount * 100, 100),
            currency: "INR",
            receipt: "receipt" + Date.now(),
            payment_capture: 1,
        };

        const order = await razorpayInstance.orders.create(options);


        await Payment.create({
            userId: req.user._id,
            planId,
            amount,
            credits: credits,
            razorpayOrderId: order.id,
            status: "Pending"

        })

        return res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const verifyPayment = async (req, res) => {
    try {

        const { paymentId, orderId, signature } = req.body;


        const body = orderId + "|" + paymentId;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body).digest("hex")


        if (expectedSignature !== signature) {
            return res.status(400).json({
                message: "Invalid Payment Signature"
            })
        }


        const payment = await Payment.findOne({
            orderId: orderId
        })

        if (!payment) {
            return res.status(400).json({
                message: "Payment Not Found"
            })
        }

        if (payment.status === "success") {
            return res.status(400).json({
                message: "Payment Processed Already"
            })
        }

        payment.status = "success";
        payment.razorpayPaymentId = paymentId;
        await payment.save();

        const updateUser = await User.findByIdAndUpdate(payment.userId, {
            $inc: { credits: payment.credits },
            plan: payment.planId,
        },
            {
                new: true,
            }


        );

        res.status(200).json({
            success: true,
            message: "Payment Verfied Successfully",
            user: updateUser,
            plan: updateUser.plan,
        })






    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })

    }
}


module.exports = {
    createOrder,
    verifyPayment
}