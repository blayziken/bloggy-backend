const path = require('path');
const catchAsyncError = require('./../utils/catchAsync');
const Profile = require('./../models/profileModel');
const multer = require('multer');
const AppError = require('./../utils/appError');

// MULTER CONFIGURATION: UPLOAD IMAGES
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, req.user.username + ".jpg");
    },
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
};

const upload = multer({
    storage: multerStorage,
    // fileFilter: multerFilter,
    limits: {
        fileSize: 1024 * 1024 * 6,
    }
});

exports.uploadImage = upload.single("img");
// upload.single("img")
exports.addImage = catchAsyncError(async (req, res, next) => {
    console.log('------------------- ' + req.user.username);


    const document = await Profile.findOneAndUpdate({ username: req.user.username },
        {
            $set: {
                img: req.file.path,
            },
        },
        { new: true, }
    );

    console.log(document);

    if (!document) {
        return next(new AppError('Can\'t find profile', 404));
    }

    res.status(200).json({
        status: 'image uploaded successfully',
        data: {
            document
        }
    });
})

// ADD A PROFILE
exports.addProfile = catchAsyncError(async (req, res) => {
    console.log(req.user.username);

    const newProfile = await Profile.create({
        username: req.user.username,
        name: req.body.name,
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

});

// Check Profile
exports.checkProfile = catchAsyncError(async (req, res) => {

    const profile = await Profile.findOne({ username: req.user.username }, (err, results) => {
        if (err) return res.status(500).json({ message: err });
    });

    if (profile) {
        res.json({
            status: true,
            message: 'Profile exists'
        });
    } else {
        res.json({
            status: false,
            message: 'No Profile'
        });
    }
});

// GET PROFILE
exports.getProfileData = catchAsyncError(async (req, res, next) => {

    const profile = await Profile.findOne({ username: req.user.username });

    console.log(profile);
    if (!profile) {
        return next(new AppError('User has no Profile', 404));
    }

    res.status(200).json({
        status: 'Success',
        data: profile
    });

});

exports.updateProfile = catchAsyncError(async (req, res) => {

    const updatedProfile = await Profile.findOneAndUpdate({ username: req.user.username }, req.body, {
        new: true
    })

    res.status(200).json({
        status: 'Profile updated successfully',
        data: {
            user: updatedProfile
        }
    });
});
