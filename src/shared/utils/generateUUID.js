const { v4: uuidv4, parse } = require("uuid");

function generateUUID() {
  return uuidv4();
}

function convertUUIDStringToBuffer(inputString) {
  return parse(inputString);
}

function convertUUIDFromBuffer(inputBuffer) {
  return uuidv4({ random: inputBuffer });
}

module.exports = {
  generateUUID,
  convertUUIDStringToBuffer,
  convertUUIDFromBuffer,
};
