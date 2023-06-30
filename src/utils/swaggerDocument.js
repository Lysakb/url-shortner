const { BASE_URL } = require("../config/env");

const swaggerDefinition = {
  swaggerDefinition: {
    info: {
      title: "API Docs",
      version: "1.0.0",
      description: "API Documentation",
    },
    host: BASE_URL,
    basePath: "/",
    tags: [
      {
        name: "URL SHORTNER",
        description: "API for shortening long URLs",
      },
    ],
    schemes: ["https"],
  },
  apis: ["src/docs/swagger.js"],
};

module.exports = swaggerDefinition;
