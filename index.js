require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const spawn = require("child_process").spawn;
const cors = require("cors");
const path = require("path");
const cloudinary = require("cloudinary");
const app = express();
const studentData = require("./7thSemScse.json");

const port = process.env.PORT || 4000;
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client", "build")));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.post("/detectFace", (req, res) => {
  const file = req.files.file.name;
  const filePath = req.files.file.tempFilePath;
  // console.log(file);
  // console.log(filePath);
  var process = spawn("python", ["./index.py", filePath]);
  let searchData = [];
  process.stdout.on("data", function (data) {
    // console.log(data);
    // if (Number(data) === 0) res.send([]);
    searchData = studentData.filter((item) => item.roll === Number(data));
    // console.log(searchData);
    res.send(searchData);
  });
  //   cloudinary.v2.uploader.upload(
  //     filePath,
  //     // { public_id: file },
  //     function (error, result) {
  //       console.log(result);
  //     }
  //   );
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
