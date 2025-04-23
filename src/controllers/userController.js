import prisma from '../models/prisma.js';

const userController = {
  register: async (req, res) => {
    try {
      const { username, email, password, phone } = req.body;
      
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password, 
          phone,
          status: 'pending'
        }
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
      
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
        include: {
          wallets: {
            include: {
              walletCurrencies: {
                include: {
                  currency: true
                }
              }
            }
          }
        }
      });
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json({ user });
    } catch (error) {
      res.status(500).json({
        message: 'Error retrieving user profile',
        error: error.message
      });
    }
  }
};

export default userController;
