const catchAsyncError = require('./../utils/catchAsync');
const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
let middleware = require('../controllers/middleware');

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

exports.updateUser = catchAsyncError(async (req, res) => {

    const updatedUser = await User.findOneAndUpdate({ username: req.user.username }, req.body, {
        new: true
    })

    console.log(updatedUser);


    res.status(200).json({
        status: 'User successfully updated',
        data: {
            user: updatedUser
        }
    });

    // next();
});

// exports.updateUser = catchAsyncError(async (req, res, next) => {

//     console.log('Update User');
//     console.log(req.params.username);

//     const user1 = await User.findOneAndUpdate(
//         { username: req.params.username }, { $set: { password: req.body.password } }, (err, result) => {
//             if (err) {
//                 console.log(err);
//             }

//             // return res.status(500).json({ msg: err });

//             const msg = {
//                 msg: "Password successfully updated",
//                 username: req.params.username,
//             };
//             return res.json(msg);

//         }

//     );
//     console.log(user1);


// });

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
