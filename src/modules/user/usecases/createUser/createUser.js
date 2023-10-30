const isValidUUIDv4 = require('../../../../shared/utils/validateUUID');
const isValidEmail = require('./../../../../shared/utils/validateEmail');
const {
  generateUUID,
  convertUUIDToBuffer,
  convertUUIDFromBuffer,
} = require('./../../../../shared/utils/generateUUID');
const UserMap = require('./../../mapper/userMap');
const File = require('./../../../../shared/entities/file');

class CreateUser {
  constructor(userRepo, fileRepo, fileService, hashingService, mfaAuthenticator) {
    this.UserRepo = userRepo;
    this.FileRepo = fileRepo;
    this.FileService = fileService;
    this.HashingService = hashingService;
    this.MFAAuthenticator = mfaAuthenticator;
  }

  async execute(input) {
    if (!isValidUUIDv4(input.userID)) {
      return { Error: 'Invalid User ID' };
    }
    if (!isValidEmail(input.email)) {
      return { Error: 'Invalid Email' };
    }
    const hashedPassword = await this.HashingService.hashing(input.password);
    let fileResult;
    let userResult;
    let profilePictureID = null;
    try {
      if (input.fileBase64 && input.metadata) {
        //handle fileRepo, fileService executions
        const newFileID = generateUUID();
        const fileToAdd = new File(newFileID, input.metadata.fileName, input.metadata.fileSize);
        fileResult = await this.FileRepo.addFile(fileToAdd);
        profilePictureID = fileToAdd.getID();
        if (fileResult) {
          const dataPart = input.fileBase64.split(';base64,').pop();
          const buffer = Buffer.from(dataPart, 'base64');
          this.FileService.addFile(fileToAdd, buffer);
        }
      }
      userResult = await this.UserRepo.addUser(
        input.userID,
        input.firstName,
        input.lastName,
        input.email,
        hashedPassword,
        input.role,
        input.gender,
        parseInt(input.mobileNumber),
        input.studentID,
        profilePictureID,
      );
      let isUserCreated;
      let enableMFAResult;
      let generatedMFAQR;
      if (userResult) {
        const userName = userResult.firstName + ' ' + userResult.lastName;
        const { mfa_secret, mfa_qr } = await this.MFAAuthenticator.enable(userName);
        generatedMFAQR = mfa_qr;
        enableMFAResult = await this.UserRepo.updateMFA(input.userID, mfa_qr, mfa_secret);
        isUserCreated = true;
      } else {
        isUserCreated = false;
      }
      //create user in db
      const responseDTO = UserMap.toCreateUserResponseDTO(isUserCreated, generatedMFAQR);
      return responseDTO;
    } catch (err) {
      console.error(err);
      throw new Error('Server/Database is down');
    }
  }
}

module.exports = CreateUser;
