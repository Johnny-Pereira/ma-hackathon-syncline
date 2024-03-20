const express = require("express");
const validationHandler = require("./validation/validation");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/", require("./routes/queries"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", async (req, res) => {
  try {
    await validationHandler(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});
