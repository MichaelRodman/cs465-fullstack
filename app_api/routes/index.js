const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const tripsController = require('../controllers/trips');
const authenticationController = require('../controllers/authentication');

// Authenticate a JSON Web Token
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: 'Authorization header required' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer' || !parts[1]) {
    return res
      .status(401)
      .json({ message: 'Invalid authorization header' });
  }

  try {
    const token = parts[1];
    req.auth = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: 'Token validation error' });
  }
}

// Register a new user
router
  .route('/register')
  .post(authenticationController.register);

// Log in an existing user
router
  .route('/login')
  .post(authenticationController.login);

// GET remains public; POST requires authentication
router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(authenticateJWT, tripsController.tripsAddTrip);

// GET remains public; PUT and DELETE require authentication
router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(authenticateJWT, tripsController.tripsUpdateTrip)
  .delete(authenticateJWT, tripsController.tripsDeleteTrip);

module.exports = router;