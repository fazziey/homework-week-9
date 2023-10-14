const express = require("express");
const pool = require("./query.js");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Homework week 9 Fazzy",
      version: "1.0.0",
      description: "Homework Restful API & middleware",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./router/*"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(morgan("common"));
// app.use(express.json());
app.use(bodyParser.json());

pool.connect((err, res) => {
  console.log("connected");
});

const movies = require("./router/movies.js");
const users = require("./router/users.js");
const router = require("./router/users.js");

app.use("/film", movies);
app.use("/users", users);

app.listen(3000);
