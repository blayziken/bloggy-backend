const catchAsyncError = require('./../utils/catchAsync');
const Profile = require('./../models/profileModel');

exports.addProfile = catchAsyncError(async (req, res, next) => {

    const newProfile = await Profile.create({
        username: req.user.username,
        name: req.body.name,
        contactNumber: req.body.contactNumber,
        profession: req.body.profession,
        DOB: req.body.DOB,
        titleline: req.body.titleline,
        about: req.body.about,

    });

    res.status(200).json({
        status: 'Profile added',
        data: {
            newProfile
        }
    });

    next();

});