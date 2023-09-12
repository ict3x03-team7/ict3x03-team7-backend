const express = require("express");
const cors = require("cors");
const equipmentRouter = require("./infra/http/routes/equipment");
const userRouter = require("./infra/http/routes/user");
const dummyRouter = require("./infra/http/routes/dummy");
const morgan = require("morgan");
const helmet = require("helmet");
const getFileFromLocal = require("./shared/utils/getLocalFile");
const S3FileService = require("./shared/services/s3FileService");
const S3Instance = require("./shared/infra/s3");
const File = require("./shared/entities/file.js");
const {
  generateUUID,
  convertUUIDStringToBuffer,
  convertUUIDFromBuffer,
} = require("./shared/utils/generateUUID");

const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1",
  })
);

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json("50mb"));

app.use("/user", userRouter);
app.use("/equipment", equipmentRouter);
app.use("/dummy", dummyRouter);

app.get("/patrickStar", async (req, res) => {
  const patrickStar = await getFileFromLocal("testImages/patrick_star.png");
  console.log(patrickStar);
  const s3FileService = new S3FileService(S3Instance);
  const fileUUID = generateUUID();
  console.log(fileUUID);
  const patrickFile = new File(fileUUID, "patrickstar.png", 52);
  if (await s3FileService.addFile(patrickFile, patrickStar)) {
    const patrickFetch = await s3FileService.getFile(patrickFile);
    console.log(patrickFetch);
    return res.json({ url: patrickFetch });
  } else {
    return res.json({ error: "File cannot be retrieved" });
  }
});

app.get("/deletepatrickstar/:uuid", async (req, res) => {
  const s3FileService = new S3FileService(S3Instance);
  const fileID = req.params.uuid;
  const result = await s3FileService.deleteFile(
    new File(
      createUUIDFromBuffer(convertUUIDStringToBuffer(fileID)),
      "patrickstar.png",
      52
    )
  );
  if (result) {
    return res.json({ result: "File was deleted" });
  } else {
    return res.json({ error: "File cannot be deleted" });
  }
});

module.exports = app;
