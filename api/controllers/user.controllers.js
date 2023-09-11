const Users = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser("anything")); //uses same secret on the session secret


const getUsers = async (req, res) => {
  const resp = await Users.findAll();
  return res.json(resp);
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findOne({ where: { id: id } });
    res.json({ status: "OK", user: user.username });
  } catch (error) {
    res.json(error);
  }
};

const updUser = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    const user = await Users.findOne({ where: { id: id } });
    if (!user) {
      res.json({ error: "User not found" });
    }
    await user.update({
      username: username,
      password: password,
    });
    res.send({ status: "OK" });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) return res.send({ error: "missing values" });
    const user = await Users.findOne({ where: { username: username } });
    if (user != null) {
      bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
          res.json({ error: "usuario y/o contraseña incorrecto" });
          return;
        }

        res.json({ status: "OK",user: username });
      })
      }
  } catch (error) {
    return res.send({ error: "error: ", error });
  }
};

// const login = (req, res, next) => {
//   passport.authenticate("local", {
//     successReturnToOrRedirect: "/dashboard",
//     failureRedirect: "/login",
//     failureMessage: true,
//   })(req, res, next);
// };

const addUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const checkValidUsername = await Users.findOne({
      where: { username: username },
    });
    let id = `${Math.floor(Math.random() * 100 * 100)}${Math.floor(
      Math.random() * 100 * 100
    )}`;

    if (!checkValidUsername) {
      console.log("-------------------", "no user");

      bcrypt.hash(password, 8).then((hash) => {
        const user = Users.create({
          id: id,
          username: username,
          password: hash,
        });
        //PASSPORT----------------------------------------------
      });
      return res.json({ status: "OK", msg: "user created ->" + username });
    }
    return res.json({ error: "email taken" });
  } catch (error) {
    return res.json({ error: error });
  }
};

const delUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findOne({ where: { id: id } });
    if (!user) {
      res.json({ error: "User with given id doesn't exist." });
    }
    await user.destroy();
    res.json({ msg: "User deleted" + user });
  } catch (error) {}
};

module.exports = { addUser, delUser, getUser, updUser, getUsers, login };
