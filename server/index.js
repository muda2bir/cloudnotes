const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config({ path: "./config.env" }); // dotenv Config
require("./db/conn"); // Connecting to the server

// Important Uses
app.use(express.json());
app.use(cookieParser());
app.use(require("./router/routes.js"));

const port = process.env.PORT || 5000;
const hostname = "127.0.0.1";
app.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}/`);
});
