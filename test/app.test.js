// Import dependencies
const request = require('supertest')

// Import our application code
const app = require('../app')

// Import the data we want to test against
const messagesDb = require('../db/messages')

describe('/graphql', () => {
  it('should return a list of messages', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query:
          'query { messages { author { first_name }, recipient { first_name }, content } }',
      })
      .expect(200)

    const { messages } = res.body.data
    expect(messages.length).toEqual(messagesDb.length)
    expect(messages[0].recipient.first_name).toEqual('Frodo')
    expect(messages[0].author.first_name).toEqual('Bilbo')
  })

  it('should return messages for the specified recipient/sender', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query:
          'query { messages(recipient: {first_name: "Frodo"}, author: {first_name: "Bilbo"}) { to, from, content } }',
      })
      .expect(200)

    const { messages } = res.body.data
    expect(messages[0].recipient.first_name).toEqual('Bilbo')
  })
})
