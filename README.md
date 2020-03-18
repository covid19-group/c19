# C19 // COVID-19 Self Registration Project

C19 is an Open Source COVID-19 self registration tool build by volunteering people in tech. We are startup founders, engineers, designers etc. with resources sponsored by tech-companies around the world.

We're currently piloting in Denmark on https://c19.dk.


# Contributing
 
## Prerequisites (~4 min)

1. PostgreSQL database
    - download an installer from https://www.postgresql.org/download/  
      note: The MacOS installer of Postgres 12 is very user friendly! :))
    - Alternatively use a free database from [Heruko](https://www.heroku.com/postgres) or [ElephantSQL](https://www.elephantsql.com/)
2. [NodeJS](http://nodejs.org)    

## Setup (~6 min)

1. Fork the repo to you own github user (so you are ready to make pull requests)
2. Clone the codebase to your machine `git clone ....`
3. `npm install` (or `yarn`)
4. copy the template file `.env.example` to `.env` and open that file
5. enter tokens to the various services used 
    - the postgres connection string eg  
      `DATABASE=postgres://postgres:password@localhost:5432/c19`
    - the SECRET ([some 64-bit password used for db-encryption](https://passwordsgenerator.net/))
    - the Twilio keys (you can ignore this while in development)
    - the Rollbar token (you can ignore this while in the development)
6. Create DB tables  
    - Run the SQL found in `create.sql` to setup tables. Eg you can simply copy-past the SQL into the Query Tool
     (click Tools -> Query Tool) in PgAdmin4

## Development 

Run `npm run dev` (or `yarn dev`) to start the development loop.

## Trouble shooting

When running `npm run dev`, you see a big ugly stack trace ...
    
    [ wait ]  compiling ...
    [ ready ] compiled successfully - ready on http://localhost:3000
    TypeError: Invalid connection details: undefined
    
.. then postgres is not running yet!
