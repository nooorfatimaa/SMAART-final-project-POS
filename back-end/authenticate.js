var passport = require('passport')
var LocalStrat = require('passport-local').Strategy
var User = require('./app_server/models/user')
var JwtExtrac = require('passport-jwt').ExtractJwt
var JwtStrat = require('passport-jwt').Strategy
var config = require('./config')
var Jwt = require('jsonwebtoken')

passport.use(new LocalStrat (User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
exports.getToken = function(usr){
    return Jwt.sign(usr, config.secretKey, {expiresIn:3600});
};


var options = {}
options.jwtFromRequest = JwtExtrac.fromAuthHeaderAsBearerToken()
options.secretOrKey = config.secretKey;

passport.use(new JwtStrat(options, function(jwt_payload, done) {
    
    User.findOne({_id: jwt_payload._id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

exports.isUser = passport.authenticate('jwt', { session: false });

exports.isAdmin = (req, res, next) => {
    console.log(req.user._id);    
    User.findOne({ _id: req.user._id }, (err, user) => {
        console.log(user.admin);
        if (err) {
            return next(err);
        } else if (user.admin) {
            return next();
        } else {
            res.send("only admin can perform this operation");
        }
    });
};
