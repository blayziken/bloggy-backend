const path = require('path');
const catchAsyncError = require('./../utils/catchAsync');
const BlogPost = require('./../models/blogPostModel');
const AppError = require('./../utils/appError');
const multer = require('multer');


// MULTER CONFIGURATION: UPLOAD IMAGES
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/postCoverImages");
    },
    filename: (req, file, cb) => {
        cb(null, req.params.id + ".jpg");
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
    const document = await BlogPost.findOneAndUpdate({ _id: req.params.id },
        {
            $set: {
                coverImage: req.file.path,
            },
        },
        { new: true }
    );

    if (!document) {
        return next(new AppError('Can\'t find Blog Post', 404));
    }

    res.status(200).json({
        status: 'image uploaded successfully',
        data: {
            document
        }
    });
})

exports.addPost = catchAsyncError(async (req, res) => {

    const newPost = await BlogPost.create({
        username: req.user.username,
        title: req.body.title,
        body: req.body.body,
    }).then((result) => {

        // I need this ID from mongoDB so I can change the cover Image from Flutter
        // That's why I'm wrapping this res.status.json in the then block
        const postId = result["_id"];

        res.status(200).json({
            status: 'Post added',
            data: {
                postId
            }
        });
    });
});

exports.getMyBlogPosts = catchAsyncError(async (req, res) => {

    const data = await BlogPost.find({ username: req.user.username });

    res.status(200).json({
        data: data
    });
});

exports.getotherBlogPosts = catchAsyncError(async (req, res) => {

    const data = await BlogPost.find({ username: { $ne: req.user.username } });

    res.status(200).json({
        data: data
    });
});

exports.deletePost = catchAsyncError(async (req, res) => {

    const deletedPost = await BlogPost.findOneAndDelete({ $and: [{ username: req.user.username }, { _id: req.params.id }] });

    if (!deletedPost) {
        return next(new AppError('This post does not exist', 404));
    }
    res.status(200).json({
        status: 'Post successfully deleted',
        data: null
    });
});

// exports.getPosts = catchAsyncError(async (req, res) => {
//     const posts = await BlogPost.findOne({ username: req.user.username });

//     console.log(profile);
//     if (!profile) {
//         return next(new AppError('User has no Profile', 404));
//     }

//     res.status(200).json({
//         status: 'Success',
//         data: profile
//     });

// });