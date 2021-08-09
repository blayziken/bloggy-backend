const User = require('./../models/userModel');
const catchAsyncError = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.signup = catchAsyncError(async (req, res, next) => {

    const newuser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    res.status(200).json({
        status: 'User Registered',
        data: {
            newuser
        }
    });
});

exports.login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }

    //(a) Check if user exists
    const user = await User.findOne({ email: email }).select('+password');

    if (!user || user.password != req.body.password) {
        return next(new AppError('Incorrect email or password', 401));
    }

    // if (!user || !await user.correctPassword(password, user.password)) {
    //     // 
    //     // if (!user || checkIfPasswordIsCorrect == false)
    //     return next(new AppError('Incorrect email or password', 401));
    // }

    // 3) If everything is ok, send token to client
    // const token = signToken(user._id);

    res.status(200).json({
        status: 'Logged in successfully',
        data: user
    });
});