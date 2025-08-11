import { getProfile } from '../Controller/authController.js';
import { Router } from 'express';
import { login, register } from '../Controller/authController.js';
import { authMiddleware } from '../Middleware/authMiddleware.js';


const router = new Router();

router.post('/register',register);
router.post('/login',login);
router.get('/profile', authMiddleware, getProfile);

export default router;