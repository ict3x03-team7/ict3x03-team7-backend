const IFileService = require('../services/iFileService');

class MockFileService extends IFileService {
  constructor(mockFiles) {
    super();
    this.MockFiles = mockFiles;
  }

  async getFile(file) {
    return file;
  }

  async addFile(file, buffer) {
    return true;
  }
  async deleteFile(file) {
    return true;
  }
}

module.exports = MockFileService;
