SECRET="Jay"
import jwt from 'jsonwebtoken'
const fetchUser=(req,res,next)=>{
    try {
        const token=req.cookie.token;
        if(!token){
            res.stauts(401).json({success:false,message:"Invalid Authentication"})
        }
        const data=jwt.verify(token,SECRET);
        req.user=data.userId
        req.class=data.class
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({success:false,message:"Invalid or Token expired"})
    }
}

export default fetchUser;