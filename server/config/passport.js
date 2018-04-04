const bcrypt = require("bcrypt");
const winston = require("winston");
const LocalStrategy = require("passport-local").Strategy;
const pg = require('pg');

const dbConfig = {
  user: "jianhaotan",
  host: "127.0.0.1",
  database: "lsod",
  port: 5432
};

const pool = new pg.Pool(dbConfig);
pool.on("error", function(err) {
  winston.error("idle client error", err.message, err.stack);
});

module.exports = (passport, db) => {
  passport.use(
    new LocalStrategy({usernameField:"email", passwordField:"password", passReqToCallback: true}, (username, password, done) => {
      console.log('sending to local strategy');
      console.log(username.body.email);
      let inputEmail = username.body.email;
      let inputPW = username.body.password;
      pool.query(
        "SELECT * FROM admin WHERE email = $1",
        [inputEmail],
        (err, result) => {
          if (err) {
            winston.error("Error when selecting user on login", err);
            console.log(err);
            // return cb(err);
          }

          if (result.rows.length > 0) {
            const first = result.rows[0];
            bcrypt.compare(inputPW, first.password, function(err, res) {
              if (res) {
                console.log(res);
                return done(null, {
                  id: first.id,
                  email: first.email,
                });
              } else {
                return done(null, false);
              }
            });
          } 
          else {
            return done(null, false);
          }
        }
      );
    })
  );

  passport.serializeUser((user, done) => {
    console.log('passport serialize');
    done(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    console.log('passport deserialize');
    db.query(
      "SELECT * FROM users WHERE id = $1",
      [parseInt(id, 10)],
      (err, results) => {
        if (err) {
          winston.error(
            "Error when selecting user on session deserialize",
            err
          );
          return cb(err);
        }

        cb(null, results.rows[0]);
      }
    );
  });
};
