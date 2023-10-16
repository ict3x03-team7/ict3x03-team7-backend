const AuthUserMap = require('../../mapper/authUserMap');
const mockAuthUser = require('../../testing/mockAuthUser.js');
const MockAuthUserRepo = require('../../testing/mockAuthUserRepo.js');
const VerifyEmail = require('./verifyEmail');
const VerifyEmailController = require('./verifyEmailController');

describe('Verify Email Use Case', () => {
  const mockAuthUserRepo = new MockAuthUserRepo([mockAuthUser]);
  const verifyEmail = new VerifyEmail(mockAuthUserRepo);
  const verifyEmailController = new VerifyEmailController(verifyEmail);
  const mockTrueFalseResult = AuthUserMap.toVerifyEmailResponseDTO(true, false);
  const mockFalseFalseResult = AuthUserMap.toVerifyEmailResponseDTO(false, false);
  const mockAuthEmail = mockAuthUser.getEmail();

  test('given a valid email and user does not have MFA enabled, should return True and False', async () => {
    const req = { params: { email: mockAuthEmail } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await verifyEmailController.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ result: mockTrueFalseResult });
  });

  test('given an invalid Email, should return Error: Invalid Credentials', async () => {
    const req = { params: { email: 'test@gmail.com' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await verifyEmailController.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ result: { Error: 'Invalid Credentials' } });
  });
});
