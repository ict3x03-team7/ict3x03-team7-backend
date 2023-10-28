const generateBuffer = require('./../utils/generateBuffer');
const { convertUUIDToBuffer } = require('./../utils/generateUUID');
const IFileRepo = require('./iFileRepo');
const FileMap = require('./../mapper/fileMap');

class PrismaFileRepo extends IFileRepo {
  constructor(prisma) {
    super();
    this.prisma = prisma;
  }

  async getFileById(fileID) {
    try {
      const fileResult = await this.prisma.file.findUnique({
        where: {
          FileID: generateBuffer(fileID),
        },
      });
    } catch (err) {
      console.error(err);
      throw new Error('Server Error');
    }
  }
  async addFile(fileToAdd) {
    const data = {
      FileID: generateBuffer(fileToAdd.getID()),
      OriginalFileName: fileToAdd.getOriginalFileName(),
      FileSize: fileToAdd.getFileSize(),
    };

    try {
      const addedFile = await this.prisma.file.create({
        data,
      });
      return fileToAdd;
    } catch (err) {
      console.error(err);
      throw new Error('Server Error');
    }
  }
  async deleteFile(file) {
    try {
      const deletedFileResult = await this.prisma.file.deleteFile({
        where: {
          FileID: generateBuffer(file.getID()),
        },
      });
      return file;
    } catch (err) {
      console.error(err);
      throw new Error('Server Error');
    }
  }
}

module.exports = PrismaFileRepo;
