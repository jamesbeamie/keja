const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    // schema (schemas and their type definitions)
    schema: buildSchema(`
    
        type rootQuery{
            homes: [String!]!
        }
        type rootMutation{
            addHome(name: String): String
        }

        schema{
            query: rootQuery
            mutation: rootMutation
        }
    `),

    // resolvers (and should have the same name as their type definition)
    rootValue: {
        homes: () => {
            return ['Qwetu', 'Grace']
        },
        addHome: (args) =>{
            const homeName = args.name
            return homeName;
        }
    },
    graphiql: true
}));

app.listen(3001);