require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const route = require("./routes");
const connectdb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern.uliaw.mongodb.net/mern?retryWrites=true&w=majority`,
      {}
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
connectdb();
const app = express();
app.use(express.json());
app.use(cors());
// Route init
route(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
