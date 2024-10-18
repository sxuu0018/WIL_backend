const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const postController = require('../controllers/postController');
const { createPost, findPostById, deletePostById, addCommentToPost, deleteCommentFromPost } = require('../models/postModel');

// Mocking models
jest.mock('../models/postModel');

const app = express();
app.use(express.json());

// Mock routes for testing
app.post('/posts', postController.authenticateUser, postController.createNewPost);
app.delete('/posts/:postId', postController.authenticateUser, postController.deletePost);
app.post('/posts/:postId/comments', postController.authenticateUser, postController.addComment);
app.delete('/posts/:postId/comments/:commentId', postController.authenticateUser, postController.deleteComment);

// Mock the authentication middleware to simulate user authentication
jest.spyOn(postController, 'authenticateUser').mockImplementation((req, res, next) => {
  req.userId = 1; // Simulating a logged-in user with ID 1
  next();
});

describe('Post Controller Tests', () => {

  // Test createNewPost
  it('should create a new post', async () => {
    createPost.mockResolvedValue({
      post_id: 1,
      user_id: 1,
      title: 'Test Post',
      content: 'Test Content'
    });

    const res = await request(app)
      .post('/posts')
      .send({ title: 'Test Post', content: 'Test Content' });

    expect(res.statusCode).toEqual(201);
    expect(res.body.post).toHaveProperty('post_id');
    expect(createPost).toHaveBeenCalledWith(1, 'Test Post', 'Test Content');
  });

  // Test deletePost
  it('should delete a post', async () => {
    findPostById.mockResolvedValue({
      post_id: 1,
      user_id: 1,
      title: 'Test Post',
      content: 'Test Content'
    });

    deletePostById.mockResolvedValue();

    const res = await request(app)
      .delete('/posts/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Post deleted successfully');
    expect(deletePostById).toHaveBeenCalledWith('1');
  });

  // Test addComment
  it('should add a comment to a post', async () => {
    findPostById.mockResolvedValue({
      post_id: 1,
      user_id: 1,
      title: 'Test Post',
      content: 'Test Content'
    });

    addCommentToPost.mockResolvedValue({
      comment_id: 1,
      post_id: 1,
      user_id: 1,
      comment: 'This is a test comment'
    });

    const res = await request(app)
      .post('/posts/1/comments')
      .send({ comment: 'This
