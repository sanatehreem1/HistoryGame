DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS characters;
DROP TABLE IF EXISTS stories;

CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    score INT,
    PRIMARY KEY (user_id)
);


CREATE TABLE stories (
    story_id INT GENERATED ALWAYS AS IDENTITY,
    story_title TEXT NOT NULL,
    story_outline TEXT NOT NULL,
    riddle_text TEXT NOT NULL,
    PRIMARY KEY (story_id)
);

CREATE TABLE characters (
    character_id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) UNIQUE NOT NULL,
    early_life VARCHAR(1000),
    marriage VARCHAR(1000),
    fun_fact VARCHAR (1000),
    death VARCHAR (1000),
    haunting_motives VARCHAR (1000),
    correct_answer BOOLEAN,
    story_id INT,
    PRIMARY KEY (character_id),
    FOREIGN KEY (story_id) REFERENCES stories(story_id)
);


