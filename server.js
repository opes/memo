// Import our application code, set the port to listen on
const app = require('./app')
const port = 3000

// Start the server on the specified port
app.listen(port, () =>
  console.log(`Server started on https://localhost:${port}/`)
)
