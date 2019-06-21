const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const homes = []

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    // schema (schemas and their types and type definitions)
    // type definition is how the home will look like
    schema: buildSchema(`
        type Home{
            _id: ID!
            name: String!
            homeType: String!
            price: Float!
            datePosted: String!
        }

        input HomeInput {
            name: String!
            homeType: String!
            price: Float!
            datePosted: String!
        }
    
        type rootQuery{
            homes: [Home!]!
        }
        type rootMutation{
            addHome(homeInput: HomeInput): Home
        }

        schema{
            query: rootQuery
            mutation: rootMutation
        }
    `),

    // resolvers (and should have the same name as their type definition)
    rootValue: {
        homes: () => {
            return homes;
        },
        addHome: (args) =>{
            const newHome = {
                _id: Math.random().toString(),
                name: args.homeInput.name,
                homeType: args.homeInput.homeType,
                price: +args.homeInput.price,
                datePosted: args.homeInput.date,
            };
            homes.push(newHome);
            return newHome;
        }
    },
    graphiql: true
}));

app.listen(3001);