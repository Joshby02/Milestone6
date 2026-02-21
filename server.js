const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./db');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('../'));

// ─── USERS ────────────────────────────────────────────────────────────────────

// GET all users
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Users ORDER BY UserID');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// GET a single user by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Users WHERE UserID = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// ─── LEVELS ───────────────────────────────────────────────────────────────────

// GET all levels
app.get('/api/levels', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Level ORDER BY LevelID');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch levels' });
  }
});

// ─── USER LEVEL PROGRESS ──────────────────────────────────────────────────────

// GET progress for a specific user
app.get('/api/progress/:userId', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM UserLevelProgress WHERE UserID = $1 ORDER BY LevelID',
      [req.params.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

// POST - Save or update a user's level progress (the "One Working Button")
app.post('/api/progress', async (req, res) => {
  const { userID, levelID, score, status } = req.body;

  if (!userID || !levelID || score === undefined || !status) {
    return res.status(400).json({ error: 'Missing required fields: userID, levelID, score, status' });
  }

  try {
    const existing = await pool.query(
      'SELECT * FROM UserLevelProgress WHERE UserID = $1 AND LevelID = $2',
      [userID, levelID]
    );

    let result;

    if (existing.rows.length > 0) {
      result = await pool.query(
        `UPDATE UserLevelProgress
         SET Score = GREATEST(Score, $1),
             Status = $2,
             CompletionDate = CASE WHEN $2 = 'Completed' THEN NOW() ELSE CompletionDate END
         WHERE UserID = $3 AND LevelID = $4
         RETURNING *`,
        [score, status, userID, levelID]
      );
    } else {
      result = await pool.query(
        `INSERT INTO UserLevelProgress (UserID, LevelID, StartDate, CompletionDate, Status, Score)
         VALUES ($1, $2, NOW(), $3, $4, $5)
         RETURNING *`,
        [
          userID,
          levelID,
          status === 'Completed' ? new Date() : null,
          status,
          score,
        ]
      );
    }

    res.json({ message: 'Progress saved successfully!', progress: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save progress' });
  }
});

// ─── STREAK ───────────────────────────────────────────────────────────────────

// PATCH - Increment a user's streak
app.patch('/api/users/:id/streak', async (req, res) => {
  try {
    const result = await pool.query(
      `UPDATE Users SET Streak = Streak + 1 WHERE UserID = $1 RETURNING UserID, Username, Streak`,
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'Streak updated!', user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update streak' });
  }
});

// ─── START SERVER ─────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SafeShores server running at http://localhost:${PORT}`);
});
