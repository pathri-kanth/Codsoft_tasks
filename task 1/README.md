# Abishek R — Portfolio Website

A minimal, typography-driven personal portfolio built with plain HTML/CSS/JS on the frontend and a Node.js/Express + MongoDB backend for handling contact form submissions.

## Structure

```
portfolio/
├── public/                # Frontend (served statically)
│   ├── index.html
│   ├── css/style.css
│   └── js/script.js
├── server/                 # Backend
│   ├── index.js            # Express app entry point
│   ├── models/Contact.js   # Mongoose schema
│   └── routes/contact.js   # /api/contact route
├── package.json
└── .env.example
```

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Copy the environment file and set your MongoDB connection string:
   ```
   cp .env.example .env
   ```
   Edit `.env` and set `MONGO_URI` to your local MongoDB instance or a MongoDB Atlas connection string.

3. Run the server:
   ```
   npm start
   ```
   or, for auto-reload during development:
   ```
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser.

## API

**POST `/api/contact`**

Request body:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "requirementType": "PROJECT",
  "message": "Would love to collaborate."
}
```

Responses:
- `200 OK` — submission saved successfully.
- `400 Bad Request` — missing/invalid name or email.
- `500 Internal Server Error` — database or server issue.

## Deployment notes

- Frontend + backend can be deployed together (e.g. Render, Railway) since Express serves the static files from `public/`.
- For MongoDB, use MongoDB Atlas in production and set `MONGO_URI` as an environment variable on your host.
