# Storefront Backend Project

## How to setup and connect to the database:

  first, if not found .env file then create it at the project root folder ,that .env file contains all needed enviroment variables like this:

   `POSTGRES_HOST=127.0.0.1`

   `POSTGRES_DB=storefront_dev`

   `POSTGRES_DB_TEST=storefront_dev_test`

   `POSTGRES_USER=storefront_user`

   `POSTGRES_PASSWORD=password123`

   `ENV=dev`

   `BCRYPT_PASSWORD=storefront_secret_password`

   `SALT_ROUNDS=8`

   `TOKEN_SECRET=menna1234`

  next, follow the next steps to connect to postgres and create needed databases:

  write the command below in the terminal to start psql as user postgers:

   `psql -U postgres`

 then, create two databases one of them is the main database for the project and the other database is needed for testing, use the below commands to create them:

  in psql run the following:

  `CREATE USER storefront_user WITH PASSWORD 'password123';` 

  `CREATE DATABASE storefront_dev;` this is the main database

  `\c storefront_dev` connect to database

  `GRANT ALL PRIVILEGES ON DATABASE storefront_dev TO storefront_user;`

  `CREATE DATABASE storefront_dev_test;` this is the test database

  `\c storefront_dev_test` connect to database

  `GRANT ALL PRIVILEGES ON DATABASE storefront_dev_test TO storefront_user;`


## Package installation instructions:

 - open a secound terminal and install yarn `npm install yarn -g` 
 
 - install db-migrate on the machine for terminal commands `npm install db-migrate -g`

 - then, run `yarn` in your terminal at the project root to install all needed packages

 - last, run `db-migrate up` to create all need tables

## Ports the backend and database are running on:

 - localhost port : 3000

 - database port : 5432

## Running the project:
 
- `yarn run watch` : used to run the project in watch mode

- `yarn run start` : used to start the project at http://localhost:3000

- `yarn run test` : used to run tests

- `yarn run prettier` : used to run prettier

- `yarn run lint` : used to run linter


