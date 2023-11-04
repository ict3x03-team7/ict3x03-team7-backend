const UserMap = require('../../mapper/userMap.js');
const mockUser = require('./../../testing/mockUser.js');
const MockUserRepo = require('./../../testing/mockUserRepo.js');
const MockFileRepo = require('./../../../../shared/testing/mockFileRepo.js');
const DeleteUser = require('./deleteUser.js');
const DeleteUserController = require('./deleteUserController.js');
const { generateUUID } = require('./../../../../shared/utils/generateUUID.js');
const { DeleteUserRequestDTO } = require('./../../dto/deleteUserDTO.js');
const MockFileService = require('./../../../../shared/testing/mockFileService.js');
const mockFile = require('./../../../../shared/testing/mockFile.js');

describe('GetUser Use Case', () => {
  const mockUserRepo = new MockUserRepo([mockUser]);
  const mockFileRepo = new MockFileRepo();
  const mockFileService = new MockFileService([mockFile]);
  const deleteUser = new DeleteUser(mockUserRepo, mockFileRepo, mockFileService);
  const deleteUserController = new DeleteUserController(deleteUser);
  //   const InvalidUserIDmockCreateUserRequestDTO = new DeleteUserRequestDTO('aaaaaaa');
  //   const ValidUserIDmockDeleteUserRequestDTO = new DeleteUserRequestDTO(
  //     '5f0aac40-86e9-45c1-9617-43c43ad524e2',
  //   );

  test('given a invalid user ID, delete user should fail', async () => {
    const req = { params: { userID: 'aaaa' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await deleteUserController.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    // expect(res.json).toHaveBeenCalledWith({ result: mockUserResult });
  });

  test('given a invalid email, delete user should fail', async () => {
    const req = { params: { userID: '5f0aac40-86e9-45c1-9617-43c43ad524e2' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await deleteUserController.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    // expect(res.json).toHaveBeenCalledWith({ result: mockUserResult });
  });
});
