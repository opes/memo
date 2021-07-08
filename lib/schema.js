// We need to use the `buildSchema` method of
// graphql to create a schema object specific to
// our application
const { buildSchema } = require('graphql')

// TODO: Write our schema!
const schema = buildSchema(`
  type Contact {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
  }

  """
  A body of text sent from one being of middle earth to another
  """
  type Message {
    id: ID!
    "The user who sent the message"
    author: Contact!
    "The user who received the message"
    recipient: Contact!
    "The body of the message"
    content: String
  }

  type Query {
    messages: [Message!]!
    contacts(first_name: String): [Contact!]!
  }
`)

module.exports = schema
