const jwt = require("jsonwebtoken");


const isAuthorized = async(req , res , next) => {
    try {

        const token = req.cookies.token;

        if(!token){
            return res.status(400).json({
                success: false,
                message: "No Token Provided"
            })
        }

        const verifyToken = jwt.verify(token, process.env.JWT_Secret_Key);

        req.user = { _id: verifyToken.id || verifyToken._id, ...verifyToken };

        next();

        

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

module.exports = isAuthorized;