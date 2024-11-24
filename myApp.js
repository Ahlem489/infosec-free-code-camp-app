const express = require('express');
const helmet = require('helmet');

const app = express();

// Apply helmet middleware
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));

// Export the app before server setup for test compatibility
module.exports = app;

// Set up routes and server
const api = require('./server.js');
app.use('/_api', api);
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}