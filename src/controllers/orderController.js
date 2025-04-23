const Order = require('../models/Order');
const prisma = require('../models/prisma');

const orderController = {
  createOrder: async (req, res) => {
    try {
      const { userId, currencyPair, orderType, price, quantity } = req.body;
      
      const order = await prisma.order.create({
        data: {
          userId,
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
  
  // Get order details with trades
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

module.exports = orderController;
