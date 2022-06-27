-- // creating students table 
CREATE TABLE students(
  id INTEGER PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  github TEXT,
  start_date DATE,
  end_date DATE,
  cohort_id INTEGER REFERENCES cohorts(id) ON DELETE CASCADE 
);

CREATE TABLE cohorts(
  id SERIAL PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  start_date DATE,
  end_date DATE
);