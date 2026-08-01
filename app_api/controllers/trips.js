const mongoose = require('mongoose');
require('../models/travlr');

const Trip = mongoose.model('trips');

// GET /api/trips
// Returns every trip stored in MongoDB.
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).exec();

    return res
      .status(200)
      .json(trips);
  } catch (err) {
    return res
      .status(500)
      .json({
        message: 'Unable to retrieve trips',
        error: err.message
      });
  }
};

// GET /api/trips/:tripCode
// Returns the trip that matches the supplied trip code.
const tripsFindByCode = async (req, res) => {
  try {
    const trips = await Trip
      .find({ code: req.params.tripCode })
      .exec();

    if (trips.length === 0) {
      return res
        .status(404)
        .json({
          message: `Trip with code ${req.params.tripCode} was not found`
        });
    }

    return res
      .status(200)
      .json(trips);
  } catch (err) {
    return res
      .status(500)
      .json({
        message: 'Unable to retrieve the requested trip',
        error: err.message
      });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode
};