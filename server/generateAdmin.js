const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

const result = dotenv.config();

// console.log(result);

const dbConfigs = {
  user: process.env.db_user,
  host: process.env.db_host,
  database: process.env.db_database,
  port: process.env.db_port
};

// console.log(dbConfigs);

const pool = new Pool(dbConfigs);




// console.log(process.env.admin_pkr_email);

let {admin_pkr_email, admin_pkr_pw, admin_twq_email, admin_twq_pw, admin_ckm_email, admin_ckm_pw, admin_fitz_email, admin_fitz_pw, admin_tjh_email, admin_tjh_pw} = process.env;

// console.log(admin_pkr_email);

const admins = [
  [admin_pkr_email, admin_pkr_pw],
  [admin_twq_email, admin_twq_pw],
  [admin_ckm_email, admin_ckm_pw],
  [admin_fitz_email, admin_fitz_pw],
  [admin_tjh_email, admin_tjh_pw]
];

admins.forEach(admin => {
  let queryString = "INSERT into admin (email, password) VALUES ($1, $2)";
  let password = admin[1];
  bcrypt.hash(password, 1, (err, hash) => {
    let values = [
      admin[0],
      hash  
    ];
    pool.query(queryString, values, (err, queryResult) => {
      if (err) {
        console.log(err.stack);
      }
      else {
        console.log('admin added!');
      }
    });
  });
});