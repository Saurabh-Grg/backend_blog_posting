const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const sequelize = require('./config/db');
const login = require('./routes/login');
const blogRoutes = require('./routes/blogRoutes');


const app = express(); 

app.use(express.json());


app.use('/api/auth', login);
app.use('/api/blog', blogRoutes);


// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog Posting API',
      version: '1.0.0',
      description: 'API documentation for the Blog Posting application',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: 'http://localhost:3000', // Adjust this URL as needed
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to your route files
// apis: ['./index.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Set up Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});