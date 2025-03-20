const venom = require('venom-bot');
const venomConfig = require('../config/venomConfig');

let clientInstance = null;

async function initializeVenom() {
  try {
    clientInstance = await venom.create(venomConfig);
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
