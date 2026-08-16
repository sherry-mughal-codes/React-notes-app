const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.use("/api/auth", require("./Routes/auth"));
app.use("/api/notes", require("./Routes/notes"));

app.listen(5000, () => {
  console.log("iNotebook backend listening at http://localhost:5000");
});
