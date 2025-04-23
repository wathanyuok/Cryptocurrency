import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.post('/register', userController.register);
router.get('/:id', userController.getProfile);

export default router;
