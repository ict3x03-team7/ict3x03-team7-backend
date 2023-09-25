const AuthUserMap = require('../../mapper/authUserMap');
const mockAuthUser = require('./../../testing/mockAuthUser.js');
const MockAuthUserRepo = require('./../../testing/mockAuthUserRepo.js');
const MFALogin = require('./mfaLogin');
const MFALoginController = require('./mfaLoginController');
const MockSessionService = require('../../testing/mockSessionService');
const MockMFAAuthenticator = require('./../../testing/mockMFAAuthenticator');

describe('MFA Login Use Case', () => {
  const mockAuthUserRepo = new MockAuthUserRepo([mockAuthUser]);
  const mockSessionService = new MockSessionService();
  const mockMFAAuthenticator = new MockMFAAuthenticator();
  const mfaLogin = new MFALogin(mockAuthUserRepo, mockMFAAuthenticator);
  const mfaLoginController = new MFALoginController(mfaLogin, mockSessionService);
  const mockSuccessResult = AuthUserMap.toMFALoginResponseDTO(true);
  const mockFailureResult = AuthUserMap.toMFALoginResponseDTO(false);
  const mockAuthEmail = mockAuthUser.getEmail();
  const validTOTP = '000111';
  const invalidTOTP = '111000';

  test('given a valid OTP, should return True', async () => {
    const req = { body: { totp: validTOTP }, session: { userID: mockAuthUser.getID() } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await mfaLoginController.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ result: mockSuccessResult });
  });

  test('given an invalid OTP, should return False', async () => {
    const req = { body: { totp: invalidTOTP }, session: { userID: mockAuthUser.getID() } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await mfaLoginController.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ result: mockFailureResult });
  });
});
