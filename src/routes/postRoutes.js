const express = require('express');
const { createNewPost, deletePost, addComment, deleteComment, authenticateUser, getAllPosts } = require('../controllers/postController');
const router = express.Router();

// Fetch all posts (No authentication required)
router.get('/posts', getAllPosts);

// Create a new post (Requires authentication)
router.post('/posts', authenticateUser, createNewPost);

// Delete a post by ID (Requires authentication)
router.delete('/posts/:postId', authenticateUser, deletePost);

// Add a comment to a post (Requires authentication)
router.post('/posts/:postId/comments', authenticateUser, addComment);

// Delete a comment by ID (Requires authentication)
router.delete('/posts/:postId/comments/:commentId', authenticateUser, deleteComment);

module.exports = router;
