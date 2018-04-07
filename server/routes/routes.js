const bcrypt = require("bcrypt");
const { generateToken } = require("../utils");

module.exports = (app, passport, db) => {
  app.post("/login", (request, response) => {
    let inputDetails = request.body;
    // console.log(inputDetails);
    let inputEmail = [inputDetails.email];
    let inputPW = inputDetails.password;
    let sql = "SELECT * from admin where email = $1";
    db.query(sql, inputEmail, (error, queryResult) => {
      if (error) {
        throw error;
      }
      if (queryResult.rows.length < 1) {
        console.log("Email invalid");
        response.send({
          error: "email"
        });
      } else {
        let user = queryResult.rows[0];
        let hashedPW = user.password;
        bcrypt.compare(inputPW, hashedPW).then(result => {
          if (result) {
            let token = generateToken(user);

            // return a json with token if authenticate successfully
            response.json({
              firstName: user.firstname,
              lastName: user.lastname,
              email: user.email,
              token: token
            });
          } else {
            response.send({
              error: "password"
            });
          }
        });
      }
    });
  });

  app.get("/login", (request, response) => {
    response.send("test");
  });

  app.post("/athlete", (request, response) => {
    let { firstname, lastname, dob, gender } = request.body;
    console.log("input details below");
    console.log(request.body);
    let sql =
      "INSERT into athletes (firstname, lastname, gender, dob) values ($1, $2, $3, $4)";
    let values = [firstname, lastname, gender, dob];
    db.query(sql, values, (error, queryResult) => {
      if (error) {
        console.log(error.stack);
      } else {
        response.send("Athlete successfully added");
      }
    });
  });

  app.get("/athlete", (request, response) => {
    let sql =
      "SELECT id, firstname, lastname, to_char(dob, 'YYYY-MM-DD') as dob, gender from athletes";
    db.query(sql, (error, queryResult) => {
      if (error) {
        console.log(error.stack);
      } else {
        response.send(queryResult.rows);
      }
    });
  });

  app.get("/athlete/:id", (request, response) => {
    let sql =
      "SELECT id, firstname, lastname, to_char(dob, 'YYYY-MM-DD') as dob, gender from athletes where id = $1";
    let { id } = request.params;
    db.query(sql, [id], (error, queryResult) => {
      if (error) {
        console.log(error.stack);
      } else {
        response.send(queryResult.rows);
      }
    });
  });

  app.post("/athlete/:id/update", (request, response) => {
    let sql =
      "UPDATE athletes set firstname = $1, lastname = $2, dob = $3, gender = $4 where id = $5";
    let { firstname, lastname, dob, gender } = request.body;
    let { id } = request.params;
    let values = [firstname, lastname, dob, gender, id];
    console.log(values);
    // console.log(body);
    console.log(id);
    db.query(sql, values, (error, queryResult) => {
      if (error) {
        console.log(error.stack);
      } else {
        console.log("Successfully updated athlete");
        response.send("Successfully updated athlete");
      }
    });
  });
};
