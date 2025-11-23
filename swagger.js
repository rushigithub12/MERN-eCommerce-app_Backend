const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce API",
      version: "1.0.0",
      description: "API documentation for the e-commerce backend",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },

  // Path to your API routes where Swagger comments exist
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log("📘 Swagger Docs available at: http://localhost:8080/api-docs");
}

module.exports = swaggerDocs;
