const { getClient } = require('../services/venomService');

async function sendMessage(req, res) {
  try {
    const { to, message } = req.body;
    if (!to || !message) {
      return res.status(400).json({ error: "O número e a mensagem são obrigatórios!" });
    }

    const client = getClient();
    await client.sendText(`${to}@c.us`, message);
    res.json({ success: true, message: "Mensagem enviada com sucesso!" });

  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    res.status(500).json({ error: "Erro ao enviar mensagem." });
  }
}

module.exports = { sendMessage };
