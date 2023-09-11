require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/db");
const api = require("./routes/routes");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser")


app.use(express.json());
app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}));
app.use("/api", api);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use(
    session({
        secret: "anything",
        resave: true,
        saveUninitialized: true,
    }));
    
    
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(cookieParser("anything")) //uses same secret on the session secret
try {
  db.sync({ alter: true }).then(() => {
    console.log("db connection established");
    app.listen(process.env.PORT || 3001, () => {
      console.log(
        "listening on port " + process.env.PORT,
        "address: http://localhost:" + process.env.PORT
      );
    });
  });
} catch (error) {
  console.log("error: " + error);
}
