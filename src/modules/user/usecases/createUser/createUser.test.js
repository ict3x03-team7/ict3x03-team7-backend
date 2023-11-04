const UserMap = require('../../mapper/userMap.js');
const mockUser = require('./../../testing/mockUser.js');
const MockUserRepo = require('./../../testing/mockUserRepo.js');
const MockFileRepo = require('./../../../../shared/testing/mockFileRepo.js');
const CreateUser = require('./createUser.js');
const CreateUserController = require('.//createUserController.js');
const { generateUUID } = require('./../../../../shared/utils/generateUUID.js');
const { CreateUserRequestDTO } = require('./../../dto/createUserDTO.js');
const MockHashingService = require('./../../../../shared/testing/mockHashingService.js');
const MockFileService = require('./../../../../shared/testing/mockFileService.js');
const mockFile = require('./../../../../shared/testing/mockFile.js');
const MockMFAAuthenticator = require('../../../../shared/testing/mockMFAAuthenticator');

describe('GetUser Use Case', () => {
  const mockUserRepo = new MockUserRepo([mockUser]);
  const mockFileRepo = new MockFileRepo();
  const mockHashingService = new MockHashingService();
  const mockFileService = new MockFileService([mockFile]);
  const mockMFAAuthenticator = new MockMFAAuthenticator();
  const createUser = new CreateUser(
    mockUserRepo,
    mockFileRepo,
    mockFileService,
    mockHashingService,
    mockMFAAuthenticator,
  );
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

  const ValidMockCreateUserRequestDTO = new CreateUserRequestDTO(
    '5f0aac40-86e9-45c1-9617-43c43ad524e2',
    'Any',
    'Thing',
    'anything@gmail.com',
    'password123',
    'Student',
    'Male',
    '91110012',
    '2100992',
    'asfwgfhf345ttgrdfqqwqewgrefds',
    'profilepicture',
    1212,
    '.jpg',
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
  test('given a valid email and user id, create user should pass', async () => {
    const req = { body: ValidMockCreateUserRequestDTO };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await createUserController.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.json).toHaveBeenCalledWith({ result: mockUserResult });
  });
});
