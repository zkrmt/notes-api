# 📝 Notes API

A REST API for note management built with Node.js, Express, PostgreSQL and JWT Authentication.

🌐 **Live:** notes-api-production-7e07.up.railway.app

## 🛠️ Technologies
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- Bcrypt

## 🚀 Routes

### Auth
- `POST /auth/register` → Create an account
- `POST /auth/login` → Login and get a token

### Notes (🔒 require JWT token)
- `GET /notes` → Get all your notes
- `POST /notes` → Create a note
- `PUT /notes/:id` → Update a note
- `DELETE /notes/:id` → Delete a note

## 🧪 Testing
You can test the API using [Postman](https://www.postman.com/).

1. Register an account → `POST /auth/register`
2. Login to get your token → `POST /auth/login`
3. Use the token in the `authorization` header for all notes routes

## ⚙️ Installation
1. Clone the repository
2. Run `npm install`
3. Create a `.env` file with your database credentials
4. Run `node server.js`

## 🔑 Environment Variables
```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=notes
DB_PORT=5432
JWT_SECRET=yoursecret
```
