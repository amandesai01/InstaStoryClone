const router = require("express")();
const bodyparser = require("body-parser");
const fs = require("fs");

const uploader = require("./upload-manager");
const cloudinary = require("./cloudinary");

const getpath = async (path) => await cloudinary.uploads(path, "Images");

router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());

router.post("/createstory", uploader.array("image"), async (req, res) => {
  try {
    const urls = [];
    const files = req.files;
    const STORIES = 2;
    var counter = 0;
    for (const file in files) {
      const { path } = file;
      const newPath = await getpath(path);
      urls.push(newPath);
      fs.unlinkSync(path);
      counter += 1;
      if (counter >= STORIES) break;
    }
    res.status(200).json({
      message: "Images Uploaded Successfully",
      data: urls,
    });
  } catch (err) {
    res.status(405).json({
      message: err,
      data: [],
    });
  }
});

module.exports = router;