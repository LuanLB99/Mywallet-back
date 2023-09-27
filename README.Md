<p align="center">
  <img src="https://raw.githubusercontent.com/thaliadettenborn/front-end-my-wallet/main/public/load.gif" width="100" alt="RepoProvas" />
</p>

# My Wallet (BackEnd)

<br><br>

## About

<p>
 API to provide data to the My Wallet application in which the user can add their recent financial inflows and outflows.<br><br>
 
</p>

<p>
 <a href="https://github.com/LuanLB99/Mywallet-front" target='_blank'>
    ✔️ Click here to view the front-end repository.
  </a>
  <a href="https://mywallet-front-o5zutbvvf-luanlb99.vercel.app/main" target='_blank'>
    ✔️ Click here to view the front-end Deploy.
  </a>
</p>

<br><br><br>

<p align="center">
  <a style='color:inherit' href="#pré-requisites">Pre-requisites</a> •
  <a style='color:inherit' href="#running-the-web-applications">Running the web application</a> •
  <a style='color:inherit' href="#features">Features</a> •
  <a style='color:inherit' href="#rest">REST API</a> •
  <a style='color:inherit' href="#tech">Tech Stack</a> •
  <a style='color:inherit' href="#author">Author</a>
</p>

<br><br>

## Pre-requisites

Before you begin, you will need to have the following tools installed on your machine: [Git] (https://git-scm.com), [Node.js] (https://nodejs.org/en/) and [Docker] (https://www.docker.com/). In addition, it is good to have an editor to work with the code like [VSCode] (https://code.visualstudio.com/)

<br><br>

## Running the web application

```bash
# Clone this repository
$ git clone <https://github.com/LuanLB99/Mywallet-back.git>

# Access the project folder cmd/terminal
$ cd Mywallet-back

# Create a file of environment variables at the root of the project
$ touch .env

# Set the database port and link as environment variable according to the ".env.example" file

# Run the container
$ docker-compose up --build

# The server will automatically start

```

<br><br>

## Features

- [x] Create a new user and user sign-in<br>
- [x] User sign-out<br>
- [x] Listing all a user's financial records<br>
- [x] Creating a new entry<br>
- [x] Creating a new exit<br>

<br><br>

## Rest API

### `POST /sign`

#### Request

    curl --location --request POST 'https://mywallet-back-production.up.railway.app/sign' \
    --data-raw '{
        "name": "Juca",
        "email": "juquinha@gmail.com",
        "password": "juca123",
        "confirmPassword": "juca123"
    }'

#### Response

    HTTP/1.1 201 Created
    Sat, 10 Jan 2023 07:11:47 GMT
    Status: 201 Created
    Connection: keep-alive
    application/json; charset=utf-8
    X-Powered-By: Express

    "Usuário Inserido com sucesso!"

<br><br>

### `POST /sign-up`

#### Request

    curl --location --request POST 'https://mywallet-back-production.up.railway.app/sign-up' \
    --data-raw '{
        "email": "juquinha@gmail.com",
        "password": "juca123"
    }'

#### Response

    HTTP/1.1 200 OK
    Sat, 10 Jan 2023 07:13:11 GMT
    Status: 200 OK
    Connection: keep-alive
    application/json; charset=utf-8
    X-Powered-By: Express

    Return the acess token

### `GET /`

#### Request

    curl --location --request GET 'https://mywallet-back-production.up.railway.app/' \
    --header 'Authorization: Bearer e386c4dc-3fbe-4dfd-85c5-a8710399f9c1'

#### Response

    HTTP/1.1 200 OK
    Sat, 10 Jan 2023 07:15:41 GMT
    Status: 200 OK
    Connection: keep-alive
    application/json; charset=utf-8
    X-Powered-By: Express


    {
    "name": "Juca",
    "email": "juquinha@gmail.com",
    "transactions": [
      {
        "_id": "6500ce69b1e9bf25ba3f7744",
        "name": "Juca",
        "userId": "6500ce3fb1e9bf25ba3f7742",
        "value": "40",
        "description": "Jogo de Playstation 1",
        "type": "Entrada",
        "date": "12/09"
      } ]
    }

### `POST /sign-up`

#### Request

    curl --location --request POST 'https://mywallet-back-production.up.railway.app/transactions' \
    --header 'Authorization: Bearer e386c4dc-3fbe-4dfd-85c5-a8710399f9c1'

    {
      "value":100,
      "description":"Vendas Brechó",
      "type":"Entrada"
    }

#### Response

    HTTP/1.1 200 OK
    Sat, 10 Jan 2023 07:15:41 GMT
    Status: 200 OK
    Connection: keep-alive
    application/json; charset=utf-8
    X-Powered-By: Express

    {
      "name": "Juca",
      "userId": "6500ce3fb1e9bf25ba3f7742",
      "value": 100,
      "description": "Vendas Brechó",
      "type": "Entrada",
      "date": "18/09"
    }

## Tech Stack

Languages:<br>

<p align="center">

  <img src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>

</p>

<br>

The following tools and frameworks were used in the construction of the project:<br>
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

<br>
  Database:<br>

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

<br>
<br>
  Hosting/SaaS:<br>
  
  ![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)

<br>

Version Control: <br>

![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
<br><br>

## Author

---

<br>
<p align='center'>
  <br><br>
  Made by Luan Leal 👋🏽 Get in Touch!<br>
  <a href="https://www.linkedin.com/in/luan-leal99/"><img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/></a>
  <a href="mailto:luanlealboni@gmail.com"><img src="https://img.shields.io/badge/gmail-D14836?&style=for-the-badge&logo=gmail&logoColor=white"/></a>
  <a href="https://github.com/LuanLB99"><img src="https://img.shields.io/badge/github-%23100000.svg?&style=for-the-badge&logo=github&logoColor=white" /></a>
</p>
