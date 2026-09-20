/**
 * File: tripValidation.test.js
 * Author: Michael Rodman
 * Date: September 20, 2026
 * Course: CS 499 Computer Science Capstone
 *
 * Purpose:
 * Verify the server-side trip validation introduced during the
 * CS 499 software design and engineering enhancement.
 */

const test = require('node:test');
const assert = require('node:assert/strict');

const { validateTrip } = require('../app_api/utils/tripValidation');

const validTrip = {
  code: 'TEST001',
  name: 'Test Reef',
  length: '4 nights / 5 days',
  start: '2026-10-15',
  resort: 'Test Resort',
  perPerson: '$999.00',
  image: 'test.jpg',
  description: 'Test trip description'
};

test('accepts a valid trip', () => {
  const result = validateTrip(validTrip);

  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, []);
});

test('rejects missing required fields', () => {
  const result = validateTrip({
    code: 'TEST001'
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.includes('name is required'));
  assert.ok(result.errors.includes('length is required'));
  assert.ok(result.errors.includes('resort is required'));
  assert.ok(result.errors.includes('perPerson is required'));
  assert.ok(result.errors.includes('image is required'));
  assert.ok(result.errors.includes('start is required'));
});

test('rejects blank required string fields', () => {
  const result = validateTrip({
    ...validTrip,
    name: '   '
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.includes('name is required'));
});

test('rejects an invalid start date', () => {
  const result = validateTrip({
    ...validTrip,
    start: 'not-a-date'
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.includes('start must be a valid date'));
});

test('allows description to be omitted', () => {
  const tripWithoutDescription = { ...validTrip };

  delete tripWithoutDescription.description;

  const result = validateTrip(tripWithoutDescription);

  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, []);
});

test('rejects a non-string description when provided', () => {
  const result = validateTrip({
    ...validTrip,
    description: 12345
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.includes('description must be a string'));
});