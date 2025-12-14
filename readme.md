# Backend Web Split Bill

A backend project designed to manage and facilitate bill splitting among participants. The project includes features such as user management, Google OAuth for authentication, and database management using Prisma ORM.

---

## Features
- **Bill Management**: Add, split, and manage bills between participants.
- **OAuth Integration**: Google OAuth for secure user authentication.
- **Prisma ORM**: Simplify database interactions with Prisma ORM.
- **Custom Middleware**: Error handling, authentication, and validation middleware for secure APIs.

---

## Installation Guide

### 1. Clone the Repository
Start by cloning this repository into your local machine:


### 2. Navigate to the Project Directory
Change into the project root directory:


### 3. Install Dependencies
Install all the required packages using `npm`:


---

## Database Setup

1. **Prepare Your Database**:
    - Create a new database instance (e.g., MySQL, PostgreSQL).
    - Note down the connection URL for the database.

2. **Update the `.env` File**:
    - Copy the `.env.example` file (if any) or create a new `.env` file in the root directory.
    - Add the following environment variable to it:
      ```env
      DATABASE_URL=<your-database-connection-url>
      ```
      Replace `<your-database-connection-url>` with your actual database connection string.

3. **Prisma Setup**:
   Initialize and configure Prisma ORM:
   ```bash
   npx prisma init
   ```
   This will create a basic `schema.prisma` file in the `prisma` directory.

4. **Define Your Database Models**:
    - Modify the `prisma/schema.prisma` file to define your database tables and relationships.

5. **Migrate the Database**:
   Run the following command to migrate your database schema based on `schema.prisma`:
   ```bash
   npx prisma migrate dev --name your_migration_name
   ```

---

## Google OAuth Setup

1. Visit the [Google Developer Console](https://console.cloud.google.com/).
2. Create a new project and configure the OAuth consent screen.
3. Set up OAuth credentials (Client ID and Client Secret).
4. Add the following variables to your `.env` file:
   ```env
   GOOGLE_CLIENT_ID=<your-client-id>
   GOOGLE_CLIENT_SECRET=<your-client-secret>
   ```

---

## Run the Application

1. Navigate to the `src` directory:
   ```bash
   cd src
   ```

2. Start the application:
   ```bash
   node main.js
   ```

---

## Contributing

We welcome contributions! Feel free to fork this repository and submit pull requests.

---

## License

This project is licensed under the [MIT License](LICENSE).