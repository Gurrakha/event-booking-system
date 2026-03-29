 # Event Booking System (Mini Event Management System)

This repository contains the backend implementation of a **Mini Event Management System** where users can browse events and book tickets. Built using Node.js, TypeScript, Prisma v7, MySQL, and Docker. It also includes full OpenAPI/Swagger documentation.

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Database Design](#database-design)  
- [API Endpoints](#api-endpoints)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Environment Setup](#environment-setup)  
  - [Running Locally](#running-locally)  
  - [Running via Docker](#running-via-docker)  
- [OpenAPI Documentation](#openapi-documentation)  
- [Project Structure](#project-structure)  
- [Notes](#notes)  

---

## Project Overview

Build a backend API for an Event Booking System that supports:  

- User registration
- Event creation
- Ticket booking with unique booking codes
- Attendance tracking via booking codes
- Pagination, search, and sorting
- Error handling and input validation  

This project also includes a MySQL database and is fully dockerized.

---

## Features

- **User Management:** Create users and fetch their bookings  
- **Event Management:** Create and list events with total and remaining tickets  
- **Booking Management:** Book tickets, check availability, and receive a unique code  
- **Attendance Tracking:** Mark attendance using booking code  
- **RESTful API:** Designed with proper HTTP methods and clean JSON responses  
- **OpenAPI / Swagger:** Complete API documentation  
- **Docker Support:** Runs both MySQL and backend server in containers  
- **Dynamic Environment Variables:** Configure database credentials and ports easily  

---

## Tech Stack

- **Node.js 20** + TypeScript  
- **Express.js** for REST API  
- **Prisma v7** as ORM  
- **MySQL 8**  
- **Docker & Docker Compose** for containerization  
- **tsup** for ESM builds  
- **OpenAPI 3.0** (Swagger) for API documentation  

---

## Database Design

**Entities and Relationships:**

- **Users:** `id`, `name`, `email`  
- **Events:** `id`, `title`, `description`, `date`, `total_capacity`, `remaining_tickets`  
- **Bookings:** `id`, `user_id`, `event_id`, `booking_date`, `code`  
- **Event Attendance:** `id`, `user_id`, `event_id`, `entry_time`  

All entities use proper primary keys, foreign keys, and constraints to ensure data integrity.

---

## API Endpoints

| Method | Endpoint                    | Description |
|--------|-----------------------------|-------------|
| GET    | `/events`                   | List all upcoming events |
| POST   | `/events`                   | Create a new event |
| POST   | `/bookings`                 | Book a ticket for a user (checks availability, generates unique code) |
| GET    | `/users/:id/bookings`       | Retrieve all bookings made by a specific user |
| POST   | `/events/:id/attendance`    | Record attendance using booking code |

Full request and response schemas, including error responses, are available in `swagger.yaml`.

---

## Getting Started

### Prerequisites

- Node.js 20  
- npm  
- Docker & Docker Compose (optional, for containerized setup)  

---

### Environment Setup

1. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

### Running Locally

1. Install dependencies:

```bash
npm install
```

2. Generate Prisma client and apply migrations:
```bash
npx prisma migrate dev --name init_db
```

3. Build the project (TypeScript → JS):
```bash
npm run build
```

4. Start the server:
```bash
npm run start
```

#### OR

For development with live reload, use:
```bash
npm run dev
```

## Running via Docker
1. Make sure Docker and Docker Compose are installed.
2. Start the containers:
```bash
docker-compose up --build
```
3. Backend app uses the port defined in .env (PORT)
4. MySQL container exposed on `3306`
5. Prisma migrations are automatically applied at container start
6. Access the API:
```bash
http://localhost:<PORT>/api/v1
```

---

## OpenAPI Documentation
- File: `swagger.yaml`
- Available endpoints with request/response schemas, success, and error formats
- where to access:
```bash
http://localhost:5000/api/v1/docs
```
---

## Project Structure
`
\---src
    |   app.ts
    |   index.ts
    |
    +---config
    |       cors.ts
    |       env.ts
    |       prisma.ts
    |
    +---generated
    |   \---prisma
    |       |   browser.ts
    |       |   client.ts
    |       |   commonInputTypes.ts
    |       |   enums.ts
    |       |   models.ts
    |       |
    |       +---internal
    |       |       class.ts
    |       |       prismaNamespace.ts
    |       |       prismaNamespaceBrowser.ts
    |       |
    |       \---models
    |               Booking.ts
    |               Event.ts
    |               EventAttendance.ts
    |               User.ts
    |
    +---middleware
    |       globalErrorHandler.ts
    |       validateRequest.ts
    |
    +---modules
    |   +---booking
    |   |       booking.controller.ts
    |   |       booking.router.ts
    |   |       booking.service.ts
    |   |       booking.validator.ts
    |   |
    |   +---event
    |   |       event.controller.ts
    |   |       event.router.ts
    |   |       event.service.ts
    |   |       event.validator.ts
    |   |
    |   \---user
    |           user.controller.ts
    |           user.router.ts
    |           user.service.ts
    |           user.validator.ts
    |
    +---routes
    |       v1.ts
    |
    +---types
    |       booking.types.ts
    |
    \---utils
            apiError.ts
            catchAsync.ts
            pagination.ts
            pick.ts
`

---

## Notes
- The backend is built as an ESM project (`"type": "module"` in package.json)
- Prisma client is generated inside `src/generated/prisma`
- Use `.env` to configure database credentials and ports dynamically
