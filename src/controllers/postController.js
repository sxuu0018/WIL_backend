const { createPost, findPostById, deletePostById, addCommentToPost, deleteCommentFromPost, getAllPosts } = require('../models/postModel');
const jwt = require('jsonwebtoken');

// Middleware: Ensure user is authenticated
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Attach userId to request for further use
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Create a new post
const createNewPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newPost = await createPost(req.userId, title, content); // User ID attached from token
    res.status(201).json({ post: newPost });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

// Delete a post by ID
const deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await findPostById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (post.user_id !== req.userId) return res.status(403).json({ error: 'Unauthorized action' });

    await deletePostById(postId);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
};

// Add comment to a post
const addComment = async (req, res) => {
  const { postId } = req.params;
  const { comment } = req.body;

  try {
    const post = await findPostById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const newComment = await addCommentToPost(postId, req.userId, comment);
    res.status(201).json({ comment: newComment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

// Delete a comment from a post
const deleteComment = async (req, res) => {
  const { postId, commentId } = req.params;

  try {
    const post = await findPostById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const commentDeleted = await deleteCommentFromPost(postId, commentId, req.userId);
    if (!commentDeleted) return res.status(403).json({ error: 'Unauthorized action' });

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};

// Fetch all posts from the database
const getAllPosts = async (req, res) => {
  try {
    const posts = await getAllPosts(); // Call the model function to fetch all posts
    res.status(200).json({ posts }); // Send the posts in a JSON response
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
};

module.exports = {
  createNewPost,
  deletePost,
  addComment,
  deleteComment,
  authenticateUser,
  getAllPosts // Export the new function to get all posts
};
