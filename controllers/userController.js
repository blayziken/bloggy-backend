const catchAsyncError = require('./../utils/catchAsync');
const User = require('./../models/userModel');
const AppError = require('./../utils/appError');

exports.getUser = catchAsyncError(async (req, res, next) => {

    const user = await User.findOne({ username: req.params.userName });

    if (!user) {
        return next(new AppError('This user does not exist', 404));
    }

    res.status(204).json({
        status: 'Successful',
        data: user
    });

});

exports.updateUser = catchAsyncError(async (req, res, next) => {
    // console.log(req.file);

    // 1) Create error if user POSTs password data
    // if (req.body.password || req.body.passwordConfirm) {
    //     return next(
    //         new AppError(
    //             'This route is not for password updates. Please use /updateMyPassword.',
    //             400
    //         )
    //     );
    // }

    // // 2) Filtered out unwanted fields names that are not allowed to be updated
    // const filteredBody = filterObj(req.body, 'name', 'email');
    // if (req.file) filteredBody.photo = req.file.filename;

    // 3) Update user document
    const updatedUser = await User.findOneAndUpdate(req.user.username, req.body, {
        new: true
    })


    res.status(200).json({
        status: 'User successfully updated',
        data: {
            user: updatedUser
        }
    });

    next();
});

exports.deleteUser = catchAsyncError(async (req, res, next) => {

    const deletedUser = await User.findOneAndDelete(req.user.username);

    if (!deletedUser) {
        return next(new AppError('This user does not exist', 404));
    }
    res.status(204).json({
        status: 'User successfully deleted',
        data: null
    });

});

exports.checkUsername = catchAsyncError(async (req, res, next) => {

    const user = await User.findOne({ username: req.params.userName }, (err, results) => {
        if (err) return res.status(500).json({ message: err });
    });

    if (user) {
        res.json({
            status: true,
            message: 'User exists'
        });
    } else {
        res.json({
            status: false,
            message: 'User does not exist'
        });
    }


});
