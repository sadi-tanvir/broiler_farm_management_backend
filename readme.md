# Poultry Farm Management Backend

> Backend server for the Poultry Farm Management Application.

## Table of Contents

- [Description](#description)
- [Technologies Used](#technologies-used)
- [Frontend Repository](#frontend-repository)
- [Live Application](#live-application)
- [Test Account](#test-account)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Description

The **Poultry Farm Management Backend** is responsible for managing the server-side functionality of the Poultry Farm Management Application. It handles data storage, authentication, and API endpoints for the frontend application.

## Technologies Used

- Express.js
- MongoDB
- Mongoose
- Nodemailer
- Multer
- Jsonwebtoken
- bcrypt.js

## Frontend Repository

- [Frontend Repository](https://github.com/sadi-tanvir/broiler_farm_management_frontend)

## Live Application

- [Poultry Farm Management - Live](https://tanvirhossainsadi.netlify.app)

## Test Account

- **Email**: admin@gmail.com
- **Password**: 123456

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Rename `.env.example` to `.env` and configure the environment variables.
4. Run the server using `npm start`.

## Environment Variables

- `MONGODB_URI`: MongoDB connection URI.
- `PORT`: Server port number.
- `SECRET_KEY`: Secret key for JSON Web Token (JWT) encryption.
- `SMTP_EMAIL`: SMTP email for Nodemailer (for email verification).
- `SMTP_PASSWORD`: SMTP email password.
- `STRIPE_SECRET_KEY`: Secret key for Stripe payment gateway integration.

## API Endpoints

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in an existing user.
- `POST /api/auth/reset-password`: Request a password reset.
- `POST /api/auth/update-password`: Update password after reset.
- `GET /api/users`: Get all users.
- `GET /api/users/:id`: Get a user by ID.
- `PUT /api/users/:id`: Update a user's information.
- `DELETE /api/users/:id`: Delete a user.
- More endpoints for managing farm data.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request.
