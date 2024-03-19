const express = require('express')

const app = express()
app.use(express.json())

app.use('/', require('./routes/queries'))

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})