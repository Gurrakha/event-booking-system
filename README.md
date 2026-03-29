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
- [License](#license)  

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

