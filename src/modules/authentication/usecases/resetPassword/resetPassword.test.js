const AuthUserMap = require('../../mapper/authUserMap');
const mockAuthUser = require('../../testing/mockAuthUser.js');
const MockAuthUserRepo = require('../../testing/mockAuthUserRepo.js');
const ResetPassword = require('./resetPassword');
const ResetPasswordController = require('./resetPasswordController');
const MockHashingService = require('./../../../../shared/services/mockHashingService');

describe('Verify Email Use Case', () => {
  const mockAuthUserRepo = new MockAuthUserRepo([mockAuthUser]);
  const mockHashingService = new MockHashingService();
  const resetPassword = new ResetPassword(mockAuthUserRepo, mockHashingService);
  const resetPasswordController = new ResetPasswordController(resetPassword);
  const mockSuccessResult = AuthUserMap.toResetPasswordResponseDTO(true);
  const mockFailureResult = AuthUserMap.toResetPasswordResponseDTO(false);
  const mockAuthEmail = mockAuthUser.getEmail();

  test('given a valid email and new password should return True', async () => {
    const req = { body: { email: mockAuthEmail, newPassword: 'passpass123' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await resetPasswordController.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ result: mockSuccessResult });
  });

  test('given an invalid Email and password should return False', async () => {
    const req = { body: { email: 'test@gmail.com', newPassword: 'passpass123' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await resetPasswordController.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ result: { Error: 'Invalid Credentials' } });
  });
});
