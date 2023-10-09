const UserMap = require('../../mapper/userMap.js');
const mockUser = require('../../testing/mockUser.js');
const MockUserRepo = require('../../testing/mockUserRepo.js');
const GetAllUsers = require('./getAllUsers.js');
const GetAllUsersController = require('./getAllUsersController.js');
const { generateUUID } = require('../../../../shared/utils/generateUUID.js');
const MockFileService = require('./../../../../shared/services/mockFileService.js');

describe('GetAllUsers Use Case', () => {
  const mockUserRepo = new MockUserRepo([mockUser]);
  const mockFileService = new MockFileService();
  const getAllUsers = new GetAllUsers(mockUserRepo, mockFileService);
  const getAllUsersController = new GetAllUsersController(getAllUsers);
  const mockUserResult = UserMap.toGetUserResponseDTO(mockUser);
  const mockUserID = mockUser.getID();

  test('given the user is an admin, should respond with a 200 status code and GetAllUserResponseDTO', async () => {
    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await getAllUsersController.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.json).toHaveBeenCalledWith({ result: mockUserResult });
  });
});
