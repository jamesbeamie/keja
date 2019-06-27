const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const Home = require('./models/home');
const User = require('./models/user');
const graphQLSchema = require('./graphql/schema/index');
const graphQLresolver = require('./graphql/resolvers/index');

const app = express();

// const homes = []

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    // schema (schemas and their types and type definitions)
    // type definition is how the home will look like
    schema: graphQLSchema,

    // resolvers (and should have the same name as their type definition)
    rootValue: graphQLresolver,
    graphiql: true
}));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-fhwxu.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
.then(() =>{
    // console.log('connected')
    app.listen(3001);
})
.catch(err =>{
    throw err;
})
