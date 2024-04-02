import express from 'express';
import { addUser, allUsers, searchUsers, deleteUser, updateUser } from '../Controllers/UserControllers.js';

const router = express.Router();

router.get('/', allUsers);
router.get('/:id', searchUsers);
router.post('/', addUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);


export default router;
