const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description: 'API documentation generated with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3003', // Update with your server URL
        description: 'Development server',
      },
    ],
  },
  apis: ['./controllers/*.js'], // Path to the API routes and controllers folder
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = {
  swaggerOptions,
  swaggerSpec,
};

