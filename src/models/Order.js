import prisma from './prisma.js';

const Order = {
  user: async (orderId) => {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(orderId) },
      include: { user: true }
    });
    return order?.user;
  },
  
  trades: async (orderId) => {
    return prisma.trade.findMany({
      where: {
        OR: [
          { buyOrderId: parseInt(orderId) },
          { sellOrderId: parseInt(orderId) }
        ]
      }
    });
  }
};

export default Order;
