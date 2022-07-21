const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
};

const apiRouter = require("./routes/api");

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(express.static(path.join(__dirname, "client/dist")));
app.use("/images", express.static(__dirname + "/images"));
app.use(cors());
app.use(compression());
app.use(helmet());
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server listening on port 3001");
});
