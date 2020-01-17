const express = require('express');
const socket_io = require('socket.io');
const body_parser = require('body-parser');
const io = socket_io();
const app = express();

app.io = io;

const socket = require('./connection/SocketConnection')(io);
const v1Routes = require('./api/v1.0.0/routes/v1_routes');
const database = require('./connection/DBConnection');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.use(body_parser.urlencoded({
  extended: false,
  limit: '50mb'
}));
app.use(body_parser.json({
  limit: '50mb'
}));


// routes walamul kotasa ena heti
app.use('/api/v1.0.0', v1Routes);

// Global ERROR HANDLER start
app.use((req, res, next) => {
  // next eken thamai eelanga middleware ekata call karanne
  // res.send('from express server bro!!!');
  const error = new Error('Routes hariyata daanna sudu mahaththayaa... Server ekata mukuth karanna bee oyaata... :-)');
  error.status = 500;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// Global ERROR HANDLER end

database.createDBConnection();
socket.createConnection();
module.exports = app;
