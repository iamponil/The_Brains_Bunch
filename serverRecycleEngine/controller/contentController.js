const Story = require('../models/story');
const User=require('../models/user')
const createContent = async (req, res) => {
  const {content} = req.body;
  try {

    const story = new Story({
      content
    });

    await story.save();
    res.json(story);
   // res.status(201).json({ message: 'Content saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while saving content' });
  }
};

module.exports = {
  createContent,
};
