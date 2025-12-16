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
        const result = await User.create(data);

        res.status(201).send(result);
    } catch (err) {
        if (err.message.includes('already taken')) {
            return res.status(409).json({ error: err.message });
        }
        res.status(500).json({ error: 'Registration failed: ' + err.message });
    }
}

async function login(req, res) {
    try {
        const data = req.body
        
        if (!data.username || !data.password) {
            throw new Error('Please provide username and password')
        }

        const user = await User.getOneByUsername(data.username)
       
        const match = await bcrypt.compare(data.password, user.password)
        if (!match) { throw new Error('Invalid credentials')}
        
        const payload = { 
            user_id: user.user_id,
            username: user.username }
        
        const sendToken = (err, token) => {
            if(err){ throw new Error('Error in token generation') }
            res.status(200).json({
                success: true,
                token: token,
            });
        }

         jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: 3600 }, sendToken);

      } catch (err) {
        res.status(401).json({ error: err.message });
    }
}

module.exports = { register, login }