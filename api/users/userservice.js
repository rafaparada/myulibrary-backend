import dbconnection from '../../config/dbconnection.js';

const getUsers = (callBack) =>{
    const myQuery = 'SELECT * FROM users';
    dbconnection.query(myQuery,(error,result)=>{
        if(!error){
           return callBack(null,result);
        }else{
            return callBack(error);
        }
    });
}

const createUser = (values,callBack)=>{
    const insertQuery = `
    INSERT INTO 
        users(
        firstname,
        lastname,
        email,
        user,
        password,
        role
        ) VALUES(?,?,?,?,?,?);`;
    dbconnection.query(insertQuery,values,(error,result)=>{
        if(error){
            return callBack(error,result);  
        }
        return callBack(null,result);
    });
}

const loginUser = (values,callBack)=>{
    const myLoginQuery = 'SELECT * FROM users WHERE user = ?';
    dbconnection.query(myLoginQuery,values,(error,user)=>{
        if(!error){
            return callBack(null,user);
        }else{
            return callBack(error);
        }
    });
}




export {
    getUsers,
    createUser,
    loginUser,
};