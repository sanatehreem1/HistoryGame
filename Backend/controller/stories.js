const Story = require('../models/Story')

const getStories = async (req, res) => {
    try {
        const story = await Story.getAll()
        if (!story){ return res.status(404).json({ error : 'Stories not found'})}
        res.status(200).json(story)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

const getStoryByID = async (req, res) => {
    try {
        const story = await Story.getOneByID(req.params.id)
        if (!story){ return res.status(404).json({ error : 'Story not found'})
        }
        res.status(200).json(story)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getStoryByID,
    getStories
}