const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Controle de Café - TCE AL',
      version: '1.0.0',
      description: 'Documentação da API',
    },
  },
  apis: ['./controllers/*.js'], // Caminho dos seus arquivos de controle
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
