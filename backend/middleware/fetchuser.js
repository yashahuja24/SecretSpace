const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const fetchuser=async(req,res,next)=>{
    //get the user from the token whic u gave while login and add id to req
    const token=await req.header('auth-token');
    if(!token){
        return res.status(401).send({error : "Please authenticate using a valid token"});
    }
    try{
        const data= jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    } 
    catch (error){
        res.status(401).send({error : "Please authenticate using a valid token"});
    }
}
module.exports=fetchuser;