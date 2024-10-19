const db = require('../config/db'); // database config

// Create a new post
const createPost = async (userId, title, content) => {
  const query = 'INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3) RETURNING *';
  const values = [userId, title, content];
  const result = await db.query(query, values);
  return result.rows[0];
};

// Find post by ID
const findPostById = async (postId) => {
  const query = 'SELECT * FROM posts WHERE post_id = $1';
  const result = await db.query(query, [postId]);
  return result.rows[0];
};

const getAllPosts = async () => {
  const query = 'SELECT * FROM posts ORDER BY created_at DESC'; 
  const result = await db.query(query);
  return result.rows;
};

// Delete post by ID
const deletePostById = async (postId) => {
  const query = 'DELETE FROM posts WHERE post_id = $1';
  await db.query(query, [postId]);
};

// Add comment to post
const addCommentToPost = async (postId, userId, comment) => {
  const query = 'INSERT INTO comments (post_id, user_id, comment) VALUES ($1, $2, $3) RETURNING *';
  const values = [postId, userId, comment];
  const result = await db.query(query, values);
  return result.rows[0];
};

// Delete comment from post
const deleteCommentFromPost = async (postId, commentId, userId) => {
  const query = 'DELETE FROM comments WHERE comment_id = $1 AND post_id = $2 AND user_id = $3 RETURNING *';
  const values = [commentId, postId, userId];
  const result = await db.query(query, values);
  return result.rowCount > 0;
};

module.exports = {
  createPost,
  findPostById,
  getAllPosts,
  deletePostById,
  addCommentToPost,
  deleteCommentFromPost
};
