const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// @route   GET /api/projects
// @desc    Get all projects or filter by userId, category, or techStack
router.get('/', async (req, res) => {
  try {
    let query = {};
    
    if (req.query.userId) {
      query.userId = req.query.userId;
    }
    
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    if (req.query.techStack) {
      query.techStack = { $in: [req.query.techStack] };
    }

    const projects = await Project.find(query).populate('userId', 'name branch profilePic').sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/projects/:id
// @desc    Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('userId', 'name branch profilePic');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/projects
// @desc    Create a new project
router.post('/', async (req, res) => {
  const project = new Project({
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description,
    techStack: req.body.techStack,
    repoLink: req.body.repoLink,
    demoLink: req.body.demoLink,
    imageUrl: req.body.imageUrl,
    category: req.body.category
  });

  try {
    const newProject = await project.save();
    const populatedProject = await Project.findById(newProject._id).populate('userId', 'name branch profilePic');
    res.status(201).json(populatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/projects/:id
// @desc    Update project
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (req.body.title) project.title = req.body.title;
    if (req.body.description) project.description = req.body.description;
    if (req.body.techStack) project.techStack = req.body.techStack;
    if (req.body.repoLink !== undefined) project.repoLink = req.body.repoLink;
    if (req.body.demoLink !== undefined) project.demoLink = req.body.demoLink;
    if (req.body.imageUrl !== undefined) project.imageUrl = req.body.imageUrl;
    if (req.body.category !== undefined) project.category = req.body.category;

    const updatedProject = await project.save();
    const populatedProject = await Project.findById(updatedProject._id).populate('userId', 'name branch profilePic');
    res.json(populatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    await project.deleteOne();
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
