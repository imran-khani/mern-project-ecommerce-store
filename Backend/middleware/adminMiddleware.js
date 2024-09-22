import jwt from 'jsonwebtoken'; // Use default import for CommonJS module
import User from '../models/User.js'; // Correctly import User model

const { verify } = jwt; // Destructure the `verify` method from the jwt object

const adminMiddleware = async (req, res, next) => {
  try {
    // Check if the authorization header is present
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'No authorization token provided' });
    }

    // Extract token from the authorization header
    const token = req.headers.authorization.split(' ')[1];
    
    // Verify the token and extract the decoded payload
    const decoded = verify(token, process.env.JWT_SECRET);
    
    // Use the User model to find the user by ID
    const user = await User.findById(decoded.id);

    // Check if the user exists and is an admin
    if (user && user.isAdmin) {
      req.user = user; // Attach the user object to the request
      next(); // Proceed to the next middleware or route handler
    } else {
      res.status(401).json({ message: 'Not authorized as an admin' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export default adminMiddleware; // Ensure to use ES module export
