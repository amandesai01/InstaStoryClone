var router = require('express')()
const bodyparser = require('body-parser')

router.use(bodyparser.urlencoded({ extended : false }))
router.use(bodyparser.json())

module.exports = router