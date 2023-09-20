const User = require('../entities/user');
const { generateUUID } = require('../../../shared/utils/generateUUID');

const mockUser = new User(
  'dff37947-fb84-4908-b0e5-b24844ba9068',
  'Hassan',
  'Lucero',
  'hasLuce@gmail.com',
  '$2b$13$pIsvZ0Mz7dx1qBUnRT96Y.dqP2hN2J5SZgEPD0higBKCGyxr1zFgq',
  'Student',
  'Male',
  93329811,
  null,
  '2391001',
  null,
  null,
  null,
);

module.exports = mockUser;
