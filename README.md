# SafeShores

## App Summary

SafeShores is an online safety education platform that teaches children how to stay safe in digital environments. It helps young users recognize red flags, set personal boundaries, and know when to reach out to a trusted adult. Users progress through a gamified, island-themed adventure with levels, quizzes, and achievement badges. Each level introduces a new safety concept, making the learning experience engaging and accessible for students.

---

## Tech Stack

- **Frontend:** HTML, CSS, Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Other:** dotenv, cors, nodemon

---

## Architecture Diagram

```
User (Browser)
     |
     | HTTP / fetch()
     v
Express.js Server (port 3000)
     |
     | SQL queries (pg)
     v
PostgreSQL Database (safeshores)
```

---

## Prerequisites

- [Node.js](https://nodejs.org/en/download) — verify with `node --version`
- [PostgreSQL](https://www.postgresql.org/download) — verify with `psql --version`

---

## Installation and Setup

```bash
# 1. Clone the repo
git clone https://github.com/Joshby02/Milestone6.git
cd Milestone6

# 2. Install dependencies
npm install

# 3. Copy and fill in environment variables
cp .env.example .env

# 4. Create the database and run scripts
createdb safeshores
psql safeshores < DB/schema.sql
psql safeshores < DB/seed.sql
```

**.env values:**
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=safeshores
DB_USER=postgres
DB_PASSWORD=yourpassword
PORT=3000
```

---

## Running the Application

```bash
npm start
```

Open `http://localhost:3000` in your browser.

---

## Verifying the Vertical Slice

1. Open `http://localhost:3000` and click **"Start Your Adventure"**
2. Click through the 4-step tutorial, then click **"Continue Adventure"**
3. This saves your progress to the database

**Confirm in the database:**
```bash
psql safeshores
SELECT * FROM UserLevelProgress WHERE UserID = 1 AND LevelID = 1;
```

You should see a row with `Status = 'Completed'` and `Score = 100`. Refreshing the page will not reset this — the data is stored in the database.
