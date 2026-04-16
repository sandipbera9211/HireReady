import express from 'express'
import { login, logout, signUp } from '../controllers/AuthController.js';

const authRouter=express.Router();

authRouter.post('/sign-up',signUp);
authRouter.post('/sign-in',login);
authRouter.post('/log-out',logout)

export default authRouter;