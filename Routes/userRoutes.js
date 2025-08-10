import express from 'express';
import { showAllUsers, addNewUsers } from '../Controller/userController.js';

const router = express.Router();

router.get('/users',showAllUsers);
router.post('/addEntry',addNewUsers);


export default router;
