import express from 'express';
import { Login, registerUser } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/signup',registerUser);
router.post('/login',Login);

export default router;