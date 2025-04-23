import prisma from './prisma.js';

const Transaction = {
  senderWallet: async (transactionId) => {
    const txn = await prisma.transaction.findUnique({
      where: { id: parseInt(transactionId) },
      include: { senderWallet: true }
    });
    return txn?.senderWallet;
  },
  
  receiverWallet: async (transactionId) => {
    const txn = await prisma.transaction.findUnique({
      where: { id: parseInt(transactionId) },
      include: { receiverWallet: true }
    });
    return txn?.receiverWallet;
  },
  
  currency: async (transactionId) => {
    const txn = await prisma.transaction.findUnique({
      where: { id: parseInt(transactionId) },
      include: { currency: true }
    });
    return txn?.currency;
  },
  
  externalTransfer: async (transactionId) => {
    return prisma.externalTransfer.findUnique({
      where: { transactionId: parseInt(transactionId) }
    });
  }
};

export default Transaction;
