import express from 'express';
import http from 'http';

import db from './database.js';

const app = express();

app.get('/getAllPosts', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(await db.getAllPosts());
});

app.get('/getAllApprovedPosts', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(await db.getAllApprovedPosts());
});

app.get('/getProfile', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(await db.getProfile());
});

app.post('/postNewPost', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(await db.postNewPost(req.body.body));
});

app.post('/approvePost', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(await db.approvePost(req.body.postId));
});

http.createServer(app).listen(5000);
