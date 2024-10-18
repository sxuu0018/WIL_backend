-- Create the User table
CREATE TABLE "User" (
    user_id SERIAL PRIMARY KEY,            -- Auto-incrementing primary key
    user_name VARCHAR(50) NOT NULL,        -- Username with a max length of 50 characters, cannot be null
    user_pass CHAR(64) NOT NULL,           -- Password stored as a fixed 64-character string, cannot be null
    is_admin BOOLEAN NOT NULL              -- Boolean to indicate if the user is an admin, cannot be null
);

-- Create the posts table with a foreign key to the User table
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,                 -- Auto-incrementing primary key
    created_at TIMESTAMPTZ,                -- Timestamp with timezone for when the post is created
    authorId INT REFERENCES "User"(user_id), -- Foreign key referencing the User table
    is_approved BOOLEAN,                   -- Boolean to indicate if the post is approved
    body TEXT,                             -- Text field for the body of the post
    title VARCHAR(100) NOT NULL,           -- Add title field, cannot be null
    is_deleted BOOLEAN DEFAULT FALSE       -- Add field to mark if the post is deleted, default is not deleted
);

-- Create the profiles table with a foreign key to the User table
CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,                 -- Auto-incrementing primary key
    user_id INT REFERENCES "User"(user_id), -- Foreign key referencing the User table
    is_admin BOOLEAN                       -- Boolean to indicate if the user is an admin in their profile
);

-- Create the comments table
CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,               -- Auto-incrementing primary key
    post_id INT REFERENCES posts(id),            -- Foreign key referencing the id in the posts table
    author_id INT REFERENCES "User"(user_id),    -- Foreign key referencing the user_id in the User table
    body TEXT NOT NULL,                          -- Comment content, cannot be null
    created_at TIMESTAMPTZ DEFAULT NOW(),        -- Timestamp for comment creation, defaults to current time
    is_deleted BOOLEAN DEFAULT FALSE             -- Marks if the comment is deleted
);

-- Create indexes for faster query performance on authorId and post_id in posts and comments tables
CREATE INDEX idx_posts_author ON posts (authorId);
CREATE INDEX idx_comments_author ON comments (author_id);
CREATE INDEX idx_comments_post ON comments (post_id);
