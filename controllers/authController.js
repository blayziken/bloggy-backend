const User = require('./../models/userModel');
const catchAsyncError = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const config = require('./../config');
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
    console.log('Login ROute');
    User.findOne({ username: req.body.username }, (err, result) => {
        if (err) return res.status(500).json({ msg: err.message });

        if (result === null) {
            return res.status(403).json("Username incorrect");
        }

        if (result.password === req.body.password) {
            let token = jwt.sign({ username: req.body.username }, config.key, {
                expiresIn: "24h",
            });


            res.json({
                token: token,
                msg: "Success"
            });
        } else {
            res.status(403).json("Password is incorrect");
        }
    });

    // const { username, password } = req.body;

    // // 1) Check if email and password exist
    // if (!username || !password) {
    //     return next(new AppError('Please provide username and password!', 400));
    // }

    // //(a) Check if user exists
    // const user = await User.findOne({ username: username }).select('+password');

    // if (!user || user.password != req.body.password) {
    //     return next(new AppError('Incorrect username or password', 401));
    // }

    // // Json Web Token Implementation
    // let token = jwt.sign({ username }, process.env.JWT_SECRET, {
    //     expiresIn: process.env.JWT_EXPIRES_IN
    // })


    // res.status(200).json({
    //     status: 'Logged in successfully',
    //     token,
    //     data: user
    // });
};


// VERIFY IF TOKEN IS CORRECT
// exports.protect = async (req, res, next) => {
//     //1) GET TOKEN AND CHECK IF IT ACTUALLY EXISTS
//     let token;
//     if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith('Bearer')
//     ) {
//         token = req.headers.authorization.split(' ')[1];
//     }


//     if (!token) {
//         return next(
//             new AppError('You are not logged in! Please log in to get access.', 401)
//         );
//     }

//     // 2) CHECK IF TOKEN IS VALID OR NOT
//     const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

//     //3) IF VERIFICATION IS SUCCESSFUL, CHECK IF USER STILL EXISTS
//     const currentUser = await User.findOne({ username: decoded.username });

//     if (!currentUser) {
//         return next(
//             new AppError(
//                 'The user belonging to this token does no longer exist.',
//                 401
//             )
//         );
//     }

//     //4) CHECK IF USER CHANGED PASSWORD AFTER TOKEN WAS ISSUED
//     //To check if user recently changed password, we will create an instance method available on all documents

//     // if (currentUser.changedPasswordAfter(decoded.iat)) {
//     //     return next(
//     //         new AppError('User recently changed password! Please log in again.', 401)
//     //     );
//     // }

//     //FINALLY, IF THE CODE MAKES IT TO THIS POINT, WE GRANT ACCESS TO PROTECTED ROUTE
//     req.user = currentUser;

//     next();
// }

exports.checkToken = (req, res, next) => {
    let token = req.headers["authorization"];

    token = token.slice(7, token.length);

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.json({
                    status: false,
                    msg: "token is invalid"
                })
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        return res.json({
            status: false,
            msg: "Token is not provided"
        })
    }
    next();

}


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

    //4) CHECK IF USER CHANGED PASSWORD AFTER TOKEN WAS ISSUED
    //To check if user recently changed password, we will create an instance method available on all documents

    // if (currentUser.changedPasswordAfter(decoded.iat)) {
    //     return next(
    //         new AppError('User recently changed password! Please log in again.', 401)
    //     );
    // }

    //FINALLY, IF THE CODE MAKES IT TO THIS POINT, WE GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;

    next();
}