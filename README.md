# recruiting-service

a service that serves recuiting data - candidates and positions

## Installation pre-requisites

Install Homebrew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

Download and Install Postico
https://eggerapps.at/postico/

Install Postgres as a service and start it
brew install postgresql
brew services start postgresql

Create the database, schema and user
psql create database recruiting;
psql create schema recruiting;
createuser --createdb --createrole --superuser recruiting;

npm i -g ts-node
npm i -g typeorm

## How to start the server

npm run start

## Docker Support

To build a docker image issue the following command:
docker build -t recruiting-service .

## References

https://typeorm.io/#/example-with-express