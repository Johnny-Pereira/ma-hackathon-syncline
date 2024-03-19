const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/', require('./routes/queries'))

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})