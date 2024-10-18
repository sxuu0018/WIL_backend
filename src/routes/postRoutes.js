const express = require('express');
const { createNewPost, deletePost, addComment, deleteComment, authenticateUser } = require('../controllers/postController');
const router = express.Router();

// Apply authentication middleware to routes that require authentication
router.post('/posts', authenticateUser, createNewPost); // Create post
router.delete('/posts/:postId', authenticateUser, deletePost); // Delete post
router.post('/posts/:postId/comments', authenticateUser, addComment); // Add comment
router.delete('/posts/:postId/comments/:commentId', authenticateUser, deleteComment); // Delete comment

module.exports = router;
