/**
 * File: tripValidation.js
 * Author: Michael Rodman
 * Date: September 20, 2026
 * Course: CS 499 Computer Science Capstone
 *
 * Purpose:
 * Provide reusable server-side validation for Travlr trip data before
 * requests reach the database layer. This helps prevent incomplete or
 * malformed data from being processed by the API.
 */

// Fields that must contain non-empty string values.
const requiredStringFields = [
  'code',
  'name',
  'length',
  'resort',
  'perPerson',
  'image'
];

/**
 * Determines whether a value is a non-empty string.
 *
 * @param {*} value - Value to validate.
 * @returns {boolean} True when the value is a non-empty string.
 */
const isNonEmptyString = (value) => {
  return typeof value === 'string' && value.trim().length > 0;
};

/**
 * Validates trip data received by the API.
 *
 * @param {Object} tripData - Request body containing trip information.
 * @returns {{ isValid: boolean, errors: string[] }}
 */
const validateTrip = (tripData) => {
  const errors = [];

  if (!tripData || typeof tripData !== 'object') {
    return {
      isValid: false,
      errors: ['Trip data is required']
    };
  }

  // Validate required string fields.
  requiredStringFields.forEach((field) => {
    if (!isNonEmptyString(tripData[field])) {
      errors.push(`${field} is required`);
    }
  });

  // Validate the required start date.
  if (!tripData.start) {
    errors.push('start is required');
  } else {
    const startDate = new Date(tripData.start);

    if (Number.isNaN(startDate.getTime())) {
      errors.push('start must be a valid date');
    }
  }

  // Description is optional, but must be a string when supplied.
  if (
    tripData.description !== undefined &&
    tripData.description !== null &&
    typeof tripData.description !== 'string'
  ) {
    errors.push('description must be a string');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = {
  validateTrip
};