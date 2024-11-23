// swagger/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hotel Management API',
            version: '1.0.0',
            description: 'API для управління готелем'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Локальний сервер'
            }
        ]
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
