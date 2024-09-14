-- Create the User table
CREATE TABLE user (
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
    body TEXT                              -- Text field for the body of the post
);

-- Create the profiles table with a foreign key to the User table
CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,                 -- Auto-incrementing primary key
    user_id INT REFERENCES "User"(user_id), -- Foreign key referencing the User table
    is_admin BOOLEAN                       -- Boolean to indicate if the user is an admin in their profile
);
