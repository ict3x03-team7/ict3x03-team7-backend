const AuthUserMap = require('./authUserMap');
const mockAuthUserPersistance = require('./../testing/mockAuthUserPersistance.js');
const mockAuthUser = require('./../testing/mockAuthUser');

describe('Mapping Auth User Persistance to Domain', () => {
  test('given a Auth User Persistance, should receive a Domain Auth User', async () => {
    const domainAuthUser = AuthUserMap.toDomain(mockAuthUserPersistance);
    expect(domainAuthUser).toStrictEqual(mockAuthUser);
  });
});
