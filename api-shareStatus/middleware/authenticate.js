const jwt= require("jsonwebtoken")
require("dotenv").config()
const secretKey=process.env.secret_key

const authenticate=(req, res, next)=>{
    const token=req.header('auth-token');
    if(!token) return res.status(401).json({error:"You are not authorized to access data, please try again with valid token"})
    try {
        const data=jwt.verify(token, secretKey)
        //adding payload of jwt token to the request
        
        req.user=data.user
        next()
    } catch (error) {
        res.status(401).json({error})
    }
}
module.exports=authenticate;