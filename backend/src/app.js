const express = require('express');
const paymentRouter = require('../src/routes/payment.routes');
const authRouter = require('../src/routes/auth.routes');
const websiteRouter = require('../src/routes/website.routes');
const cookieParser = require("cookie-parser")
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))



app.use('/api/auth', authRouter)
app.use('/api/website', websiteRouter)
app.use('/api/payment', paymentRouter)



module.exports = app ; 