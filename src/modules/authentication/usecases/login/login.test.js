const AuthUserMap = require('../../mapper/authUserMap');
const mockAuthUser = require('./../../testing/mockAuthUser.js');
const MockAuthUserRepo = require('./../../testing/mockAuthUserRepo.js');
const Login = require('./login.js');
const LoginController = require('./loginController.js');
const { generateUUID } = require('./../../../../shared/utils/generateUUID.js');

describe('Login Use Case', () => {
  const mockAuthUserRepo = new MockAuthUserRepo([mockAuthUser]);
  const login = new Login(mockAuthUserRepo);
  const loginController = new LoginController(login);
  const mockAuthUserResult = AuthUserMap.toLoginResponseDTO(mockAuthUser);
  const mockAuthEmail = mockAuthUser.getEmail();
  const mockAuthPassword = 'Password123';

  test('given a valid email and password, should respond with a 200 status code and LoginResponseDTO', async () => {
    const req = { body: { email: mockAuthEmail, password: mockAuthPassword } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await loginController.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ result: mockAuthUserResult });
    // expect(res.json).toHaveBeenCalledWith({ result: 'Login successful!' });
  });

  test('given an invalid user email, should respond with a 400 status code and Error Message', async () => {
    const req = { body: { email: 'aaaaa' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await loginController.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      result: {
        Error: 'Invalid Credentials',
      },
    });
  });

  test('given an valid user email but invalid password, should respond with a 400 status code and Error Message', async () => {
    const req = { body: { email: mockAuthEmail, password: 'password123' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await loginController.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      result: {
        Error: 'Invalid Credentials',
      },
    });
  });
  test('given an valid email but does not belong to any user, should respond with a 400 status code and Error Message', async () => {
    const req = { body: { email: 'hello@gmail.com', password: 'password123' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await loginController.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      result: {
        Error: 'Invalid Credentials',
      },
    });
  });
});