import jwt from 'jsonwebtoken';

const validatetoken = (req,res,next)=>{
    let token = req.get('authorization');
    if(token){
        token = token.slice(7);
        jwt.verify(token,'rafparadaprogrammer',(error,decoded)=>{
            if(error){
                return res.json({success:0,message:'Wrong Token'});
            }else{
                req.decoded = decoded;
                next();
            }
        });
    }else{
        return res.json({message:'Access Denied'});
    }

}

export {validatetoken}