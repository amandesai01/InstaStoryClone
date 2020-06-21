const express = require('express')
const story = require('./story')

const app = express()

const PORT = process.env.PORT || 3000

app.use(story)

app.listen(PORT, () => {
    console.log("Listening to Port " + PORT)
})