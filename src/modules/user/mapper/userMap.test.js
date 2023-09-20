const UserMap = require('./userMap');
const mockUserPersistance = require('./../testing/mockUserPersistance.js');
const mockUser = require('./../testing/mockUser.js');

describe('Mapping User Persistance to Domain', () => {
  test('given a User Persistance, should receive a Domain User', async () => {
    const domainUser = UserMap.toDomain(mockUserPersistance);
    expect(domainUser).toStrictEqual(mockUser);
  });
});
