import prisma from './prisma.js';

const User = {
  create: (data) => {
    return prisma.user.create({ data });
  },
  
  findById: (id) => {
    return prisma.user.findUnique({
      where: { id: parseInt(id) }
    });
  },
  
  wallets: (userId) => {
    return prisma.wallet.findMany({
      where: { userId: parseInt(userId) }
    });
  },
  
  orders: (userId) => {
    return prisma.order.findMany({
      where: { userId: parseInt(userId) }
    });
  }
};

export default User;
