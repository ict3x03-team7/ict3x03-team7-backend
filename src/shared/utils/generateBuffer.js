const { parse } = require('uuid');

function generateBuffer(uuid) {
  return parse(uuid);
}

module.exports = generateBuffer;
