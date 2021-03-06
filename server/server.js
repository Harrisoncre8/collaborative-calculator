// requires
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
// declare empty array in order to spread
let calcLog = []; 

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Set static folder
app.use( express.static('client') );

io.on('connection', socket => {
  // an alternative to sessions, socket is 
  // always emitting the calculation log array to client
  socket.emit('calcLog', calcLog);
  // listen for calculation
  socket.on('calculation', calculation => {
    // once we catch calculation object, emit it back
    // to all users on client side as array using spread operator
    // only display top 10 calculations
    calcLog = [calculation, ...calcLog.slice(0, 9)];
    io.emit('calcLog', calcLog);
  })
});

