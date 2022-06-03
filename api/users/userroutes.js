import express from 'express';
import { 
    getUsuarios,
    createUsuario,
    login
} from './usercontroller.js';
import { validatetoken } from './auth/validatetoken.js';
const router = express.Router();

router.post('/users/login',login);
router.get('/users',validatetoken,getUsuarios);
router.post('/users',validatetoken,createUsuario);

export {router as userRouter};
