var router = require('express')()
const bodyparser = require('body-parser')

const uploader = require('./upload-manager')

router.use(bodyparser.urlencoded({ extended : false }))
router.use(bodyparser.json())

module.exports = router