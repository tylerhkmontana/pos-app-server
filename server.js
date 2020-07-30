const express = require("express")
const app = express()
const cors = require("cors")
const dbConnection = require("./config/db.config.js")

dbConnection()

app.use(express.json())
app.use(cors())

app.use("/api/table-setting", require('./controller/tableSetting.controller.js'))
app.use("/api/menu-setting", require('./controller/menuSetting.controller.js'))

// Error Handling
app.use((err, req, res, next) => {
  const error_message = res.locals.error.message
  const error_status = res.locals.error.status
  
  console.log(err)

  res.status(error_status).send(error_message)
  next()
})
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on ${port}`))