const db = require('../database/connection');

class User{
    constructor({user_id, username, password, school, score}) {
        this.user_id = user_id;
        this.username = username;
        this.password = password;
        this.school = school;
        this.score = score || 0;
    }

    static async getAll(){
        const response = await db.query("SELECT * FROM users;");
        return response.rows.map(p => new User(p));
    }

    static async getOneByID(id){
        const response = await db.query("SELECT * FROM users WHERE user_id = $1;", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user!!")
        }
        return new User(response.rows[0]);
    };

    static async getOneByUsername(name) {
        const response = await db.query("SELECT * FROM users WHERE username = $1", [name]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async create(data) {
        const { username, password, school } = data;
        let alreadyExists = await db.query('SELECT * FROM users WHERE username = $1;' [username]);
        if (alreadyExists.rows.length > 0){
            throw new Error('Username already taken!')
        }
        let response = await db.query("INSERT INTO user_account (username, password, school) VALUES ($1, $2, $3) RETURNING user_id;",
            [username, password, school]);
        const newId = response.rows[0].user_id;
        const newUser = await User.getOneByID(newId);
        return newUser;
    }
}

module.exports = User;