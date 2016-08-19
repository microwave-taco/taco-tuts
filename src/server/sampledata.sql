-- to run this file and update the remote database run: heroku pg:psql --app taco-tuts-staging < sampledata.sql

DROP TABLE IF EXISTS teaching;
DROP TABLE IF EXISTS learning;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS subjects CASCADE;
DROP TABLE IF EXISTS teachers CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS instantSessionRequests CASCADE;

CREATE TABLE teachers (
  ID SERIAL PRIMARY KEY,
  isAvailable BOOLEAN,
  favorite BOOLEAN,
  rating INT
);

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  authID TEXT,
  username VARCHAR,
  name VARCHAR,
  email VARCHAR,
  teacherID integer references teachers(id) ON DELETE CASCADE,
  teacher BOOLEAN
);

CREATE TABLE subjects (
  ID SERIAL PRIMARY KEY,
  name VARCHAR
);

CREATE TABLE sessions (
  ID SERIAL PRIMARY KEY,
  studentID integer references users(id) ON DELETE CASCADE, 
  teacherID integer references users(id) ON DELETE CASCADE, 
  start TIMESTAMP,
  ending TIMESTAMP,
  subjectID integer references subjects(id) ON DELETE CASCADE, 
  confirmed BOOLEAN
);

CREATE TABLE instantSessionRequests (
  ID SERIAL PRIMARY KEY,
  studentAuthID text,
  teacherAuthID text,
  subjectID integer references subjects(id) ON DELETE CASCADE
);


CREATE TABLE learning (
  userID integer references users(id) ON DELETE CASCADE,
  subjectID integer references subjects(id) ON DELETE CASCADE,
  progress integer default 0
);

CREATE TABLE teaching (
  userID integer references users(id) ON DELETE CASCADE,
  subjectID integer references subjects(id) ON DELETE CASCADE
);

INSERT INTO teachers (isAvailable, favorite, rating)
  VALUES (true, false, 1);

INSERT INTO teachers (isAvailable, favorite, rating)
  VALUES (true, false, 2);

INSERT INTO teachers (isAvailable, favorite, rating)
  VALUES (true, false, 3);

INSERT INTO teachers (isAvailable, favorite, rating)
  VALUES (true, false, 4);

INSERT INTO teachers (isAvailable, favorite, rating)
  VALUES (true, false, 5);

INSERT INTO users (email, authid, username, name, teacher, teacherID)
  VALUES ('hbp@hotwarts.com', 'auth0|57b27ddd71c16ce874b94fcb', 'halfbloodprince', 'Severus Snape', true, 1);
  
INSERT INTO users (email, authid, username, name, teacher)
  VALUES ('hp@hogwarts.com', 'auth0|57b27e4e51f9235564a6f68b', 'chosen one', 'Harry Potter', false);

INSERT INTO users (email, authid, username, name, teacher, teacherID)
  VALUES ('hagrid@gmail.com', 'auth0|57b27e8a71c16ce874b94fd0', 'Hagrid', 'Hagrid', true, 2);

INSERT INTO users (email, authid, username, name, teacher, teacherID)
  VALUES ('mmoody', 'auth0|57b27f3971c16ce874b94fd6', 'crazyeyes', 'Mad-Eye Moody', true, 3);

INSERT INTO users (email, authid, username, name, teacher)
  VALUES ('rweasly@yahoo.com', 'auth0|57b27fa071c16ce874b94fd8auth4', 'Ronald', 'Ron', false);

INSERT INTO users (email, authid, username, name, teacher, teacherID)
  VALUES ('vmor@hotmail.com', 'auth0|57b27fd771c16ce874b94fda', 'Tom', 'Voldemort', true, 4);

INSERT INTO users (email, authid, username, name, teacher, teacherID)
  VALUES ('ddoor@gmail.com', 'auth0|57b2801371c16ce874b94fdd', 'Headmaster', 'Dumbledoor', true, 5);

INSERT INTO users (email, authid, username, name, teacher)
  VALUES ('deathwatcher@crazy.com', 'auth0|57b2805971c16ce874b94fe0', 'crazy person', 'Luna Lovegood', false);

INSERT INTO subjects (name)
  VALUES ('Potions');

INSERT INTO subjects (name)
  VALUES ('Defense against the dark arts'); 

INSERT INTO subjects (name)
  VALUES ('Magical Creatures');

INSERT INTO subjects (name)
  VALUES ('Taco Making');

INSERT INTO subjects (name)
  VALUES ('Dueling');

INSERT INTO teaching (userID, subjectID)
  VALUES (1, 1);

INSERT INTO teaching (userID, subjectID)
  VALUES (4, 2);

INSERT INTO teaching (userID, subjectID)
  VALUES (5, 2);

INSERT INTO teaching (userID, subjectID)
  VALUES (6, 2);

INSERT INTO teaching (userID, subjectID)
  VALUES (3, 3);

INSERT INTO teaching (userID, subjectID)
  VALUES (7, 4);

INSERT INTO teaching (userID, subjectID)
  VALUES (7, 5);
