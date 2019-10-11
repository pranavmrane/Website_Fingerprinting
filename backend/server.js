const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

// Set Backend port as 5000
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Setting up connection string for mongoDB database
// Check project_folder/backend/.env
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const usersRouter = require("./routes/users");

app.use("/users", usersRouter);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connections established successfully");
});

app.listen(port, () => {
  console.log(`Server is runnning on port: ${port}`);
});
