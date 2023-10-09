const { convertUUIDToBuffer } = require('./../../../shared/utils/generateUUID');
const authUserMap = require('../mapper/authUserMap');
const IAuthRepo = require('./iAuthRepo');
const AuthUserMap = require('../mapper/authUserMap');

class PrismaAuthRepo extends IAuthRepo {
  constructor(prisma) {
    super();
    this.prisma = prisma;
  }

  async getUserByID(userID) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          UserID: convertUUIDToBuffer(userID),
        },
        include: {
          file: true,
        },
      });
      let mappedUser;
      if (user) {
        mappedUser = authUserMap.toDomain(user);
        return mappedUser;
      }
      return null;
    } catch (err) {
      console.error(err);
      throw new Error('Server Error');
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          Email: email,
        },
        include: {
          file: true,
        },
      });
      let mappedUser;
      if (user) {
        mappedUser = authUserMap.toDomain(user);
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
        mappedUser = authUserMap.toDomain(user);
        return mappedUser;
      }
      return null;
    } catch (err) {
      console.error(err);
      throw new Error('Server Error');
    }
  }
  async updateLastLogin(userID, lastLogin) {
    try {
      const user = await this.prisma.user.update({
        where: {
          UserID: convertUUIDToBuffer(userID),
        },
        include: {
          file: true,
        },
        data: {
          LastLogin: lastLogin,
        },
      });
      let mappedUser;
      if (user) {
        mappedUser = AuthUserMap.toDomain(user);
        return mappedUser;
      }
      return null;
    } catch (err) {
      console.error(err);
      throw new Error('Server Error');
    }
  }
}

module.exports = PrismaAuthRepo;
