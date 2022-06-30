const pg = require('pg');

const config = {
  user: 'labber',
  password: '',
  host: 'localhost',
  database: 'bootcampx'
};

const pool = new pg.Pool(config);

const cohortName = process.argv[2];
const limitBy = process.argv[3];

const queryString = `
  SELECT students.id AS student_id, students.name AS name, cohorts.name AS cohort
  FROM students
  JOIN cohorts ON cohorts.id = students.cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
  `;

pool.query(queryString, [`%${cohortName}%`, limitBy])
  .then( response => {
    response.rows.forEach( user => {
      console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort.`);
    });
    pool.end();
  })
  .catch(err => console.error('query error', err.stack));


