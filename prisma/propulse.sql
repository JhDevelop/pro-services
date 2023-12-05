CREATE DATABASE propulse;

-- USE DATABASE PROPULSE
\c propulse;

-- CREATE SCHEMA propulse

-- SET SEARCH_PATH
CREATE TABLE status (
    id_status SERIAL PRIMARY KEY,
    status VARCHAR(50) NOT NULL
);


-- CREATE TABLE skill_level
CREATE TABLE skill_level (
    id_skill_level SERIAL PRIMARY KEY,
    skill_level VARCHAR(50) NOT NULL,
    id_status INTEGER NOT NULL REFERENCES status(id_status)
);

-- CREATE TABLE "user"
CREATE TABLE users (
    id_user SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    id_status INTEGER NOT NULL REFERENCES status(id_status)
);


CREATE TABLE person (
    id_person SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    id_user INTEGER NOT NULL REFERENCES  users(id_user),
    id_status INTEGER NOT NULL REFERENCES status(id_status)
);



-- CREATE TABLE person


-- CREATE TABLE skill
CREATE TABLE skill (
    id_skill SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    id_status INTEGER NOT NULL REFERENCES status(id_status)
);

-- CREATE TABLE person_skill
CREATE TABLE person_skill (
    id_person_skill SERIAL PRIMARY KEY,
    id_person INTEGER NOT NULL,
    id_skill INTEGER NOT NULL
);

-- CREATE TABLE person_skill_detail
CREATE TABLE person_skill_detail (
    id_person_skill_detail SERIAL PRIMARY KEY,
    id_person_skill INTEGER NOT NULL,
    id_skill_level INTEGER NOT NULL
);

-- CREATE TABLE company_education
CREATE TABLE company_education (
    id_company_education SERIAL PRIMARY KEY,
    code_company_education VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    id_status INTEGER NOT NULL REFERENCES status(id_status)
);

-- CREATE TABLE company
CREATE TABLE company (
    id_company SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    id_user INTEGER NOT NULL REFERENCES  users(id_user),
    id_status INTEGER NOT NULL REFERENCES status(id_status)
);

-- CREATE TABLE offert
CREATE TABLE offert (
    id_offert SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(500) NOT NULL,
    id_company INTEGER NOT NULL REFERENCES company(id_company),
    id_status INTEGER NOT NULL REFERENCES status(id_status)
);

-- CREATE TABLE offert_applied
CREATE TABLE offert_applied (
    id_offert_applied SERIAL PRIMARY KEY,
    id_offert INTEGER NOT NULL,
    id_person INTEGER NOT NULL,
    id_status INTEGER NOT NULL REFERENCES status(id_status)
);

-- CREATE TABLE offert_skill
CREATE TABLE offert_skill (
    id_offert_skill SERIAL PRIMARY KEY,
    id_offert INTEGER NOT NULL,
    id_skill INTEGER NOT NULL
);



CREATE TABLE person_cv(
    id_person_cv SERIAL PRIMARY KEY,
    id_person INTEGER NOT NULL REFERENCES person(id_person),
    presentation VARCHAR(1000) NOT NULL,
    id_status INTEGER NOT NULL REFERENCES status(id_status)
);


INSERT INTO status VALUES (default, 'activo');
INSERT INTO status VALUES (default, 'anulado');
INSERT INTO users VALUES (default, 'admin', 'admin', 1);

--DROP DATABASE propulse;
SELECT * FROM offert;