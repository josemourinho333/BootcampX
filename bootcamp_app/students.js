// const express = require('express');
// const morgan = require('morgan');
const pg = require('pg');
// const port = process.env.PORT || 8000;

const config = {
  user: 'labber',
  password: '',
  host: 'localhost',
  database: 'bootcampx'
};

const pool = new pg.Pool(config);

// pool.connect(() => {
//   console.log('connected to database server');
// });

const cohortName = process.argv[2];
const limitBy = process.argv[3];

// pool.query(`
//     SELECT students.id as student_id, students.name AS name, cohorts.name AS cohort
//     FROM students
//     JOIN cohorts ON cohorts.id = students.cohort_id
//     LIMIT 5;
//   `)
//   .then(response => {
//     console.log(response.rows);
//   })
//   .catch(error => console.error('query error', error.stack));

pool.query(`
    SELECT students.id AS student_id, students.name AS name, cohorts.name AS cohort
    FROM students
    JOIN cohorts ON cohorts.id = students.cohort_id
    WHERE cohorts.name LIKE '${cohortName}%'
    LIMIT ${limitBy};
  `)
  .then( response => {
    response.rows.forEach( user => {
      console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort.`);
    });
    pool.end();
  })
  .catch(err => console.error('query error', err.stack));


