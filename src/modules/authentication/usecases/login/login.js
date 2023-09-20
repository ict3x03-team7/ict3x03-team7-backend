const bcrypt = require('bcrypt');
const isValidEmail = require('./../../../../shared/utils/validateEmail');
const AuthUserMap = require('./../../mapper/authUserMap');
const { LoginResponseDTO } = require('./../../dto/loginDTO');

class Login {
  constructor(authUserRepo, fileService) {
    this.AuthUserRepo = authUserRepo;
    this.FileService = fileService;
  }

  async execute(input) {
    if (!isValidEmail(input.email)) {
      return { Error: 'Invalid Credentials' };
    }
    let userResult;
    let profilePictureLink;
    try {
      userResult = await this.AuthUserRepo.getUserByEmail(input.email);
      if (userResult == null) return { Error: 'Invalid Credentials' };
      const isPasswordCorrect = await bcrypt.compare(input.password, userResult.password);
      if (!isPasswordCorrect) {
        return { Error: 'Invalid Credentials' };
      }
      //   if (userResult.profilePicture) {
      //     profilePictureLink = await this.FileService.getFile(userResult.profilePicture);
      //   } else {
      //     profilePictureLink = null;
      //   }

      const responseDTO = AuthUserMap.toLoginResponseDTO(userResult);
      return responseDTO;
    } catch (err) {
      console.error(err);
      throw new Error('Server/Database is down');
    }
  }
}

module.exports = Login;
