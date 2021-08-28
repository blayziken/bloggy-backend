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

exports.updateUser = async (req, res) => {

    const updatedUser = await User.findOneAndUpdate({ username: req.params.username }, req.body, {
        new: true
    }).catch(error => {
        console.log(error);
        return (new AppError('This user does not exist', 404));
    })

    res.status(200).json({
        status: 'User successfully updated',
        data: {
            user: updatedUser
        }
    });
};

exports.deleteUser = catchAsyncError(async (req, res) => {

    const deletedUser = await User.findOneAndDelete({ username: req.user.username });

    if (!deletedUser) {
        return next(new AppError('This user does not exist', 404));
    }
    res.status(204).json({
        status: 'User successfully deleted',
        data: null
    });

});

exports.checkUsername = catchAsyncError(async (req, res) => {

    const user = await User.findOne({ username: req.params.username }, (err, results) => {
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
