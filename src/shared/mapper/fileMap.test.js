const FileMap = require('./fileMap');
const mockFilePersistance = require('./../testing/mockFilePersistance');
const mockFile = require('./../testing/mockFile.js');

describe('Mapping File Persistance to Domain', () => {
  test('given a File Persistance, should receive a Domain File', async () => {
    const domainFile = FileMap.toDomain(mockFilePersistance);
    expect(domainFile).toStrictEqual(mockFile);
  });
});
