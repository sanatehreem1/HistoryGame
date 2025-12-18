const Story = require("../../../models/Story");
const db = require("../../../database/connection");

describe("Story", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("constructor", () => {
    it("creates a Story instance from database", () => {
      const row = {
        story_id: 1,
        story_title: "Haunted House",
        story_outline: "A spooky tale",
        riddle_text: "Lalalalala",
      };

      const story = new Story(row);

      expect(story).toBeInstanceOf(Story);
      expect(story.story_id).toBe(1);
      expect(story.story_title).toBe("Haunted House");
      expect(story.story_outline).toBe("A spooky tale");
      expect(story.riddle_text).toBe("Lalalalala");
    });
  });

    describe("getAll", () => {
    it("returns an array of Story", async () => {
      const mockRows = [
        {
          story_id: 1,
          story_title: "Haunted Castle",
          story_outline: "A chilling adventure",
          riddle_text: "Riddle me this"
        }
      ]

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockRows })

      const result = await Story.getAll()
      expect(db.query).toHaveBeenCalledTimes(1)
      expect(result.length).toBe(1)
      expect(result[0]).toBeInstanceOf(Story)
      expect(result[0].story_title).toBe("Haunted Castle")
    }); 
  });

    describe("getOneByID", () => {
        it('returns a Story instance when found', async () => {
            const mockRow = {
                story_id: 1,
                story_title: 'Haunted Castle',
                story_outline: 'A chilling adventure',
                riddle_text: 'Riddle me this'
            }

            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: [mockRow]})
            const result = await Story.getOneByID(1)
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM stories WHERE story_id = $1;", [1])
            expect(result).toBeInstanceOf(Story)
            expect(result.story_title).toBe('Haunted Castle')
        });
    }); 

    it('throws an error when Story not found', async () => {
        jest.spyOn(db, 'query').mockResolvedValueOnce({rows: []})
        await expect(Story.getOneByID(999)).rejects.toThrow("Unable to locate story!!")
    });
});