const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Home = require('./models/home');
const User = require('./models/user');

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

        type User{
            _id: ID!
            userName: String!
            email: String!
            password: String

        }

        input UserInput{
            userName: String!
            email: String!
            password: String!
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
            createUser(userInput: UserInput): User
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
                creator: '5d1365511a7f9a26c3992a74'
            });
            let createdHome;
            // homes.push(newHome);
            return newHome
            .save()
            .then(res => {
                createdHome = {...res._doc};
                return User.findById('5d1365511a7f9a26c3992a74')
                // console.log(res)
                // return {...res._doc};
            })
            .then(user => {
                if (!user){
                    throw new Error('User does not exist .')
                }
                user.createdHomes.push(newHome);
                return user.save();
            })
            .then(res => {
                // console.log(res)
                return createdHome
            })
            .catch(err =>{
                console.log(err)
                throw err;
            });
            // return newHome;
        },
        createUser: args => {
            return User.findOne({ email: args.userInput.email})
            .then(user => {
                if (user){
                    throw new Error('User exists.')
                }
                return bcrypt
                .hash(args.userInput.password, 12)
            })
            .then(hashedPwd => {
                const user = new User ({
                    userName: args.userInput.userName,
                    email: args.userInput.email,
                    password: hashedPwd 
                });
                return user.save();
            })
            .then(result => {
                return {...result._doc, password: null};
            })
            .catch(err => {
                throw err;
            });
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
