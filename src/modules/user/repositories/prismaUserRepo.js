const generateBuffer = require('../../../shared/utils/generateBuffer');
const { convertUUIDToBuffer } = require('./../../../shared/utils/generateUUID');
const UserMap = require('../mapper/userMap.js');
const IUserRepo = require('./iUserRepo');

class PrismaUserRepo extends IUserRepo {
  constructor(prisma) {
    super();
    this.prisma = prisma;
  }

  async getUserByID(userID) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          UserID: convertUUIDToBuffer(userID),
        },
        include: {
          file: true,
        },
      });
      let mappedUser;
      if (user) {
        mappedUser = UserMap.toDomain(user);
        return mappedUser;
      }
      return null;
    } catch (err) {
      console.error(err);
      throw new Error('Server Error');
    }
  }

  async addUser(
    userID,
    firstName,
    lastName,
    email,
    hashedPassword,
    role,
    gender,
    mobileNumber,
    studentID,
    profilePictureID,
  ) {
    const data = {
      UserID: convertUUIDToBuffer(userID),
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Role: role,
      Gender: gender,
      MobileNumber: mobileNumber,
      StudentID: studentID,
      ProfilePictureID: profilePictureID ? convertUUIDToBuffer(profilePictureID) : null,
      Password: hashedPassword,
    };

    try {
      const addedUser = await this.prisma.user.create({
        data,
      });
      return true;
    } catch (err) {
      console.error(err);
      throw new Error('Server Error');
    }
  }
  async updatePassword(userID, newHashedPassword) {
    try {
      const user = await this.prisma.user.update({
        where: {
          UserID: convertUUIDToBuffer(userID),
        },
        include: {
          file: true,
        },
        data: {
          Password: newHashedPassword,
        },
      });
      let mappedUser;
      if (user) {
        mappedUser = UserMap.toDomain(user);
        return mappedUser;
      }
      return null;
    } catch (err) {
      console.error(err);
      throw new Error('Server Error');
    }
  }
  async deleteUserByID(userID) {
    try {
      const result = await this.prisma.user.delete({
        where: {
          UserID: generateBuffer(userID),
        },
      });
      if (result) return true;
      return false;
    } catch (err) {
      console.error(err);
      throw new Error('Server Error');
    }
  }
  async getAllUsers() {
    try {
      const result = await this.prisma.user.findMany({
        where: {
          Role: 'Student',
        },
        include: {
          file: true,
        },
      });
      const mappedUsers = result.map((user) => {
        const mappedUser = UserMap.toDomain(user);
        return mappedUser;
      });
      if (result) return mappedUsers;
      return null;
    } catch (err) {
      console.error(err);
      throw new Error('Server Error');
    }
  }
  async unlockUser(userID) {
    try {
      const user = await this.prisma.user.update({
        where: {
          UserID: convertUUIDToBuffer(userID),
        },
        include: {
          file: true,
        },
        data: {
          Locked: false,
        },
      });
      let mappedUser;
      if (user) {
        mappedUser = UserMap.toDomain(user);
        return mappedUser;
      }
      return null;
    } catch (err) {
      console.error(err);
      throw new Error('Server Error');
    }
  }
  async updateMFA(userID, mfa_qr, mfa_secret) {
    try {
      const user = await this.prisma.user.update({
        where: {
          UserID: convertUUIDToBuffer(userID),
        },
        include: {
          file: true,
        },
        data: {
          MFA_QR: mfa_qr,
          MFA_Secret: mfa_secret,
        },
      });
      let mappedUser;
      if (user) {
        mappedUser = UserMap.toDomain(user);
        return mappedUser;
      }
      return null;
    } catch (err) {
      console.error(err);
      throw new Error('Server Error');
    }
  }
}

module.exports = PrismaUserRepo;
