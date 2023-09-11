const express = require("express");
const router = express.Router();
const {
  addUser,
  delUser,
  getUser,
  updUser,
  getUsers,
  login,
} = require("../controllers/user.controllers");



// const passport = require("passport");
// const jwt = require("passport-jwt")
// require("../middlewares/auth")(passport)




router.get("/users", async (req, res) => getUsers(req, res));
router.get("/user/:id", async (req, res) => getUser(req, res));
router.post("/user", async (req, res) => addUser(req, res));
// router.post('/login', passport.authenticate('login',{
//     successRedirect : '/dashboard',
//     failureRedirect : '/login',
     
// }));
router.post("/login", async (req, res) => login(req, res))

router.put("/user/:id", async (req, res) => updUser(req, res));
router.delete("/user/:id", async (req, res) => delUser(req, res));

module.exports = router;
