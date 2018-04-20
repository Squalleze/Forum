import https from 'https';
import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import MySQLConnection from './lib/mysql';

// DELETE
import delete$token from './api/delete-token';
// GET
import get$user_me from './api/get-users.me';
import get$sections from './api/get-sections';
import get$section from './api/get-section';
// PATCH
// POST
import post$register from './api/post-register';
import post$token from './api/post-token';
// UPDATE

import { ERR_INTERNAL } from './lib/const.mjs';

const db = new MySQLConnection({
  host: 'localhost',
  user: 'root',
  password: 'abc123',
  database: 'forum',
  supportBigNumbers: true,
});

const app = express();
const server = https.createServer({
  key: fs.readFileSync('./server/key.pem'),
  cert: fs.readFileSync('./server/cert.pem'),
  passphrase: 'potato',
}, app);

db.connect();

const html = name => `<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Document</title></head><body><div id="root"></div><script src="/assets/js/${ name }.js"></script></body></html>`;
const page = (name) => (req, res) => res.end(html(name));

const context = { app, db };

express.response.error = function(error) {
  if (error instanceof Error) {
    this.status(500).json(ERR_INTERNAL).end();
    console.error(error);
  } else {
    if (error.code) this.status(error.code);
    this.json(error).end();
  }
}

app.use(bodyParser.json());

// Pages
app.get('/blog', page('blog'));
app.get('/forum', page('forum'));
app.get('/', page('index'));
app.get('/newtopic', page('newtopic'));
app.get('/profile/:name', page('profile'));
app.get('/register', page('register'));
app.get('/section', page('section'));
app.get('/signin', page('signin'));
app.get('/topic', page('topic'));

// ASSETS
app.use('/assets', express.static('./client/dist/assets'));

// API
app.post('/api/register', post$register.bind(context));
app.post('/api/token', post$token.bind(context));
app.delete('/api/token', delete$token.bind(context));
app.get('/api/users/@me', get$user_me.bind(context));

app.get('/api/sections', get$sections.bind(context));
app.get('/api/section', get$section.bind(context));


server.listen(3000);