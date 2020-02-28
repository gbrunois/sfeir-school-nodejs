const packageJson = require("../package.json");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const definition = {
  info: {
    title: "Schools API",
    version: packageJson.version,
    description: "The awesome schools API"
  }
};

const options = {
  definition,
  apis: ["./**/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

function registerSwaggerRoutes(app) {
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = registerSwaggerRoutes;
