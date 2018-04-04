const express = require('express');
const session = require('express-session');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./server/db/index');

// initialize express app
const app = express();

// middlewares setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(methodOverride("_method"));
app.use(
  methodOverride(function(req) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.use(session({
  secret: 'secret',
  saveUnitialized: true,
  resave: true
}));

require('./server/config/passport')(passport, db);
require('./server/routes/routes')(app, passport, db);

const PORT = process.env.port || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});

server.on('close', () => {
  console.log("Express server closed");
});


/*---------------------------------------------*/
// const express = require("express");
// const passport = require("passport");
// const winston = require("winston");
// const db = require("./server/db");

// const port = process.env.PORT || 9000;
// const app = express();

// require("./server/config/passport")(passport, db);
// require("./server/config/express")(app, passport, db.pool);
// require("./server/config/routes")(app, passport, db);

// const server = app.listen(port, () => {
//   if (app.get("env") === "test") return;

//   winston.log("Express app started on port " + port);
// });

// server.on("close", () => {
//   winston.log("Closed express server");

//   db.pool.end(() => {
//     winston.log("Shut down connection pool");
//   });
// });