# Admin Panel (Server)

The **Server** is the backend component of this system, built with **Node.js** and **ExpressJS**, and uses **MySQL** as its database. The server is an **integral part** of the Admin Panel (Frontend) and cannot function independently.

---

## Project Overview

This project uses the following technologies:

- **Runtime:** Node.js v20.19.0+ – JavaScript execution environment.
- **Framework:** ExpressJS – backend framework for building REST APIs.
- **Database:** MySQL – used for both main data storage and user authentication.
- **Environment Variables:** configured via a `.env` file in the project root.
- **License:** Provided by the Communication, Informatics, and Encryption Office of South Konawe Regency.

---

## Installation & Setup

1. **Clone the repository** to your local machine.

2. **Install dependencies** by running:

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the project root with the following format:

   ```env
   # Main database
   DB_MAIN=
   DB_MAIN_HOST=
   DB_MAIN_USERNAME=
   DB_MAIN_PASSWORD=

   # User login database
   # (Use the same as main database if you only have one)
   DB_USER=
   DB_USER_HOST=
   DB_USER_USERNAME=
   DB_USER_PASSWORD=
   ```

4. **Run the server**:
   ```bash
   npm run dev
   ```
   or
   ```bash
   node server.js
   ```

---

## Project Structure

```
root/
├── api/
├── auth/              # Authentication
├── db/                # Database configuration
├── .env.example       # Environment variable template
├── package.json
└── index.js          # Application entry point
```

---

## Important Notes for Developers

1. **Database Connection**  
   Ensure `.env` variables are properly set so the server can connect to MySQL.

2. **Authentication**  
   All APIs requiring user login will use the **DB_USER** connection.

3. **Error Handling**  
   Use the provided error handling middleware to keep error responses consistent.

---

## Contribution Guidelines

- Clearly document any changes you make.
- Include the file location, purpose, and impact of your modifications.
- Follow consistent code style (ESLint/Prettier if available).
