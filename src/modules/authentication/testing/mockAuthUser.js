const AuthUser = require('../entities/authUser');
const { generateUUID } = require('../../../shared/utils/generateUUID');

const mockAuthUser = new AuthUser(
  'dff37947-fb84-4908-b0e5-b24844ba9068',
  'Hassan',
  'Lucero',
  'hasLuce@gmail.com',
  'Password123',
  'Student',
  null,
  null,
  null,
  null,
  0,
);

module.exports = mockAuthUser;
