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
    SELECT DISTINCT(teachers.name) AS name, cohorts.name AS cohort
    FROM assistance_requests
    JOIN teachers ON teachers.id = assistance_requests.teacher_id
    JOIN students ON students.id = assistance_requests.student_id
    JOIN cohorts ON cohorts.id = students.cohort_id
    WHERE cohorts.name = $1;
  `;

pool.query(queryString, [cohortName])
  .then( response => {
    response.rows.forEach(teacher => {
      console.log(`${teacher.cohort}: ${teacher.name}`);
    })
    pool.end();
  })
  .catch(err => console.error('query error', err.stack));