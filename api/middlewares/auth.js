// var LocalStrategy = require('passport-local').Strategy;
// var Users = require('../models/user');
// module.exports = function(passport){
//     passport.serializeUser(function(user, done) {
//         done(null, user.id);
//     });

//     passport.deserializeUser(function(id, done) {
//         User.findById(id, function(err, user) {
//             done(err, user);
//         });
//     });


//     passport.use('register',new LocalStrategy({
//         usernameField: 'email',
//         passwordField: 'password',
//         passReqToCallback:true
//     },
//         function(req,email, password, done) {
//             User.findOne({ email: email }, function(err, user) {
//             if (err) { return done(err); }
//             if (user) {
//                 return done(null, false, req.send('registerMessage','Email is already taken...' ));
//             }else{
//                 var newUser = new User();
//                 newUser.email = email;
//                 newUser.password = newUser.generateHash(password);
//                 newUser.save(function(err){
//                 if(err) throw err;
//                 return done(null,newUser);
//             });
//             }
//             });
//     }));

//     passport.use('login',new LocalStrategy({
//         usernameField: "testUser2",
//         passwordField: "testUser2",
//         passReqToCallback:true
//     },
//         function(req, username, password, done) {
//             console.log(req)
//           const user = Users.findOne({where: { username: username }})
            
//             if (!user) {
//                 return done(null, false, req.send('loginMessage','Incorrect username.' ));
//             }
            
//             return done(null, user);
            
//         }
//     ));


// };