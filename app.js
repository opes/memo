// Import dependencies
const express = require('express')
const { graphqlHTTP } = require('express-graphql')

// Bring in our domain-specific logic, ie. our schema and resolvers
const schema = require('./lib/schema')
const resolvers = require('./lib/resolvers')

// Initialize a new express app
const app = express()

// Add our express-graphql middleware to the /graphql endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
)

// Export it for use in our server & tests
module.exports = app
