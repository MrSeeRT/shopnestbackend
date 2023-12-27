const User = require("../model/auth-model")
const jwt = require("jsonwebtoken")

const authMiddleware=async (req, res, next)=> {
const token = req.header("Authorization");
if(!token){
    //Invalid token
    return res.status(400).json("Unathorized HTTP, token not provided")
}
const jwtToken= token.replace("Bearer","").trim();
try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    // console.log(isVerified)
const userData= await User.findOne({email: isVerified.email}).select({
    password:0,
}
)
// console.log(userData)
req.token =token;
req.user = userData;

} catch (error) {
    console.log("Unathorized token")
}

next();
}
module.exports = authMiddleware;