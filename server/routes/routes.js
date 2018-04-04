const bcrypt = require('bcrypt');
const { generateToken } = require('../utils'); 

module.exports = (app, passport, db) => {
  // app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login'}), (request, response) => {
  //   // const{ user } = req;
  //   // console.log(req.body);
  //   response.send('test');
  // });

  app.post('/login', (request, response) => {
    let inputDetails = request.body;
    console.log(inputDetails);
    let inputEmail = [inputDetails.email];
    let inputPW = inputDetails.password;
    let queryString = 'SELECT * from admin where email = $1';
    db.query(queryString, inputEmail, (error, queryResult) => {
      if (error) {
        throw error;
      }
      if (queryResult.rows.length < 1) {
        console.log('Email invalid');
        response.send({
          error: 'email'
        });
      }
      else {
        let user = queryResult.rows[0];
        let hashedPW = user.password;
        bcrypt.compare(inputPW, hashedPW)
        .then(result => {
          if (result) {
            let token = generateToken(user);
            
            // return a json with token if authenticate successfully 
            response.json({
              firstName: user.firstname,
              lastName: user.lastname,
              email: user.email,
              token: token
            });
          }
          else {
            response.send({
              error: 'password'
            });
          }
        });
      }
    });
  });

  app.get('/login', (request, response) => {
    response.send('test');
  });
}