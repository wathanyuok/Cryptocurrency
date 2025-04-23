const prisma = require('./prisma');

const Wallet = {
  user: (walletId) => {
    return prisma.wallet.findUnique({
      where: { id: parseInt(walletId) },
      include: { user: true }
    }).then(wallet => wallet.user);
  },
  
  currencies: (walletId) => {
    return prisma.walletCurrency.findMany({
      where: { walletId: parseInt(walletId) },
      include: { currency: true }
    });
  },
  
  sentTransactions: (walletId) => {
    return prisma.transaction.findMany({
      where: { senderWalletId: parseInt(walletId) },
      include: { currency: true }
    });
  },
  
  receivedTransactions: (walletId) => {
    return prisma.transaction.findMany({
      where: { receiverWalletId: parseInt(walletId) },
      include: { currency: true }
    });
  }
};

module.exports = Wallet;
