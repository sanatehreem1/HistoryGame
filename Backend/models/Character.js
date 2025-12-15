const db = require('../database/connection');

class Character {
    constructor({character_id, name, early_life, marriage, fun_fact, death, haunting_motives, correct_answer, story_id}) {
        this.character_id = character_id
        this.name = name
        this.early_life = early_life
        this.marriage = marriage
        this.fun_fact = fun_fact
        this.death = death
        this.haunting_motives = haunting_motives
        this.correct_answer = correct_answer
        this.story_id = story_id
    }

    static async getAll(){
        const response = await db.query("SELECT * FROM characters;");
        return response.rows.map(p => new Character(p));
    }

    static async getOneByID(){
        const response = await db.query("SELECT * FROM characters WHERE character_id = $1;", [character_id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate character!!")
        }
        return new Character(response.rows[0]);
    };
}