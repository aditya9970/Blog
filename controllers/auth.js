const User = require('../models/user');
const shortId = require('shortid');
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt');

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email }).exec((err, user) => {
        if (user)
            return res.status(400).json({
                error: 'Email is taken'
            })

        const { name, email, password } = req.body;
        let username = shortId.generate();
        let profile = `${process.env.CLIENT_URL}/profile/${username}`;

        let newUser = new User({ name, email, password, profile, username })
        newUser.save((err, success) => {
            if (err)
                return res.status(400).json({
                    error: err
                })
            res.json({ message: 'Signup success! please signin.' })
        });
    });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;
    //check if user exits
    User.findOne({ email }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist . Please signup.'
            })
        }
        //authenticate
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Email and password do not match.'
            });
        }
        //genarte token (JWT) & send to browser
        const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, { expiresIn: '1d' })
        const { _id, username, name, email, role } = user
        return res.json({
            token,
            user: { _id, username, name, email, role }
        })
    })

}

exports.signout = (req, res) => {
    res.clearCookie('token')
    res.json({
        message: 'Signout success'
    });
};

exports.requireSignin = expressJWT({
    secret: process.env.JWT_SECRET
});

exports.authMiddlewear = (req, res, next) => {
    const authUserId = req.user._id;
    User.findById({ _id: authUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        req.profile = user;
        next();
    })
}

exports.adminMiddlewear = (req, res, next) => {
    const adminUserId = req.user._id;
    User.findById({ _id: adminUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        if (user.role !== 1) {
            return res.status(400).json({
                error: 'Admin resource access denied.'
            })
        }
        req.profile = user;
        next();
    })
}