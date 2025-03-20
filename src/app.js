const express = require('express');
const messageRoutes = require('./routes/messageRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
app.use(express.json());

app.use('/api', messageRoutes);
app.use('/api', chatRoutes);

module.exports = app;
