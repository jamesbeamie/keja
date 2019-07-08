const { buildSchema } = require('graphql');
const graphQLSchema = buildSchema(`
type Booking {
    home: Home!
    user: User!
}

type Home{
    _id: ID!
    name: String!
    homeType: String!
    price: Float!
    creator: User!
}

type User{
    _id: ID!
    userName: String!
    email: String!
    password: String
    createdHomes: [Home!]
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
    bookings: [Booking!]!
}
type rootMutation{
    addHome(homeInput: HomeInput): Home
    createUser(userInput: UserInput): User
    bookHome(homeId: ID!): Booking!
    cancelBooking(bookingId: ID!): Home!
}

schema{
    query: rootQuery
    mutation: rootMutation
}
`)
module.exports = graphQLSchema;