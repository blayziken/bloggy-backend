const catchAsyncError = require('./../utils/catchAsync');
const User = require('./../models/userModel');

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
    const updatedUser = await User.findOneAndUpdate(req.params.username, req.body, {
        new: true
    })


    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    });
});
