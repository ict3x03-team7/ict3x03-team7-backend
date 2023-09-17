const File = require('../../shared/entities/file');
const { convertUUIDFromBuffer } = require('../utils/generateUUID');
class FileMap {
  constructor() {}

  static toDomain(filePersistance) {
    const domainUUID = convertUUIDFromBuffer(filePersistance.FileID);
    const mapped = new File(domainUUID, filePersistance.OriginalFileName, filePersistance.FileSize);
    if (mapped) {
      return mapped;
    } else {
      throw new Error('File Mapping Failed');
    }
  }
}

module.exports = FileMap;
