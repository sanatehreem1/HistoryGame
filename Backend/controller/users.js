const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

async function register(req, res) {
    try {
        const data = req.body;

        if (!data.username || !data.password || !data.school) {
            throw new Error('Incorrect user details')
        }

        // Generate a salt with a specific cost
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

        // Hash the password
        data["password"] = await bcrypt.hash(data.password, salt);
        console.log(data)
        const result = await User.create(data);

        res.status(201).send(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function login(req, res) {
    try {
        const data = req.body
        const user = await User.getOneByUsername(data.username)
        if (!user) { throw new Error('User not found')}
        const match = await bcrypt.compare(data.password, user.password,)
        if (!match) { throw new Error('Invalid credentials')}

        if (match) {
            const payload = { username: user.username }
        const sendToken = (err, token) => {
            if(err){ throw new Error('Error in token generation') }
            res.status(200).json({
                success: true,
                token: token,
            });
        }
        }


        
    } catch (err) {
        
    }
}

module.exports = { register, login }