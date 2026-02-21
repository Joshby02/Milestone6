-- Seed Users
INSERT INTO "User" (Username, FirstName, LastName, Email, Password, UserRole, Streak) VALUES
    ('jsmith', 'John', 'Smith', 'john.smith@email.com', 'password123', 'S', 3),
    ('emjohnson', 'Emily', 'Johnson', 'emily.johnson@email.com', 'password123', 'S', 7),
    ('mwilliams', 'Mike', 'Williams', 'mike.williams@email.com', 'password123', 'A', 12),
    ('sbrown', 'Sarah', 'Brown', 'sarah.brown@email.com', 'password123', 'S', 1);

-- Seed Levels
INSERT INTO Level (LevelName, Difficulty, Description, Instructions) VALUES
    ('Staying Safe Online', 1, 'Learn the basics of online safety and recognizing unsafe content', 'Read each question carefully and select the best answer.'),
    ('Recognizing Red Flags', 2, 'Identify warning signs of inappropriate content and unsafe interactions', 'Answer all questions within the time limit.'),
    ('Talking to Trusted Adults', 3, 'Learn how and when to reach out to a trusted adult for help', 'Complete all questions to earn a passing score.'),
    ('Setting Boundaries', 4, 'Understand personal boundaries and how to protect them online', 'Achieve 80% or higher to pass.'),
    ('Digital Safety Expert', 5, 'Master all online safety concepts and strategies', 'Answer every question correctly to become a Digital Safety Expert.');

-- Seed Quizzes
INSERT INTO Quiz (QuizNumber, Question, PassingScore) VALUES
    (1, 'What should you do if you see something online that makes you uncomfortable?', '70%'),
    (2, 'Which of the following is a red flag from someone you meet online?', '70%'),
    (3, 'Who are trusted adults you can talk to if something feels wrong?', '75%'),
    (4, 'What information should you never share online?', '80%'),
    (5, 'What is the best way to respond if someone online asks you to keep a secret from your parents?', '85%');

-- Seed LevelQuiz
INSERT INTO LevelQuiz (LevelName, QuizID) VALUES
    ('Staying Safe Online', 1),
    ('Staying Safe Online', 2),
    ('Recognizing Red Flags', 3),
    ('Talking to Trusted Adults', 4),
    ('Digital Safety Expert', 5);

-- Seed QuizQuestions
INSERT INTO QuizQuestion (QuizID, Question, QuestionType, PointValue) VALUES
    (1, 'What should you do if you see something online that makes you feel uncomfortable?', 'Multiple Choice', 10),
    (1, 'Is it okay to click on links sent by someone you don''t know?', 'True/False', 5),
    (2, 'Which behavior from an online stranger is a warning sign?', 'Multiple Choice', 10),
    (2, 'Should you meet someone in person that you only know from online?', 'True/False', 5),
    (3, 'Who is a trusted adult you can talk to if something feels wrong online?', 'Multiple Choice', 10),
    (4, 'Which of the following should you never share with someone online?', 'Multiple Choice', 15),
    (5, 'What should you do if someone online asks you to keep a secret from your parents?', 'Multiple Choice', 20);

-- Seed UserLevelProgress
INSERT INTO UserLevelProgress (UserID, LevelID, StartDate, CompletionDate, Status, Score) VALUES
    (1, 1, '2025-01-10 09:00:00', '2025-01-10 09:45:00', 'Completed', 90),
    (1, 2, '2025-01-12 10:00:00', NULL, 'In Progress', 0),
    (2, 1, '2025-01-08 14:00:00', '2025-01-08 14:30:00', 'Completed', 85),
    (3, 1, '2025-01-05 11:00:00', '2025-01-05 11:50:00', 'Completed', 100),
    (3, 2, '2025-01-06 09:00:00', '2025-01-06 10:00:00', 'Completed', 95),
    (4, 1, '2025-01-15 13:00:00', NULL, 'In Progress', 0);
