import SwaggerUi from "swagger-ui-express";
import SwaggerJsDocs from "swagger-jsdoc";
import { Router } from "express";
import { PORT } from "./config.js";

const router = Router();

const SwaggerDoc = SwaggerJsDocs({
  swaggerDefinition: {
    openapi: "3.0.0",
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Post app api",
      },
    ],
    info: {
      version: "1.0.0",
      title: "Post app",
      description: "Posts app information",
    },
    components: {
      securitySchemes: {
        Bearer: {
          type: "apiKey",
          in: "header",
          name: "token",
        },
      },
    },
  },
  apis: [
    `${process.cwd()}/src/swagger/components/*.yaml`,
    `${process.cwd()}/src/swagger/docs/*.yaml`,
  ],
});

router.use(SwaggerUi.serve, SwaggerUi.setup(SwaggerDoc));

export default router;
