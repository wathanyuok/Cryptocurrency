const User = require('../models/User');
const Wallet = require('../models/Wallet');
const prisma = require('../models/prisma');

const userController = {
  register: async (req, res) => {
    try {
      const { username, email, password, phone } = req.body;
      
      const user = await User.create({
        username,
        email,
        password, 
        phone,
        status: 'pending'
      });
      
      const wallet = await prisma.wallet.create({
        data: { userId: user.id }
      });
      
      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error registering user',
        error: error.message
      });
    }
  },
  
  getProfile: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      const wallets = await User.wallets(id);
      
      res.json({ user, wallets });
    } catch (error) {
      res.status(500).json({
        message: 'Error retrieving user profile',
        error: error.message
      });
    }
  }
};

module.exports = userController;
