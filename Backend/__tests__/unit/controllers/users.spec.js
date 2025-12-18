const { register, login } = require('../../../controller/users')
const User = require('../../../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../../../models/User');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('User Controller', () => {
    let req, res;

    beforeEach(() => {
        req = { body: {}};
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn()
        };
        jest.clearAllMocks();
    });

    describe('register', () => {
        it('should register a new user successfully', async () => {
            // setup test data
            req.body = { username: 'testuser', password: 'password', school: 'Test School' };
            const mockUser = { id: 1, username: 'testuser', school: 'Test School' };
            
            bcrypt.genSalt.mockResolvedValue('salt');
            bcrypt.hash.mockResolvedValue('hashedpassword');
            User.create.mockResolvedValue(mockUser);

            // call register function
            await register(req, res);

            // verify response
            expect(bcrypt.genSalt).toHaveBeenCalled();
            expect(bcrypt.hash).toHaveBeenCalledWith('password', 'salt');
            expect(User.create).toHaveBeenCalledWith({ username: 'testuser', password: 'hashedpassword', school: 'Test School' });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith(mockUser);
        })

         it('should return 500 if username is missing', async () => {
            req.body = { password: 'password123', school: 'TestSchool' };

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ 
                error: 'Registration failed: Incorrect user details' 
          });
        });

        it('should return 500 if password is missing', async () => {
            req.body = { username: 'testuser', school: 'TestSchool' };

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                error: 'Registration failed: Incorrect user details'
            })
        })

        it('should return 500 if school is missing', async () => {
            req.body = { username: 'testuser', password: 'password123' };

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ 
                error: 'Registration failed: Incorrect user details' 
            });
        });

        it('should return 409 if username already exists', async () => {
            req.body = { username: 'testuser', password: 'password', school: 'TestSchool' };

            bcrypt.genSalt.mockResolvedValue('salt');
            bcrypt.hash.mockResolvedValue('hashedpassword');
            User.create.mockRejectedValue(new Error('Username already taken!'));

            await register(req, res);

            expect(bcrypt.genSalt).toHaveBeenCalled();
            expect(bcrypt.hash).toHaveBeenCalledWith('password', 'salt');
            expect(User.create).toHaveBeenCalledWith({ username: 'testuser', password: 'hashedpassword', school: 'TestSchool' });
            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith({ error: 'Username already taken!' });
        });
    });

    
    describe('login', () => {
        it('should login user successfully', async () => {
            req.body = { username: 'testuser', password: 'password', school: 'TestSchool' };
            const mockUser = { user_id: 1, username: 'testuser', password: 'hashedpassword', school: 'TestSchool' };
            
            User.getOneByUsername.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockImplementation((payload, secret, options, callback) => callback(null, 'mocktoken'));

            await login(req, res);

            expect(User.getOneByUsername).toHaveBeenCalledWith('testuser');
            expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashedpassword');
            expect(jwt.sign).toHaveBeenCalledWith( { user_id: 1, username: 'testuser'}, process.env.SECRET_TOKEN, { expiresIn: 3600 }, expect.any(Function));
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ success: true, token: 'mocktoken', user: { user_id: 1, username: 'testuser', school: 'TestSchool' }  }); 
        }
        )
    })
});

