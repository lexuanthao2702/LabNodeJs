var express = require("express");
var router = express.Router();
const Upload = require("../config/Upload");

/* GET users listing. */
router.post("/test", function (req, res, next) {
  res.send("respond with a resource upload file");
});

router.post("/mulUpload", Upload.array("avarta", 5), async (req, res) => {
  try {
    const { files } = req;
    const urlImages = files.map(
      (file) =>
        `${req.protocol} : // ${req.get("host")}/uploads/${file.filename}`
    );
    console.log(urlImages);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
