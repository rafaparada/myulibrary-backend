import { 
    getUsers,
    createUser,
    loginUser,
} from './userservice.js';
import {hashSync,genSaltSync,compareSync} from 'bcrypt';
import jwt from 'jsonwebtoken';

const createUsuario = (req,res)=>{
    const salt = genSaltSync(10);
    req.body.password = hashSync(req.body.password,salt);
    const values = Object.values(req.body);
    createUser(values,(error,results)=>{
        if(error){
            res.status(500).json({success:false,message:'Error creating user'});
        }else{
            res.status(200).json({success:true,message:'User have been created'});
        }
    });
}

const login = (req,res)=>{
    const user  = req.body.user;
    const password = req.body.password;
    loginUser (user,(error,result)=>{
        if(result.length !== 0){
            const dbpassword = result[0]?.password;
            const arePasswordEquals = compareSync(password,dbpassword);
            delete result[0].password;
            if(error){
                res.status(500).json({login:false,message:'Error'});
            }else{
                if(result.length !== 0 && arePasswordEquals){
                    const jsontoken = jwt.sign({result:result},'rafparadaprogrammer',{expiresIn:'1d'});
                    res.status(200).json({login:true,userInfo:result,token:jsontoken});
                }else{
                    res.status(200).json({login:false,message:'Invalid user or password'});
                }
            }
        }else{
            res.status(200).json({login:false,message:'Invalid user or password'});
        }
    });
}

const getUsuarios = (req,res) =>{
    getUsers((error,result)=>{
        if(error){
            res.status(500).json({success:true,message:'Error al procesar la solicitud'});
        }else{
            res.status(200).json({success:true,users:result});
        }
    });
}

export {
    getUsuarios,
    createUsuario,
    login
};

