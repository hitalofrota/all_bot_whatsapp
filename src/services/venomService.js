const venom = require('venom-bot');
const venomConfig = require('../config/venomConfig');

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
