const express = require('express')
const path = require('path')
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.static('docs'))
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../docs/', 'index.html'))
})

app.listen(PORT, function () {
  console.log('Game online! Open localhost:' + PORT)
})
