const express = require('express');
const { chatBot } = require('../controllers/chatController');

const router = express.Router();

router.post('/chat', chatBot);

module.exports = router;
