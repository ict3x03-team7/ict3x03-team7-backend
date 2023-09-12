const fs = require("fs");

// Function to read a file
async function getFileFromLocal(filePath) {
  const fileData = await fs.promises.readFile(filePath);
  return fileData;
}

module.exports = getFileFromLocal;
