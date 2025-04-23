const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/:id', transactionController.getTransaction);

module.exports = router;
