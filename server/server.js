const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const messageController = require('./messages/messageController');

app.use(bodyParser.json());

app.use(function(req, res, next) {
  if (req.url !== '/messages' || req.url !== 'GET') {
    console.log(req.url + ':', req.headers.referer);
  }
  next();
});

app.use(express.static(path.join(__dirname, '../client')));

app.get('/messages', messageController.getMessages);

app.post('/messages', messageController.postMessage);

app.get('*', function(req, res) {
  console.log('caught:', req.url);
  res.writeHead(404, {'Content-Type': 'text/html'});
  res.end();
});

app.listen(3000, function() {
	console.log("Listening on port 3000");
});
