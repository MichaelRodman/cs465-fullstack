const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

// GET and POST /api/trips
router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(tripsController.tripsAddTrip);

// GET, PUT, and DELETE /api/trips/:tripCode
router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(tripsController.tripsUpdateTrip)
  .delete(tripsController.tripsDeleteTrip);

module.exports = router;