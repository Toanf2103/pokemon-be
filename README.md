# NestJS MySQL Pokemon

This project is built with NestJS and integrates MySQL for data persistence. It provides a backend application that interacts with a MySQL database and exposes API endpoints with Swagger documentation.

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://npmjs.com/) or [yarn](https://yarnpkg.com/) (optional but recommended)
- [MySQL](https://www.mysql.com/) (either locally or via Docker)


## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Toanf2103/pokemon-be
```
### 2. Copy .env.example and change name to .env
### 3. Install packages
```bash
npm install
```
### 4. Run migrate database (you need create 1 database name pokemon in mysql)
```bash
npm run migration:run
```

### 3. Run project
```bash
npm run start:dev
```
