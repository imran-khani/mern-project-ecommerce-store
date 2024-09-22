import express from 'express'; // Import express
import bcrypt from 'bcryptjs'; // Default import for bcryptjs
import jwt from 'jsonwebtoken'; // Default import for jsonwebtoken
import User from '../models/User.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const { sign } = jwt; // Destructure the `sign` method from jwt object
const { hashSync, compareSync } = bcrypt; // Destructure the bcrypt methods

const router = express.Router(); // Use express.Router() to create a new router object

// User Registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = hashSync(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// User Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = compareSync(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin-Only Route to Get All Users
router.get('/users', adminMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
