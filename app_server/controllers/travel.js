const tripsEndpoint = 'http://localhost:3000/api/trips';

const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json'
  }
};

// Renders the Travel page with trip data and any status message.
const renderTravelPage = (
  res,
  trips,
  message = null,
  status = 200
) => {
  return res
    .status(status)
    .render('travel', {
      title: 'Travlr Getaways',
      trips,
      activeTravel: true,
      message
    });
};

/* GET Travel page */
const travel = async (req, res) => {
  try {
    const response = await fetch(tripsEndpoint, options);

    if (!response.ok) {
      throw new Error(
        `API request failed with status ${response.status}`
      );
    }

    const trips = await response.json();

    if (!Array.isArray(trips)) {
      return renderTravelPage(
        res,
        [],
        'API lookup error',
        500
      );
    }

    if (trips.length === 0) {
      return renderTravelPage(
        res,
        [],
        'No trips were found in the database.'
      );
    }

    return renderTravelPage(res, trips);
  } catch (err) {
    console.error('Travel API error:', err.message);

    return renderTravelPage(
      res,
      [],
      'Unable to retrieve trips from the API.',
      500
    );
  }
};

module.exports = {
  travel
};