const AuthUserMap = require('../../mapper/authUserMap');
const mockAuthUser = require('../../testing/mockAuthUser.js');
const mockAuthUserMFAEnabled = require('../..//testing/mockAuthUserMFAEnabled.js');
const MockAuthUserRepo = require('../../testing/mockAuthUserRepo.js');
const MFAEnable = require('./mfaEnable');
const MFAEnableController = require('./mfaEnableController');
const MockSessionService = require('../../testing/mockSessionService');
const MockMFAAuthenticator = require('../../testing/mockMFAAuthenticator');

describe('MFA Enable Use Case', () => {
  const mockAuthUserRepo = new MockAuthUserRepo([mockAuthUser]);
  const mockSessionService = new MockSessionService();
  const mockMFAAuthenticator = new MockMFAAuthenticator();
  const mfaEnable = new MFAEnable(mockAuthUserRepo, mockMFAAuthenticator);
  const mfaEnableController = new MFAEnableController(mfaEnable, mockSessionService);
  const mockSuccessResult = AuthUserMap.toMFAEnableResponseDTO(true);
  const mockFailureResult = AuthUserMap.toMFAEnableResponseDTO(false);
  const mockAuthEmail = mockAuthUser.getEmail();
  const validTOTP = '000111';
  const invalidTOTP = '111000';

  test('given that User does not have MFA enabled, should return Success = True', async () => {
    const req = { session: { userID: mockAuthUser.getID() } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await mfaEnableController.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ result: mockSuccessResult });
  });

  test('given that User does have MFA enabled, should return Success = False', async () => {
    const req = { session: { userID: mockAuthUser.getID() } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    const mockAuthUserRepo = new MockAuthUserRepo([mockAuthUserMFAEnabled]);
    const mockSessionService = new MockSessionService();
    const mockMFAAuthenticator = new MockMFAAuthenticator();
    const mfaEnable = new MFAEnable(mockAuthUserRepo, mockMFAAuthenticator);
    const mfaEnableController = new MFAEnableController(mfaEnable, mockSessionService);

    await mfaEnableController.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ result: { Error: 'User already has enabled MFA' } });
  });
});
