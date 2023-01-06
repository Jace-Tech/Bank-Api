import { Express } from 'express';
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

export default (app: Express) => {
  const options = {
    definition: {
      openapi: "3.1.0",
      swagger: "2.0",
      info: {
        title: "BANK API",
        version: "1.0.0",
        description:
          "BANK API documentation",
        license: {
          name: "MIT",
        },
        contact: {
          name: "Chidindu Emmanuel Aneke [JACE]",
          url: "https://github.com/Jace-Tech",
          email: "jacedev151@gmail.com",
        },
      },
      servers: [
        {
          url: "http://localhost:5000",
        },
      ],
    },
    apis: ["src/models/*.ts", "build/models/*js"],
  };

  const specs = swaggerJsdoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  return app;
}