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
    if (files.length != 2)
      res.send(400).json({ message: "Invalid Number of Files", data: [] });
    const STORIES = 2;
    for (var i = 0; i < STORIES; i++) {
      const path = files[i].path;
      const newPath = await getpath(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    res.status(200).json({
      message: "Images Uploaded Successfully",
      data: urls,
    });
  } catch (err) {
    console.log(err);
    res.status(405).json({
      message: toString(err),
      data: [],
    });
  }
});

module.exports = router;
