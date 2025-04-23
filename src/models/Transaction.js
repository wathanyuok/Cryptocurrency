const prisma = require('./prisma');

const Transaction = {
  senderWallet: (transactionId) => {
    return prisma.transaction.findUnique({
      where: { id: parseInt(transactionId) },
      include: { senderWallet: true }
    }).then(txn => txn.senderWallet);
  },
  
  receiverWallet: (transactionId) => {
    return prisma.transaction.findUnique({
      where: { id: parseInt(transactionId) },
      include: { receiverWallet: true }
    }).then(txn => txn.receiverWallet);
  },
  
  currency: (transactionId) => {
    return prisma.transaction.findUnique({
      where: { id: parseInt(transactionId) },
      include: { currency: true }
    }).then(txn => txn.currency);
  },
  
  externalTransfer: (transactionId) => {
    return prisma.externalTransfer.findUnique({
      where: { transactionId: parseInt(transactionId) }
    });
  }
};

module.exports = Transaction;
