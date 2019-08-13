const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQLSchema = require('./graphql/schema/index');
const rootResolver = require('./graphql/resolvers/index');
const isAuth = require('./middleware/isAuth');

const app = express();

// const homes = []

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	if (req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}
	next();
});

app.use(isAuth);

app.use(
	'/graphql',
	graphqlHttp({
		// schema (schemas and their types and type definitions)
		// type definition is how the home will look like
		schema: graphQLSchema,

		// resolvers (and should have the same name as their type definition)
		rootValue: rootResolver,
		graphiql: true
	})
);

mongoose
	.connect(
		`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-fhwxu.mongodb.net/${process.env
			.MONGO_DB}?retryWrites=true&w=majority`,
		{ useNewUrlParser: true }
	)
	.then(() => {
		// console.log('connected')
		app.listen(3001);
	})
	.catch((err) => {
		throw err;
	});
