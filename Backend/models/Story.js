const db = require('../database/connection');

class Story{
    constructor({ story_id, story_title, story_outline, riddle_text}){
        this.story_id = story_id;
        this.story_title = story_title;
        this.story_outline = story_outline;
        this.riddle_text = riddle_text;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM stories;");
        return response.rows.map(p => new Story(p));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM stories WHERE story_id = $1;", [story_id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate story!!")
        }
        return new Story(response.rows[0]);
    }
}

module.exports = Story;