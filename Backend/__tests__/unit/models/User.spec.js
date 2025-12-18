const User = require('../../../models/User')
const db = require('../../../database/connection')

describe('User', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

   

    describe('getAll', () => {
        it('resolves with users on successful db query', async () => {
            const mockUsers = [
                { user_id: 1, username: "testUser1", password: "testPassword1", school: "testSchool1" },
                { user_id: 2, username: "testUser2", password: "testPassword2", school: "testSchool2" },
                { user_id: 3, username: "testUser3", password: "testPassword3", school: "testSchool3" }
            ]
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: mockUsers })

            const users = await User.getAll();

            expect(users).toHaveLength(3);
            expect(users[0]).toHaveProperty('user_id')
            expect(users[0].username).toBe('testUser1')
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM users;")

        })
    })

    describe('getOneByID', () => {
        it('resolves with user on successful db query', async () => {
            const testUser = { user_id: 1, username: "testUser", password: "testPassword", school: "testSchool" }
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [testUser] })

            const result = await User.getOneByID(1)

            expect(result).toBeInstanceOf(User)
            expect(result.username).toBe('testUser')
            expect(result.password).toBe('testPassword')
            expect(db.query).toHaveBeenCalledWith('SELECT * FROM users WHERE user_id = $1;', [1])

        })
        it('should throw an Error when user is not found', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] })

            await expect(User.getOneByID(122231)).rejects.toThrow("Unable to locate user!!")
        })
    })
    describe('getOneByUsername', () => {
        it('resolves with a user on successful db query', async () => {
            const testUser = { user_id: 1, username: "testUser", password: "testPassword", school: "testSchool" }
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [testUser] })

            const result = await User.getOneByUsername('testUser')

            expect(result).toBeInstanceOf(User)
            expect(result.username).toBe('testUser')
            expect(result.password).toBe('testPassword')
            expect(db.query).toHaveBeenCalledWith('SELECT * FROM users WHERE username = $1', [testUser.username])

        })
        it('should throw an Error when user is not found', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] })

            await expect(User.getOneByUsername('notTestUser')).rejects.toThrow("Unable to locate user.")
        })
    })
        describe('create', () => {
             beforeEach(() => {
                jest.clearAllMocks()
            })

             
            it('creates a new user when username is not taken', async () => {
                
                const userData = {username: "testUser", password:"testPassword", school:"testSchool"}
                
                
                jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: []})
                .mockResolvedValueOnce({rows : [{ user_id: 1}]})
                

                const mockUser = {
                    user_id:1,
                    username: 'testUser',
                    password: 'testPassword',
                    school: 'testSchool'
                }

                jest.spyOn(User, 'getOneByID').mockResolvedValue(mockUser)
                const result = await User.create(userData)
                
                expect(db.query).toHaveBeenCalledTimes(2)
                expect(result).toEqual(mockUser)
                expect(db.query).toHaveBeenNthCalledWith(1, 'SELECT * FROM users WHERE username = $1;', ['testUser'])
                expect(db.query).toHaveBeenNthCalledWith(2,'INSERT INTO users (username, password, school) VALUES ($1, $2, $3) RETURNING user_id;', ['testUser', 'testPassword', 'testSchool'])
                expect(User.getOneByID).toHaveBeenCalledWith(1)
            })
        })
    })



