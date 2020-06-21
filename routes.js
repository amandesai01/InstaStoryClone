const router = require("express")();
const bodyparser = require("body-parser");
const fs = require("fs");
const mongo = require("mongodb")

const uploader = require("./upload-manager");
const cloudinary = require("./cloudinary");

const getpath = async (path) => await cloudinary.uploads(path, "Images");
const MONGODB_URL = "mongodb://localhost:27017/insta"

router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());

router.post("/createstory", uploader.array("image"), async (req, res) => {
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
    mongo.connect(MONGODB_URL, (err, db) => {
      if(err){
        res.status(405).json({ message : toString(err) })
        return;
      }
      var story = {
        urls: urls,
        caption : (req.body.caption) ? req.body.caption : "No Caption Provided"
      }
      db.collection('stories').insertOne(story, (err, result) => {
        if(err){
          res.status(405).json({ message: toString(err) })
          return;
        }
        res.status(200).json({ message: "Story Posted Successfully." })
      })
    })
  } catch (err) {
    console.log(err);
    res.status(405).json({
      message: toString(err)
    });
  }
});

module.exports = router;
