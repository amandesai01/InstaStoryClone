const router = require("express")();
const bodyparser = require("body-parser");
const mongo = require("mongodb");

const MONGODB_URL = "mongodb://localhost:27017/insta"

router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());



module.exports = router