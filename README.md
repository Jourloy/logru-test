<h1 align="center">
  LOGRU test case
</h1>

## Description

Need to make a service with a REST API.
Authorization by token. Database is a MongoDB.
Create token at each login (valid for 15 minutes). Renew at any user request.
Need an API for get all users, add new one, editing and deleting.

## Installation

```bash
$ yarn install
```

## ENV

You should create `.env` file before start. Look into `.env.template`

## Running the app

### Docker

```bash
$ docker-compose up -d
```

### NPM

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Endpoints

Open `http://localhost:3000/api` for get swagger API doc

###### 3000 is your app port