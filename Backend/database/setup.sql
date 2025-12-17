DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS characters;
DROP TABLE IF EXISTS stories;

CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    school VARCHAR(80),
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
    image_url TEXT,
    story_id INT,
    PRIMARY KEY (character_id),
    FOREIGN KEY (story_id) REFERENCES stories(story_id)
);

INSERT INTO stories (story_title, story_outline, riddle_text)
VALUES
('The Haunted Manor',

'The royal court is restless.
Whispers echo through the corridors of Whitehall Palace, candles flicker without wind, and servants claim to have seen a shadow roaming the halls after midnight.

One of Henry VIII’s six wives is said to be haunting the court, bound by unfinished business, betrayal, or an untimely death.

Your task is to uncover which wife is haunting the palace.

Explore the profiles of Henry’s wives, study their lives, marriages, and deaths, and use the clues provided to narrow down the culprit. Only one wife fits all the clues.

Choose carefully — history holds the answers.',
'Clue 1: The haunting wife did not die of natural causes.
Clue 2: She was married to Henry VIII for fewer than four years.
Clue 3: Her death was directly linked to accusations made against her.
Clue 4: She never gave birth to a surviving son.
Clue 5: Her downfall had consequences that extended beyond her own death.
Only one wife matches all of these clues. Who is she?');

INSERT INTO characters (name, early_life, marriage, fun_fact, death, haunting_motives, correct_answer, image_url, story_id)
VALUES
('Catherine of Aragon', 
'Catherine was born in Spain to powerful Catholic monarchs, Ferdinand II of Aragon and Isabella I of Castile. She was highly educated, fluent in several languages, and raised to be a queen from a young age.',
'Catherine was first married to Henry\s older brother, Arthur. After Arthur\s death, she later married Henry VIII and served as Queen of England for over 20 years. Their marriage deteriorated when Catherine failed to produce a surviving male heir.',
'She acted as regent while Henry was at war in France and oversaw the English victory at the Battle of Flodden.',
'Catherine died in 1536 after a long period of illness.',
'If she were haunting the court, it would be due to betrayal, as she was cast aside after years of loyal service and denied recognition as queen.)',
FALSE, '../FrontendImages/CatherineAragon.jpg', 1),

('Anne Boleyn',
'Anne grew up in European royal courts, receiving an advanced education in France and the Netherlands. She was known for her intelligence, charm, and strong personality.',
'Anne’s marriage to Henry VIII led to England breaking away from the Catholic Church. Their relationship quickly soured after she failed to produce a male heir.',
'Anne was the mother of Elizabeth I, one of England’s greatest monarchs.',
'Anne was executed by beheading in 1536 after being accused of adultery, incest, and treason.',
'Anne’s spirit would haunt the court seeking justice, believing she was falsely accused and betrayed by the king she once loved.',
TRUE, '../FrontendImages/AnneBoleyn.jpg', 1),

('Jane Seymour',
'Jane came from a modest noble family and was known for her quiet nature and traditional values.',
'She married Henry shortly after Anne Boleyn’s execution and was favoured for her obedience and calm temperament.',
'Jane was Henry VIII’s only wife to give him a legitimate male heir, Edward VI.',
'Jane died in 1537 from complications following childbirth.',
'If haunting, her motive would be sorrow over dying young and never seeing her son grow up.'
,FALSE, '../FrontendImages/JaneSeymour.webp', 1),

('Anne of Cleves',
'Anne was raised in a strict German court and received little formal education compared to Henry’s other wives.',
'Henry married Anne for political reasons but found her unattractive. Their marriage was never consummated and was quickly annulled.',
'She outlived all of Henry’s other wives and remained on friendly terms with him.',
'Anne died peacefully of natural causes in 1557.',
'She has little reason to haunt the court, having survived the marriage and lived comfortably afterward.',
FALSE, '../FrontendImages/AnneOfCleves.jpg', 1),

('Catherine Howard',
'Catherine grew up in a chaotic household with little supervision and received minimal education.',
'She was young when she married Henry VIII, who was much older and in poor health. Her past relationships and alleged affairs caused scandal.',
'She was a cousin of Anne Boleyn.',
'Catherine was executed in 1542 after being accused of adultery.',
'Her spirit would haunt the palace out of fear and injustice, punished harshly for mistakes made in youth.',
FALSE, '../FrontendImages/CatherineHoward.webp', 1),

('Catherine Parr',
'Catherine was highly educated and deeply interested in religion and learning.',
'She was Henry’s final wife and acted as nurse and regent during his final years.',
'She helped reconcile Henry with his daughters Mary and Elizabeth.',
'Catherine died from complications following childbirth after Henry’s death.',
'If haunting, it would be due to unfinished work in reform and education rather than anger or betrayal.',
FALSE, '../FrontendImages/CatherineParr.jpg', 1);