const Character = require('../../../models/Character')
const db = require('../../../database/connection')

describe('Character', () => {
    beforeEach(() => jest.clearAllMocks())
    
    afterAll(() => jest.resetAllMocks())
})

describe('constructor', () => {
    it('creates a Character instance from database', () => {
        const row = {
            character_id: 1,
            name: 'Ghost',
            early_life: 'Unknown',
            marriage:'None',
            fun_fact:'blabla',
            death: 'mysterious',
            haunting_motives: 'revenge',
            correct_answer: true,
            image_url: 'wife.png',
            story_id: 2

        }

        const character = new Character(row)

        expect(character).toBeInstanceOf(Character)
        expect(character.character_id).toBe(1)
        expect(character.name).toBe('Ghost')
        expect(character.haunting_motives).toBe('revenge')
        expect(character.story_id).toBe('2')
    })
})

describe('getAll', () => {
    it('retuns an array of Character', async () => {
        const mockRows = [
            {
            character_id: 1,
            name: 'Ghost A',
            early_life: 'hmm',
            marriage:'ok',
            fun_fact:'fun',
            death: 'unknown',
            haunting_motives: 'fear',
            correct_answer: false,
            image_url: 'b.png',
            story_id: 1
            }
        ]

        jest.spyOn(db, 'query').mockResolvedValueOnce({rows: mockRows})

        const result = await Character.getAll()
        expect(db.query).toHaveBeenCalledTimes(1)
        expect(result.length).toBe(1)
        expect(character.name).toBe('Ghost')
        expect(result[0]).toBeInstanceOf(Character)
        expect(result[0].name).toBe('Ghost A')

    })
})

describe('getOneByID', () => {
    it('returns a Character when found', async () => {
        const mockRow = {   
            character_id: 2,
            name: 'Ghost B',
            early_life: 'zzz',
            marriage: null,
            fun_fact:'creepy',
            death: 'idk',
            haunting_motives: 'justice',
            correct_answer: false,
            image_url: 'c.png',
            story_id: 3
        }

        jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [mockRow]} )
        const result= await Character.getOneByID(2)
        expect(result).toBeInstanceOf(Character)
        expect(result.name).toBe('Ghost B')
    })
    
    it('throwns an error when character is not found', async () => {
        jest.spyOn(db,'query').mockResolvedValueOnce({rows: []})

        await expect(Character.getOneByID(999).rejects.toThrow('Unable to locate character'))
    })
})


