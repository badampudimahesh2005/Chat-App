
import { Router } from 'express';
import { signUp } from '../controllers/authController.js';


const authRoutes = Router();

authRoutes.post('/signup',signUp,);

export default  authRoutes;
