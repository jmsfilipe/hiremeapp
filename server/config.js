var uuid = require('node-uuid');

module.exports = {

    'secret': uuid.v4(),
    'database': {
          user: 'nmcdmazcgiuomo', //env var: PGUSER
          database: 'd9jb8t08t4q7hd', //env var: PGDATABASE
          password: 'e3F9bYsMmNjuSB_D_NUYVSy_xT', //env var: PGPASSWORD
          host: 'ec2-54-75-232-49.eu-west-1.compute.amazonaws.com', // Server hosting the postgres database
          port: 5432, //env var: PGPORT
          max: 10, // max number of clients in the pool
          idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
          ssl: true
        }
};
