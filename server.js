const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const users = require("./routes/users.js");
const blog = require("./routes/blog.js");
const path = require("path");

const app = express();

//ADDING BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

//Db Config
const db = require("./config/keys.js").mongoURI;

//connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//SETTING EXPRESS SESSION
app.use(
  session({
    secret: "abcd",
    resave: true,
    saveUninitialized: true,
    maxAge: 86400000
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
require("./server/passport")(passport);

//Use Routes
app.use("/users", users);
app.use("/blog", blog);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Running on port ${port}`));
