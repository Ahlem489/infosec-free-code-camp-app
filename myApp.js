const express = require('express');
const helmet = require('helmet');
const app = express();
const bcrypt = require('bcrypt');
app.use(helmet())
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
const time = 90*24*60*60;
app.use(helmet.hsts({maxAge: time, force: true}));
app.use(helmet.dnsPrefetchControl());
const nocache = require('nocache');
app.use(nocache());
app.use(helmet.noCache());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", 'trusted-cdn.com']
  }
}));

module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🥦Useful Programmer Info Security App Started on Port ${port}`);
});
