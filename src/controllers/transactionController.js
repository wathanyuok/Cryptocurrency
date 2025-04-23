const Transaction = require('../models/Transaction');
const prisma = require('../models/prisma');

const transactionController = {
  getTransaction: async (req, res) => {
    try {
      const { id } = req.params;
      
      const transaction = await prisma.transaction.findUnique({
        where: { id: parseInt(id) },
        include: {
          senderWallet: { include: { user: true } },
          receiverWallet: { include: { user: true } },
          currency: true,
          externalTransfer: true
        }
      });
      
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
      
      res.json({ transaction });
    } catch (error) {
      res.status(500).json({
        message: 'Error retrieving transaction',
        error: error.message
      });
    }
  }
};

module.exports = transactionController;
