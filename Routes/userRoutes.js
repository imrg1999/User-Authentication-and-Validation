import express from 'express';
import { showAllUsers, addNewUsers,findyUserBYId } from '../Controller/userController.js';

const router = express.Router();

router.get('/users',showAllUsers);
router.get('/users/:id',findyUserBYId)
router.post('/addEntry',addNewUsers);


export default router;
