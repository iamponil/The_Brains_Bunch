const express = require('express');
const router = express.Router();
const { createPost, getAllPosts,addComment, addLike } = require('../controller/blogController');
const authenticateToken = require("../middleware/Authorize");
const storage = require("../middleware/storage");
// Create a new post
router.post('/createposts',storage.upload_file("image"),authenticateToken, createPost);

// Get all posts
router.get('/posts',authenticateToken, getAllPosts);

module.exports = router;
