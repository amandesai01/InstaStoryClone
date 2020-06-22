const router = require("express")();
const bodyparser = require("body-parser");
const fs = require("fs");
const mongoose = require("mongoose")

const uploader = require("./upload-manager");
const cloudinary = require("./cloudinary");

const Story = require('./StoryModel')

const getpath = async (path) => await cloudinary.uploads(path, "Images");
const MONGODB_URL = "mongodb://localhost:27017/insta"

router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());
mongoose.connect(MONGODB_URL)

router.post("/story", uploader.array("image"), async (req, res) => {
  try {
    const urls = [];
    const files = req.files;
    if (files.length != 2){
      res.status(400).json({ message: "Invalid Number of Files" }); 
      return;
    };
    const STORIES = 2;
    for (var i = 0; i < STORIES; i++) {
      const path = files[i].path;
      const newPath = await getpath(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    
  } catch (err) {
    console.log(err);
    res.status(405).json({
      message: toString(err)
    });
  }
});

router.get('/story', (req, res) => {
  const page = parseInt(req.body.page);
  const limit = parseInt(req.body.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = (page) * limit;

  const results = {}

  if(startIndex > 0){
    results.previous = {
      page: page - 1,
      limit: limit
    }
  }
  if(endIndex < SOMELENGTH){
    results.next = {
      page: page + 1,
      limit: limit
    }
  }
  

})

module.exports = router;
