import express from 'express';
import transactionController from '../controllers/transactionController.js';

const router = express.Router();

router.get('/:id', transactionController.getTransaction);

export default router;
