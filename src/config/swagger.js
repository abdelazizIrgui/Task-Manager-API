import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description: "REST API for managing users and tasks"
    },

    servers: [
      {
        url: "http://localhost:7000",
        description: "Development server"
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },

  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;