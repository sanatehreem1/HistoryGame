const characterController = require('../../../controller/characters')
const Character = require('../../../models/Character')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

const mockStatus = jest.fn(() => ({
    json: mockSend
}));


const mockRes = { status: mockStatus }

describe('Character controller', () => {
    beforeEach(() => jest.clearAllMocks())
    afterAll(() => jest.resetAllMocks())

    describe('index', () => {
        it('should return characters with a status code 200', async () => {
            const testCharacters = ['c1', 'c2']
            jest.spyOn(Character, 'getAll').mockResolvedValue(testCharacters)

            await characterController.index(null, mockRes)

            expect(Character.getAll).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockSend).toHaveBeenCalledWith(testCharacters)
        })

        it('should return an error upon failure', async () => {
            jest.spyOn(Character, 'getAll').mockRejectedValue(new Error('Something happened to your db'))

            await characterController.index(null, mockRes)

            expect(Character.getAll).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(500)
            expect(mockSend).toHaveBeenCalledWith({ error: 'Something happened to your db' })



        })

    })
    describe('show', () => {
        let testCharacter, mockReq;

        beforeEach(() => {
            testCharacter = { name: "testWife", early_life: "testEarly", marriage: "testMarriage", fun_fact: "testFact", death: "testDeath", haunting_motives: "testHaunt", correct_answer: "TRUE", image_url: "test.jpg", story_id: "1" }
            mockReq = { params: { id: 1 } }
        });

        it('should return a char with a 200 status code', async () => {
            jest.spyOn(Character, 'getOneByID').mockResolvedValue(new Character(testCharacter))

            await characterController.show(mockReq, mockRes);

            expect(Character.getOneByID).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockSend).toHaveBeenCalledWith(new Character(testCharacter))
        })

        it('should return an error if the char is not found', async () => {
            jest.spyOn(Character, 'getOneByID').mockRejectedValue(new Error('oh no'))

            await characterController.show(mockReq, mockRes)

            expect(Character.getOneByID).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockSend).toHaveBeenCalledWith({ error: 'oh no' })
        })
    })
    describe('getStory', () => {
        let testCharacter, mockReq;

        beforeEach(() => {
            testCharacter = { name: "testWife", early_life: "testEarly", marriage: "testMarriage", fun_fact: "testFact", death: "testDeath", haunting_motives: "testHaunt", correct_answer: "TRUE", image_url: "test.jpg", story_id: "1" }
            mockReq = { params: { id: 1 } }
        });

        it('should return a char with a 200 status code', async () => {
            jest.spyOn(Character, 'getAllByStory').mockResolvedValue(new Character(testCharacter))

            await characterController.getStory(mockReq, mockRes);

            expect(Character.getAllByStory).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockSend).toHaveBeenCalledWith(new Character(testCharacter))
        })

        it('should return an error if the char is not found', async () => {
            jest.spyOn(Character, 'getAllByStory').mockRejectedValue(new Error('oh no'))

            await characterController.getStory(mockReq, mockRes)

            expect(Character.getAllByStory).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(500)
            expect(mockSend).toHaveBeenCalledWith({ error: 'oh no' })
        })
    })
})