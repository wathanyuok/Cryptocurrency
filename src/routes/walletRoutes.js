const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');

router.post('/:id/deposit', walletController.deposit);

router.post('/:id/transfer', walletController.transfer);

router.post('/:id/withdraw', walletController.withdraw);

module.exports = router;
