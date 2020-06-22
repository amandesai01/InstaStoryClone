const router = require("express")();
const bodyparser = require("body-parser");
const mongo = require("mongodb");

const MONGODB_URL = "mongodb://localhost:27017/insta";

router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());

router.post("/comment", (req, res) => {
  try {
    const comment = req.body.comment;
    const id = req.body.id;
    const data = {
      comment: comment,
      postid: id,
    };
    mongo.connect(MONGODB_URL, (err, db) => {
      if (err) {
        res.status(400).json({ message: "Internal Error!" });
        return;
      }
      db.collection("comments").insertOne(data, (err, result) => {
        if (err) {
          res.status(400).json({ message: "Internal Error!" });
          return;
        }
        res.status(200).json({ message: "Posted!" });
      });
    });
  } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Internal Error!" })
  }
});

module.exports = router;
