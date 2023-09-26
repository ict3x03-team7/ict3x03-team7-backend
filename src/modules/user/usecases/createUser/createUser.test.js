const UserMap = require('../../mapper/userMap.js');
const mockUser = require('./../../testing/mockUser.js');
const MockUserRepo = require('./../../testing/mockUserRepo.js');
const MockFileRepo = require('./../../../../shared/testing/mockFileRepo.js');
const CreateUser = require('./createUser.js');
const CreateUserController = require('.//createUserController.js');
const { generateUUID } = require('./../../../../shared/utils/generateUUID.js');
const { CreateUserRequestDTO } = require('./../../dto/createUserDTO.js');

describe('GetUser Use Case', () => {
  const mockUserRepo = new MockUserRepo([mockUser]);
  const mockFileRepo = new MockFileRepo();
  const createUser = new CreateUser(mockUserRepo, mockFileRepo);
  const createUserController = new CreateUserController(createUser);
  const InvalidUserIDmockCreateUserRequestDTO = new CreateUserRequestDTO(
    'aaaaaaa',
    'Any',
    'Thing',
    'anything@gmail.com',
    'password123',
    'Student',
    'Male',
    '91110012',
    '2100992',
    null,
    null,
    null,
    null,
  );
  const InvalidEmailIDmockCreateUserRequestDTO = new CreateUserRequestDTO(
    '5f0aac40-86e9-45c1-9617-43c43ad524e2',
    'Any',
    'Thing',
    'anything@',
    'password123',
    'Student',
    'Male',
    '91110012',
    '2100992',
    null,
    null,
    null,
    null,
  );

  test('given a invalid user ID, create user should fail', async () => {
    const req = { body: InvalidUserIDmockCreateUserRequestDTO };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await createUserController.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    // expect(res.json).toHaveBeenCalledWith({ result: mockUserResult });
  });

  test('given a invalid email, create user should fail', async () => {
    const req = { body: InvalidEmailIDmockCreateUserRequestDTO };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await createUserController.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    // expect(res.json).toHaveBeenCalledWith({ result: mockUserResult });
  });
});
