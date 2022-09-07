/* eslint-disable no-undef */
const bcrypt = require('bcrypt');
// import jwt
const jwt = require('jsonwebtoken');

// Simple type checking validation.
// const PgMock2 = require('pgmock2').default;

// const client = new PgMock2();

// import db
const db = require('../db').getConnection();

// import API
const loginController = require('../controllers/login');

const mockRequest = (body = {}) => ({ body });

const mockResponse = () => {
  const res = {};
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res;
};

describe('login function', () => {
  test('400 if user not found', async () => {
    const req = mockRequest({
      username: 'binaro', // this username is not registered
    });
    const res = mockResponse();

    db.query = jest.fn().mockReturnValue({
      rowCount: 0,
      rows: [],
    });

    await loginController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'wrong username',
    });
  });

  test('400 if wrong password', async () => {
    const req = mockRequest({
      username: 'jason', // this username is registered
      password: 'abcd', // wrong password
    });
    const res = mockResponse();

    db.query = jest.fn().mockReturnValue({
      rowCount: 1,
      rows: [
        { username: 'jason', password: 'efgh' },
      ],
    });

    bcrypt.compare = jest.fn().mockReturnValue(false);

    await loginController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'wrong password',
    });
  });

  test('200 if login success', async () => {
    const req = mockRequest({
      username: 'jason', // this username is registered
      password: '123', // correct password
    });
    const res = mockResponse();

    db.query = jest.fn().mockReturnValue({
      rowCount: 1,
      rows: [
        {
          id: 1,
          username: 'jason',
          password: 'efgh',
          email: 'jason@binar.com',
        },
      ],
    });

    bcrypt.compare = jest.fn().mockReturnValue(true);
    jwt.sign = jest.fn().mockReturnValue('thisisrandomtoken');

    await loginController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'login success',
      token: 'thisisrandomtoken',
    });
  });
});
