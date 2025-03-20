require('dotenv').config();
const app = require('./app');
const { initializeVenom } = require('./services/venomService');

const PORT = process.env.PORT || 3005;

initializeVenom()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 API rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Falha ao iniciar a API:", error);
  });
