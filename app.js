const path = require("path");
const express = require("express");

const dotenv = require("dotenv");
const morgan = require("morgan");
//Loads the handlebars module
const handlebars = require("express-handlebars");
const passport = require("passport");
const session = require("express-session");
const connectDB = require("./config/db");
//Load config

dotenv.config({ path: "./config/config.env" });

//passport config
require("./config/passport")(passport);

connectDB();

const app = express();

//Logging
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

//Handlebars
app.set("view engine", "hbs");
app.engine(
  ".hbs",
  handlebars.engine({
    defaultLayout: "main",
    //new configuration parameter
    extname: ".hbs",
  })
);
//Sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//static folder
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
