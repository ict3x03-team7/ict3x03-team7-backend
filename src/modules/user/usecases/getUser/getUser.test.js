const UserMap = require('../../mapper/userMap.js');
const mockUser = require('./../../testing/mockUser.js');
const MockUserRepo = require('./../../testing/mockUserRepo.js');
const GetUser = require('./getUser.js');
const GetUserController = require('./getUserController.js');
const { generateUUID } = require('./../../../../shared/utils/generateUUID.js');
const MockFileService = require('./../../../../shared/testing/mockFileService.js');

describe('GetUser Use Case', () => {
  const mockUserRepo = new MockUserRepo([mockUser]);
  const mockFileService = new MockFileService();
  const getUser = new GetUser(mockUserRepo, mockFileService);
  const getUserController = new GetUserController(getUser);
  const mockUserResult = UserMap.toGetUserResponseDTO(mockUser);
  const mockUserID = mockUser.getID();

  test('given a valid user ID, should respond with a 200 status code and GetUserResponseDTO', async () => {
    const req = { params: { userID: mockUserID } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await getUserController.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ result: mockUserResult });
  });

  test('given an invalid user UUID, should respond with a 400 status code and Error Message', async () => {
    const req = { params: { userID: 'aaaaa' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await getUserController.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      result: {
        Error: 'Invalid User ID',
      },
    });
  });

  test('given an valid user UUID that does not exists, should respond with a 400 status code and Error Message', async () => {
    const req = { params: { userID: generateUUID() } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await getUserController.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      result: {
        Error: 'User Not Found',
      },
    });
  });
});
