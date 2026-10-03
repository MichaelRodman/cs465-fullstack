/**
 * File: controllerBehavior.test.js
 * Author: Michael Rodman
 * Date: October 2, 2026
 * Course: CS 499 Computer Science Capstone
 *
 * Purpose:
 * Expand automated testing in response to instructor feedback by
 * verifying authentication and controller-level validation behavior.
 */

const test = require('node:test');
const assert = require('node:assert/strict');

const authentication = require('../app_api/controllers/authentication');
const trips = require('../app_api/controllers/trips');

const createMockResponse = () => {
  return {
    statusCode: null,
    body: null,

    status(code) {
      this.statusCode = code;
      return this;
    },

    json(data) {
      this.body = data;
      return this;
    },

    send(data) {
      this.body = data;
      return this;
    }
  };
};

test('register rejects missing required authentication fields', async () => {
  const req = {
    body: {
      name: 'Test User',
      email: ''
    }
  };

  const res = createMockResponse();

  await authentication.register(req, res);

  assert.equal(res.statusCode, 400);
  assert.deepEqual(res.body, {
    message: 'All fields required'
  });
});

test('login rejects missing required authentication fields', () => {
  const req = {
    body: {
      email: 'test@example.com'
    }
  };

  const res = createMockResponse();

  authentication.login(req, res);

  assert.equal(res.statusCode, 400);
  assert.deepEqual(res.body, {
    message: 'All fields required'
  });
});

test('trip controller rejects invalid trip data before database processing', async () => {
  const req = {
    body: {
      code: 'TEST001'
    }
  };

  const res = createMockResponse();

  await trips.tripsAddTrip(req, res);

  assert.equal(res.statusCode, 400);
  assert.equal(res.body.message, 'Invalid trip data');
  assert.ok(res.body.errors.includes('name is required'));
  assert.ok(res.body.errors.includes('length is required'));
  assert.ok(res.body.errors.includes('resort is required'));
});

test('trip controller rejects an invalid trip start date', async () => {
  const req = {
    body: {
      code: 'TEST002',
      name: 'Test Reef',
      length: '4 nights / 5 days',
      start: 'invalid-date',
      resort: 'Test Resort',
      perPerson: '$999.00',
      image: 'test.jpg',
      description: 'Test trip description'
    }
  };

  const res = createMockResponse();

  await trips.tripsAddTrip(req, res);

  assert.equal(res.statusCode, 400);
  assert.equal(res.body.message, 'Invalid trip data');
  assert.ok(res.body.errors.includes('start must be a valid date'));
});
