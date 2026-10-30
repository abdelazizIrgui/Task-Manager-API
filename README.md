# Task Manager API

A RESTful Task Management API built with Node.js, Express.js, and MongoDB.

## Features

### Authentication & Authorization
- User registration and login
- JWT authentication
- Password hashing with bcrypt
- Role-based authorization (User / Admin)

### Task Management
- Create tasks
- Update tasks
- Delete tasks
- Change task status
- Change task priority
- Retrieve user tasks
- Admin task management

### Additional Features
- Input validation using Zod
- Error handling middleware
- Rate limiting
- Pagination
- Search and filtering
- Sorting
- MongoDB with Mongoose
- Swagger API documentation
- Docker support
- Automated tests with Jest and Supertest

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Zod
- Docker
- Swagger
- Jest
- Supertest

## Requirements

- Node.js 22+
- MongoDB
- Docker Desktop (for Docker setup)

## Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
cd Task-Manager-API
```

Install dependencies:

```bash
npm install
```

Create your `.env` file using `.env.example` and configure:

```env
PORT=7000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret
EXPIRESIN=your_token_expiration
```

## Run in Development

```bash
npm run dev
```

## Run Tests

```bash
npm test
```

## Run with Docker

```bash
docker compose up --build -d
```

View logs:

```bash
docker compose logs -f api
```

Stop containers:

```bash
docker compose down
```

## API Documentation

Swagger UI:

http://localhost:7000/api-docs

## Health Check

http://localhost:7000/health

## License

ISC
