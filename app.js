const express = require("express");

const dotenv = require("dotenv");
const morgan = require("morgan");
//Loads the handlebars module
const handlebars = require("express-handlebars");
const connectDB = require("./config/db");
//Load config

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

//Logging
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

//Handlebars
//instead of app.set('view engine', 'handlebars');
app.set("view engine", "hbs");
app.engine(
  ".hbs",
  handlebars.engine({
    defaultLayout: "main",
    //new configuration parameter
    extname: ".hbs",
  })
);

//Routes
app.use("/", require("./routes/index"));

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
