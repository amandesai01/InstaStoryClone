const express = require('express')
const stories = require('./StoriesManager/routes')

const app = express()

const PORT = process.env.PORT || 3000

app.use(stories)

app.listen(PORT, () => {
    console.log("Listening to Port " + PORT)
})