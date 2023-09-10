const { v4: uuidv4 } = require("uuid");

function convertBufferToUUID(buffer) {
  return uuidv4({ random: buffer });
}

module.exports = convertBufferToUUID;
