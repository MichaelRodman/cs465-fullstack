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

// POST /api/trips
// Creates a new trip in MongoDB.
const tripsAddTrip = async (req, res) => {
  try {
    const newTrip = new Trip({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    });

    const savedTrip = await newTrip.save();

    return res
      .status(201)
      .json(savedTrip);
  } catch (err) {
    return res
      .status(500)
      .json({
        message: 'Unable to add trip',
        error: err.message
      });
  }
};

// PUT /api/trips/:tripCode
// Updates the trip that matches the supplied trip code.
const tripsUpdateTrip = async (req, res) => {
  try {
    const updatedTrip = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
      },
      {
        new: true,
        runValidators: true
      }
    ).exec();

    if (!updatedTrip) {
      return res
        .status(400)
        .json({
          message: `Trip with code ${req.params.tripCode} was not found`
        });
    }

    return res
      .status(201)
      .json(updatedTrip);
  } catch (err) {
    return res
      .status(500)
      .json({
        message: 'Unable to update trip',
        error: err.message
      });
  }
};

// DELETE /api/trips/:tripCode
// Deletes the trip that matches the supplied trip code.
const tripsDeleteTrip = async (req, res) => {
  try {
    const deletedTrip = await Trip.findOneAndDelete({
      code: req.params.tripCode
    }).exec();

    if (!deletedTrip) {
      return res
        .status(404)
        .json({
          message: `Trip with code ${req.params.tripCode} was not found`
        });
    }

    return res
      .status(204)
      .send();
  } catch (err) {
    return res
      .status(500)
      .json({
        message: 'Unable to delete trip',
        error: err.message
      });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip
};