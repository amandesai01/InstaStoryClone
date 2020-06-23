const router = require("express")();
const bodyparser = require("body-parser");
const fs = require("fs");
const mongoose = require("mongoose")
const mongo = require("mongodb")

const uploader = require("./upload-manager");
const cloudinary = require("./cloudinary");

const Story = require('./StoryModel')

const getpath = async (path) => await cloudinary.uploads(path, "Images");
const MONGODB_URL = process.env.MONGO_URL

router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

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
        res.status(200).json({ message: "Story Posted Successfully." , id: story._id})
      })
    })
    
  } catch (err) {
    console.log(err);
    res.status(405).json({
      message: toString(err)
    });
  } finally {}
});

router.get('/story', async (req, res) => {
  try{
    const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const startIndex = (page - 1) * limit;
  const endIndex = (page) * limit;

  const results = {}

  if(startIndex > 0){
    results.previous = {
      page: page - 1,
      limit: limit
    }
  }
  if(endIndex){
    results.next = {
      page: page + 1,
      limit: limit
    }
  }
  results.data = await Story.find().limit(limit).skip(startIndex).exec()
  res.status(200).json(results)
  } catch(err) {
    console.log(err);
    res.status(405).json({message: "Error"})
  }
})

module.exports = router;
