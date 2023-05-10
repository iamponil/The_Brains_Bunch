const Post = require('../models/post');

// Create a new post
exports.createPost = async (req, res) => {
  const { title, content} = req.body;
  const author = req.user.id; // Assuming user authentication middleware sets req.user
  const image = req.file.filename;
  try {
    const post = await Post.create({ title, content, author ,image});
    res.status(201).json(post);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to create post' });
  }
};
// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};


