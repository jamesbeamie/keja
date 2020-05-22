const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");

const graphQLSchema = require("./graphql/schema/index");
const rootResolver = require("./graphql/resolvers/index");
const isAuth = require("./middleware/isAuth");
require("dotenv/config");

const app = express();

// const homes = []

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use(
  "/graphql",
  graphqlHttp({
    // schema (schemas and their types and type definitions)
    // type definition is how the home will look like
    schema: graphQLSchema,

    // resolvers (and should have the same name as their type definition)
    rootValue: rootResolver,
    graphiql: true,
  })
);

mongoose
  .connect(`${process.env.LOCAL_DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected: server running on port 3001");
    app.listen(`${process.env.PORT}` || 3001);
  })
  .catch((err) => {
    console.log("Problem running the server");
    throw err;
  });
