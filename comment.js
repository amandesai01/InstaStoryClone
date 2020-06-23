const router = require("express")();
const bodyparser = require("body-parser");
const mongo = require("mongodb");

const MONGODB_URL = process.env.MONGO_URL;

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
        res.status(400).json({ message: "Some Error!" });
        return;
      }
      db.collection("comments").insertOne(data, (err, result) => {
        if (err) {
          res.status(400).json({ message: "Some Error!" });
          return;
        }
        res.status(200).json({ message: "Posted!" });
      });
    });
  } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Some Error!" })
  }
});

router.get('/comment', (req, res) => {
    rpostid = req.query.postid;
    if(!rpostid){
        res.status(400).json({ message: "Missing Argument - postid" });
        return;
    }
    try {
        mongo.connect(MONGODB_URL, (err, db) => {
            if(err){
                res.status(400).json({ message: "Some Error!" })
                return;
            }
            console.log(rpostid)
            db.collection('comments').find({ postid: rpostid }).toArray((err, result) => {
                if(err){
                    res.status(400).json({ message: "Some Error!" })
                    return;
                }
                res.status(200).json(result)
            })
        })
    } catch (error) {
        
    }
})

module.exports = router;
