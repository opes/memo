const contacts = require('../db/contacts')
const messages = require('../db/messages')
// TODO: Create resolver functions for our schema
const resolvers = {
  messages: () => {
    return messages.map((message) => {
      const author = contacts.find(({ id }) => message.author === id)
      const recipient = contacts.find(({ id }) => message.recipient === id)
      return { ...message, author, recipient }
    })
  },
  contacts: ({ first_name }) => {
    return contacts.filter(
      (contact) => !first_name || contact.first_name === first_name
    )
  },
}

module.exports = resolvers
