const express = require('express')
const app = express()
const port = 3000
const toDoListRoute = require("./routes/agenda")
const cors = require("cors");

app.use(express.json())

//app.use(cors());
app.use(cors({ origin: "http://localhost:3001" }));

app.use("/agenda", toDoListRoute)

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})