const express = require('express');
const router = express.Router();
const blogPostController = require('./../controllers/blogPostController');
const authController = require('./../controllers/authController');

router.post('/add', authController.protect, blogPostController.addPost);

// router.get('/posts', authController.protect, blogPostController.getPosts);

router.patch('/:id/addCoverImage', authController.protect, blogPostController.uploadImage, blogPostController.addImage);

router.get('/myBlogPosts', authController.protect, blogPostController.getMyBlogPosts);

router.get('/otherBlogPosts', authController.protect, blogPostController.getotherBlogPosts);

router.delete('/delete/:id', authController.protect, blogPostController.deletePost);

module.exports = router;
