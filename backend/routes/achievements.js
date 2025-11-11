const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');

// @route   GET /api/achievements
// @desc    Get all achievements or filter by userId
router.get('/', async (req, res) => {
  try {
    let query = {};
    
    if (req.query.userId) {
      query.userId = req.query.userId;
    }

    const achievements = await Achievement.find(query).populate('userId', 'name branch profilePic').sort({ date: -1 });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/achievements/:id
// @desc    Get achievement by ID
router.get('/:id', async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id).populate('userId', 'name branch profilePic');
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    res.json(achievement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/achievements
// @desc    Create a new achievement
router.post('/', async (req, res) => {
  const achievement = new Achievement({
    userId: req.body.userId,
    title: req.body.title,
    date: req.body.date,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    category: req.body.category
  });

  try {
    const newAchievement = await achievement.save();
    const populatedAchievement = await Achievement.findById(newAchievement._id).populate('userId', 'name branch profilePic');
    res.status(201).json(populatedAchievement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/achievements/:id
// @desc    Update achievement
router.put('/:id', async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    if (req.body.title) achievement.title = req.body.title;
    if (req.body.date) achievement.date = req.body.date;
    if (req.body.description) achievement.description = req.body.description;
    if (req.body.imageUrl !== undefined) achievement.imageUrl = req.body.imageUrl;
    if (req.body.category !== undefined) achievement.category = req.body.category;

    const updatedAchievement = await achievement.save();
    const populatedAchievement = await Achievement.findById(updatedAchievement._id).populate('userId', 'name branch profilePic');
    res.json(populatedAchievement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/achievements/:id
// @desc    Delete achievement
router.delete('/:id', async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    await achievement.deleteOne();
    res.json({ message: 'Achievement deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
