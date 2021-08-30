const User = require('./../models/userModel');
const catchAsyncError = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

// USER SIGN UP
exports.signup = catchAsyncError(async (req, res, next) => {
    const newuser = await User.create({
        name: req.body.name,
        username: req.body.username,
        contactNumber: req.body.contactNumber,
        email: req.body.email,
        password: req.body.password,
    }).catch(err => {
        res.status(500).json({
            status: 'Error, please try again',
            err
        })
    });

    res.status(200).json({
        status: 'User Registered',
        data: {
            newuser
        }
    });
    next();
});

// USER LOGIN
exports.login = (req, res) => {
    User.findOne({ username: req.body.username }, (err, result) => {
        if (err) return res.status(500).json({ msg: err.message });

        if (result === null) {
            return res.status(403).json("Username does not exist");
        }

        if (result.password === req.body.password) {
            let token = jwt.sign({ username: req.body.username }, process.env.JWT_SECRET, {
                expiresIn: "24h",
            });

            console.log(token);

            res.status(200).json({
                token: token,
                msg: "Success"
            });
        } else {
            res.status(403).json("Password is incorrect");
        }
    });
};

// VERIFY IF TOKEN IS CORRECT
exports.protect = async (req, res, next) => {
    //1) GET TOKEN AND CHECK IF IT ACTUALLY EXISTS

    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(
            new AppError('You are not logged in! Please log in to get access.', 401)
        );
    }

    // 2) CHECK IF TOKEN IS VALID OR NOT
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //3) IF VERIFICATION IS SUCCESSFUL, CHECK IF USER STILL EXISTS
    const currentUser = await User.findOne({ username: decoded.username });

    if (!currentUser) {
        return next(
            new AppError(
                'The user belonging to this token does no longer exist.',
                401
            )
        );
    }

    //FINALLY, IF THE CODE MAKES IT TO THIS POINT, WE GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;

    next();
}