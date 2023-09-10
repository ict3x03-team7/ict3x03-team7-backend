const Dummy = require("../../entities/dummy");
const generateUUID = require("../../../../shared/utils/generateUUID");

const mockDummy2 = new Dummy(generateUUID(), "mockDummy2");
module.exports = mockDummy2;
