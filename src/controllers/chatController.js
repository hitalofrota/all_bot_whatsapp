const { getClient } = require('../services/venomService');
const { askChatGPT } = require('../services/chatService');

async function chatBot(req, res) {
  try {
    const { from, message } = req.body;

    if (!from || !message) {
      return res.status(400).json({ error: "O número e a mensagem são obrigatórios!" });
    }

    const client = getClient();
    const response = await askChatGPT(message);

    await client.sendText(`${from}@c.us`, response);
    res.json({ success: true, response });

  } catch (error) {
    console.error("Erro no chatbot:", error);
    res.status(500).json({ error: "Erro no chatbot." });
  }
}

module.exports = { chatBot };
