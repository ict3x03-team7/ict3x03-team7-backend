const AuthUserMap = require('../../mapper/authUserMap');
const mockAuthUser = require('../../testing/mockAuthUser.js');
const MockAuthUserRepo = require('../../testing/mockAuthUserRepo.js');
const MFAVerify = require('./mfaVerify');
const MFAVerifyController = require('./mfaVerifyController');
const MockSessionService = require('../../testing/mockSessionService');
const MockMFAAuthenticator = require('../../../../shared/testing/mockMFAAuthenticator');

describe('MFA Verify Use Case', () => {
  const mockAuthUserRepo = new MockAuthUserRepo([mockAuthUser]);
  const mockSessionService = new MockSessionService();
  const mockMFAAuthenticator = new MockMFAAuthenticator();
  const mfaVerify = new MFAVerify(mockAuthUserRepo, mockMFAAuthenticator, mockSessionService);
  const mfaVerifyController = new MFAVerifyController(mfaVerify);
  const mockSuccessResult = AuthUserMap.toMFAVerifyResponseDTO(true);
  const mockFailureResult = AuthUserMap.toMFAVerifyResponseDTO(false);
  const mockAuthEmail = mockAuthUser.getEmail();
  const validTOTP = '000111';
  const invalidTOTP = '111000';

  test('given a valid OTP, should return True', async () => {
    const req = { body: { email: mockAuthEmail, totp: validTOTP } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await mfaVerifyController.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ result: mockSuccessResult });
  });

  test('given an invalid OTP, should return False', async () => {
    const req = { body: { email: mockAuthEmail, totp: invalidTOTP } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await mfaVerifyController.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ result: mockFailureResult });
  });
});
