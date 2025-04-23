import prisma from '../models/prisma.js';

const transactionController = {
  getTransaction: async (req, res) => {
    try {
      const { id } = req.params;
      
      const transaction = await prisma.transaction.findUnique({
        where: { id: parseInt(id) },
        include: {
          senderWallet: { 
            include: { 
              user: true 
            } 
          },
          receiverWallet: { 
            include: { 
              user: true 
            } 
          },
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

export default transactionController;
