const Dummy = require('../../entities/dummy');
const { generateUUID } = require('../../../../shared/utils/generateUUID');

const mockDummy1 = new Dummy(generateUUID(), 'mockDummy1');

module.exports = mockDummy1;
