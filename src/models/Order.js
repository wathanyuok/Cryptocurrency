const prisma = require('./prisma');

const Order = {
  user: (orderId) => {
    return prisma.order.findUnique({
      where: { id: parseInt(orderId) },
      include: { user: true }
    }).then(order => order.user);
  },
  
  trades: (orderId) => {
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

module.exports = Order;
