const express = require('express')
const story = require('./story')
const comment = require('./comment')

const app = express()

const PORT = process.env.PORT || 3000

app.use(story)
app.use(comment)

app.listen(PORT, () => {
    console.log("Listening to Port " + PORT)
})