const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Home = require('./models/home');

const app = express();

// const homes = []

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
        }

        input HomeInput {
            name: String!
            homeType: String!
            price: Float!
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
            return Home.find()
            .then(homes => {
                return homes.map(home => {
                    return {...home._doc};
                });
            })
            .catch(err => {
                throw err;
            });
        },
        addHome: (args) =>{
            const newHome = new Home({
                name: args.homeInput.name,
                homeType: args.homeInput.homeType,
                price: +args.homeInput.price,
                // datePosted: new Date(args.homeInput.date)
            });
            // homes.push(newHome);
            return newHome
            .save()
            .then(res => {
                console.log(res)
                return {...res._doc};
            })
            .catch(err =>{
                console.log(err)
                throw err;
            });
            // return newHome;
        }
    },
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
