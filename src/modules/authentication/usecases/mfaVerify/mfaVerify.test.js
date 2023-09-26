const AuthUserMap = require('../../mapper/authUserMap');
const mockAuthUser = require('../../testing/mockAuthUser.js');
const MockAuthUserRepo = require('../../testing/mockAuthUserRepo.js');
const MFAVerify = require('./mfaVerify');
const MFAVerifyController = require('./mfaVerifyController');
const MockSessionService = require('../../testing/mockSessionService');
const MockMFAAuthenticator = require('../../testing/mockMFAAuthenticator');

describe('MFA Login Use Case', () => {
  const mockAuthUserRepo = new MockAuthUserRepo([mockAuthUser]);
  const mockSessionService = new MockSessionService();
  const mockMFAAuthenticator = new MockMFAAuthenticator();
  const mfaVerify = new MFAVerify(mockAuthUserRepo, mockMFAAuthenticator);
  const mfaVerifyController = new MFAVerifyController(mfaVerify, mockSessionService);
  const mockSuccessResult = AuthUserMap.toMFAVerifyResponseDTO(true);
  const mockFailureResult = AuthUserMap.toMFAVerifyResponseDTO(false);
  const mockAuthEmail = mockAuthUser.getEmail();
  const validTOTP = '000111';
  const invalidTOTP = '111000';

  test('given a valid OTP, should return True', async () => {
    const req = { body: { totp: validTOTP }, session: { userID: mockAuthUser.getID() } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await mfaVerifyController.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ result: mockSuccessResult });
  });

  test('given an invalid OTP, should return False', async () => {
    const req = { body: { totp: invalidTOTP }, session: { userID: mockAuthUser.getID() } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await mfaVerifyController.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ result: mockFailureResult });
  });
});
