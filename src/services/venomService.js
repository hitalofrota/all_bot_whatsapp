const venom = require('venom-bot');
const venomConfig = require('../config/venomConfig');
const { askChatGPT } = require('./chatService');

let clientInstance = null;

async function initializeVenom() {
  try {
    console.log("🔄 Verificando sessão existente...");

    clientInstance = await venom.create({
      session: venomConfig.session,
      multidevice: venomConfig.multidevice,
      headless: venomConfig.headless,
      browserPath: venomConfig.browserPath,
      executablePath: venomConfig.executablePath,
      disableWelcome: venomConfig.disableWelcome,
      logQR: venomConfig.logQR,
      sessionPath: venomConfig.sessionPath,
      autoClose: venomConfig.autoClose,
      args: venomConfig.args
    });

    console.log("✅ Venom iniciado com sucesso!");

    clientInstance.onMessage(async (message) => {
      console.log("📩 Mensagem recebida:", message.body);

      if (!message.body || message.isGroupMsg) {
        console.log("⏩ Mensagem ignorada (vazia ou em grupo)");
        return;
      }

      try {
        console.log("🧠 Enviando mensagem para ChatGPT...");
        const resposta = await askChatGPT(message.body);
        console.log("💬 Resposta do ChatGPT:", resposta);

        await clientInstance.sendText(message.from, resposta);
        console.log("✅ Mensagem enviada para o usuário.");
      } catch (error) {
        console.error("❌ Erro ao processar mensagem:", error);
      }
    });

    return clientInstance;
  } catch (error) {
    console.error("❌ Erro ao iniciar Venom:", error);
    throw error;
  }
}

function getClient() {
  if (!clientInstance) {
    throw new Error("O Venom ainda não foi inicializado!");
  }
  return clientInstance;
}

module.exports = { initializeVenom, getClient };
