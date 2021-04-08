// Import dependencies
const express = require('express')
const { graphqlHTTP } = require('express-graphql')

// TODO: Bring in our domain-specific logic, ie. our schema and resolvers

// Initialize a new express app
const app = express()

// TODO: Write our application code!
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
