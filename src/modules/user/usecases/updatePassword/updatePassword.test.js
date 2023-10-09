const UserMap = require('../../mapper/userMap.js');
const mockUser = require('./../../testing/mockUser.js');
const MockUserRepo = require('./../../testing/mockUserRepo.js');
const UpdatePassword = require('./updatePassword.js');
const UpdatePasswordController = require('./updatePasswordController.js');
const { generateUUID } = require('./../../../../shared/utils/generateUUID.js');
const MockFileService = require('./../../../../shared/services/mockFileService.js');
const MockHashingService = require('./../../../../shared/services/mockHashingService.js');

describe('GetUser Use Case', () => {
  const mockUserRepo = new MockUserRepo([mockUser]);
  const mockHashingService = new MockHashingService();
  const updatePassword = new UpdatePassword(mockUserRepo, mockHashingService);
  const updatePasswordController = new UpdatePasswordController(updatePassword);
  const mockValidResult = UserMap.toUpdatePasswordResponseDTO(true);
  const mockUserID = mockUser.getID();

  test('given a valid user ID, should respond with a 200 status code and GetUserResponseDTO', async () => {
    const req = { params: { userID: mockUserID }, body: { newPassword: 'passwordPassword' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await updatePasswordController.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ result: mockValidResult });
  });

  test('given an invalid user UUID, should respond with a 400 status code and Error Message', async () => {
    const req = { params: { userID: 'aaaaa' }, body: { newPassword: 'passwordPassword' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await updatePasswordController.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      result: {
        Error: 'Invalid User ID',
      },
    });
  });

  test('given an valid user UUID that does not exists, should respond with a 400 status code and Error Message', async () => {
    const req = { params: { userID: generateUUID() }, body: { newPassword: 'passwordPassword' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await updatePasswordController.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      result: {
        Error: 'User Not Found',
      },
    });
  });
});
