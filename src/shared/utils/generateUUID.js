const { v4: uuidv4, parse } = require('uuid');

function generateUUID() {
  return uuidv4();
}

function convertUUIDToBuffer(inputUUID) {
  return parse(inputUUID);
}

function convertUUIDFromBuffer(inputBuffer) {
  return uuidv4({ random: inputBuffer });
}

module.exports = {
  generateUUID,
  convertUUIDToBuffer,
  convertUUIDFromBuffer,
};
