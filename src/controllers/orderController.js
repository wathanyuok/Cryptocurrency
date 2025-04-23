import prisma from '../models/prisma.js';

const orderController = {
  createOrder: async (req, res) => {
    try {
      const { userId, currencyPair, orderType, price, quantity } = req.body;
      
      const order = await prisma.order.create({
        data: {
          userId: parseInt(userId),
          currencyPair,
          orderType,
          price: parseFloat(price),
          quantity: parseFloat(quantity),
          status: 'open'
        }
      });
      
      res.status(201).json({ order });
    } catch (error) {
      res.status(500).json({
        message: 'Error creating order',
        error: error.message
      });
    }
  },

  getOrderDetails: async (req, res) => {
    try {
      const { id } = req.params;
      
      const order = await prisma.order.findUnique({
        where: { id: parseInt(id) },
        include: {
          user: true,
          buyTrades: true,
          sellTrades: true
        }
      });
      
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      res.json({ order });
    } catch (error) {
      res.status(500).json({
        message: 'Error retrieving order details',
        error: error.message
      });
    }
  }
};

export default orderController;
