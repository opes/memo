# MEMO: Middle Earth Message Orchestrator
Our app is a simple one called MEMO. It's the number one app in Middle Earth for sending text messages to your friends (and foes?). Sending a message via MEMO is a lot faster than communicating via raven or rider on horseback, since it's powered by magic. But even still, magic is somehow beholden to network latency.

Because of this, one issue with our app is the sluggish user experience. While the front end of the app is built to be as responsive as possible, it gets bottlenecked by the numerous API calls to the backend for fetching messages and retrieving contacts. This is exacerbated by the fact that some areas of Middle Earth don't have the greatest network coverage. To help reduce the number of network calls we're making, we've been tasked with converting the existing REST API to use GraphQL.

While we *could* wrap our existing REST API in a single GraphQL endpoint to reduce the number of network calls from the client, that would mean that we've just shifted the calls to our backend. Instead, we want to access our data directly and eliminate the intermediate step of additional network calls.

It should be noted, however, that some companies do choose to initially wrap their REST API in GraphQL when first adopting it. With GraphQL, the resolvers are indifferent to the internal mechanisms of how you're accessing your data. Resolvers are powerful in that they leverage Promises, so you could write a resolver that accesses and returns data from an external API using `node-fetch`, retrieves data directly from Postgres using `pg`, gets & sets values using `redis`, or even reads & writes to the local filesystem using `fs`. You are not limited in *how* you access/store your data, the only requirement is that you return some JSON representation of it for the resolver to send back to the client.


## Learning Objectives
* Understand the core concepts that make up GraphQL
* Write a schema that defines our data & queries
  * Write a query that returns a list of all the messages
  * Write a query that returns a list of messages for a given recipient
  * Write a query that returns a list of messages for a given author
  * Write a mutation for creating a new message
  * Write a mutation for deleting a message
* Write the resolvers (functions) that are executed with each associated query


## Explanation of Dependencies

It uses the following core dependencies:
* `express` to create an Express app
* `express-graphql` to setup the Express middleware for GraphQL
* `graphql` for writing the schema to model the domain specific data for the app

To help run & test the app in development, it uses:
* `nodemon` for running the server locally and restarting on file changes
* `jest` for running tests & validating assertions
* `supertest` for sending the necessary `POST` requests to our `/graphql` endpoint.

## Explanation of the File Structure

The app is composed of the following directories & files, with additional descriptions of each for added clarity:
```bash
├── db # where the data we're retrieving is stored
│   ├── contacts.js # a static dataset consisting of a list of `contacts`
│   └── messages.js # a static dataset consisting of a list of `messages`
├── lib # our main GraphQL-specific application logic
│   ├── resolvers.js # the functions that will be called when we execute a query/mutation against our `/graphql` endpoint
│   └── schema.js # the schema that defines how our data looks, how it can be queried & transformed, and the associated documentation
├── node_modules # the node dependencies for our app
├── test # where our tests belong
|   └── app.test.js # the test file for our main express application
├── README.md # you are here
├── app.js # our main express application
├── package-lock.json # the lockfile for our project
├── package.json # the npm file that defines our project's configuration and dependencies
└── server.js # the server entrypoint that runs our express application
```

## Requirements
In its current form, our app sets up an HTTP server that runs a GraphQL endpoint on `http://localhost:3000/graphql`. But some important parts are missing!

We need to write the `schema` that defines our data and the queries we want to run.

After we've modeled the `schema`, we need to write the logic that is associated to each query. These are our `resolvers`.

So let's take a step-by-step approach for doing just that.

1. First, we'll want to look at our data and think about how we want to return it to the client.
    * For instance, our `messages` contain a string ID representation for each `author` & `recipient`. Those IDs reference a record in `contacts`. We want to provide the associated `contact` record for a given ID, rather than requiring the client to make an additional network call to fetch it.
    * Hint: Our tests define a couple example queries we can use as a starting point.
1. Once we've gotten a grasp of how the data is going to be used, we can then write schema that maps to different types of objects and the queries we'll be using to access them.
1. Once we've defined our schema, we'll write tests for each of the new queries we've added.
    * Note that the tests will fail initially until we write the corresponding resolvers.
1. After we've built out our schema & tests, we then need to write the functions that will execute when we run our queries.
    * Remember, a schema serves as a way to define the types of objects and queries we're providing. The queries merely tell us what inputs and outputs we can expect, but they don't actually perform any operations. That's the work of the `resolvers`.
1. Once our resolvers are built, our tests should turn from red to green, then...
1. ...Profit!

## Next Steps
Right now, our `messages` and `contacts` are just hardcoded arrays of data. That's not really going to be useful in a real-middle-earth application. So you can start your journey by adding a database backend to store our messages and contacts.

Other things to consider exploring:

* Creating a "contact book" for adding/updating/deleting contacts for a given user
* Creating a resolver that fetches data from an API (perhaps https://the-one-api.dev/?) 
* Adding the [GraphQL Playground](https://www.npmjs.com/package/graphql-playground-middleware-express)
* Installing the [GraphQL VS Code Extension](https://github.com/graphql/vscode-graphql)
* Learning about the [different types](https://graphql.org/learn/schema/#type-language) available in the GraphQL Schema Definition Language and using them in MEMO (perhaps an `enum` type for `HOBBIT`, `HUMAN`, `ELF`, `WIZARD`?)
