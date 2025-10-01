import jwt  from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
const authHeader = req.headers['authorization']; 
if(!authHeader) return res.status(401).json({message:"No autorizado"});
const token = authHeader.split(' ')[1]; //formato //[Bearer,token]
if(!token) return res.status(401).json({message:"No autorizado"});
jwt.verify(token,process.env.Secret,(err,user)=>{
    if(err){
        
        return res.status(403).json({message:"Token expirado"});
    }
    else{
        req.id=user.id;
        next();

    }
});
}