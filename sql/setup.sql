-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS github_users, posts CASCADE;

CREATE TABLE github_users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT,
  avatar TEXT  
);

CREATE TABLE posts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR,
  content VARCHAR(255), 
  user_id BIGINT,
  FOREIGN KEY (user_id) REFERENCES github_users(id)
);

INSERT INTO github_users (username, email, avatar) VALUES
('Piper-Bellingham', 'Piper@Bellingham.com', 'https://fillmurray.com/200/300'),
('Adam-Driver', 'Kylo@Ren.com', 'https://www.fillmurray.com/g/200/300');


INSERT INTO posts (title, content, user_id) VALUES
('Good Morning!', 'The sun is shining, the birds are singing and you are a spectacular person. Keep it up!', 1),
('Mary Oliver got it right!', 'I do know how to pay attention, how to fall down into the grass... how to be idle and blessed.', 2);