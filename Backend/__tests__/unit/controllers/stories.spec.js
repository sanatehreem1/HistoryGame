const storyController = require('../../../controller/stories');
const Story = require('../../../models/Story');

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

const mockStatus = jest.fn(() => ({ 
    json: mockSend
}));

const mockRes = { status: mockStatus };

describe('Stories controller', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('index', () => {
        it('should return all stories with a status code 200', async () => {
            const testStories = ['s1', 's2']
            jest.spyOn(Story, 'getAll').mockResolvedValue(testStories)

            await storyController.getStories(null, mockRes)

            expect(Story.getAll).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockSend).toHaveBeenCalledWith(testStories)
        })

        it('should return an error upon failure', async () => {
            jest.spyOn(Story, 'getAll').mockRejectedValue(new Error('Alert!'))

            await storyController.getStories(null, mockRes)

            expect(Story.getAll).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(500)
            expect(mockSend).toHaveBeenCalledWith({error: 'Alert!'})

        })
    })

    describe('show', () => {
        let testStory, mockReq

        beforeEach(() => {
            testStory = { 
                story_id: 1,
                story_title: 'a',
                story_outline: 'a',
                riddle_text: 'a'}
            mockReq = {params: { id: 1 } }
        })

        it('should return a story with a status code 200', async () => {
            jest.spyOn(Story, 'getOneByID').mockResolvedValue(new Story(testStory))

            await storyController.getStoryByID(mockReq, mockRes)

            expect(Story.getOneByID).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockSend).toHaveBeenCalledWith(new Story(testStory))
        })

        it('should return error if story is not found', async () => {
            jest.spyOn(Story, 'getOneByID').mockRejectedValue(new Error('Alert!'))

            await storyController.getStoryByID(mockReq, mockRes)

            expect(Story.getOneByID).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(500)
            expect(mockSend).toHaveBeenCalledWith({error: 'Alert!'})
        })
    })
})