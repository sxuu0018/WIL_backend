import express from 'express';
import http from 'http';

import db from './database.js';

const app = express();

http.createServer(app).listen(3000);
