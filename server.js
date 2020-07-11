require('dotenv').config();
const http = require('http');
const app = require('./app');
// const debug=require('debug')('node-angular');

// MongoConnectionURL="mongodb://localhost:27017/TrackersDb" copied from .env file for safety
// const port = process.env.PORT || 3000;
// const server = http.createServer((req, res) => {
//   res.end('This is me');
// });

// request and response serama handle wenne express haraha nisa server eka hadanawa express framework eka yodaagaththa app kiyana variable eken
require('./secuirity/prod')(app);       // preparing for production
const server = http.createServer(app);
var io = app.io;
io.attach(server);

server.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(process.env.PORT + " server error");
  } else {
    console.log(process.env.PORT + " server up and running");
  }
});


module.exports.io = io;
