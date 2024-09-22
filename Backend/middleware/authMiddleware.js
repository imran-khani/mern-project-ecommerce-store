import jwt from 'jsonwebtoken'; // Assuming you are using JWT for authentication

// Middleware to check if the user is authenticated
const authMiddleware = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers['authorization'];

  // Check if the token is not provided
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the user information to the request object
    req.user = decoded;
    // Continue to the next middleware or route handler
    next();
  } catch (ex) {
    // If the token is invalid
    res.status(400).json({ message: 'Invalid token.' });
  }
};

export default authMiddleware;
