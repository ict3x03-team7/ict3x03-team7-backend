const UserMap = require('./userMap');
const { MockUserPersistance1 } = require('./../testing/mockUserPersistance.js');
const mockUser = require('./../testing/mockUser.js');

describe('Mapping User Persistance to Domain', () => {
  test('given a User Persistance, should receive a Domain User', async () => {
    const domainUser = UserMap.toDomain(MockUserPersistance1);
    expect(domainUser).toStrictEqual(mockUser);
  });
});
