const User = require('./../models/userModel');
const catchAsyncError = require('./../utils/catchAsync');

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