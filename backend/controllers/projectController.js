// ============================================
// Project Controller — Full CRUD
// ============================================
const { validationResult } = require('express-validator');
const Project = require('../models/Project');
const fs = require('fs');
const path = require('path');

/**
 * @route   GET /api/projects
 * @desc    Get all projects (with optional search & filter)
 * @access  Public
 */
const getProjects = async (req, res, next) => {
  try {
    const { search, category, featured } = req.query;
    let query = {};

    // Search by title or description
    if (search) {
      query.$text = { $search: search };
    }

    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }

    // Filter featured projects
    if (featured === 'true') {
      query.featured = true;
    }

    const projects = await Project.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/projects/:id
 * @desc    Get single project by ID
 * @access  Public
 */
const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/projects
 * @desc    Create a new project
 * @access  Private (Admin)
 */
const createProject = async (req, res, next) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        errors: errors.array(),
      });
    }

    // Parse technologies if sent as string
    let projectData = { ...req.body };
    if (typeof projectData.technologies === 'string') {
      projectData.technologies = projectData.technologies
        .split(',')
        .map((t) => t.trim());
    }

    // Parse features if sent as string
    if (typeof projectData.features === 'string') {
      projectData.features = projectData.features
        .split(',')
        .map((f) => f.trim());
    }

    // Handle image upload
    if (req.file) {
      projectData.image = req.file.filename;
    }

    const project = await Project.create(projectData);

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/projects/:id
 * @desc    Update a project
 * @access  Private (Admin)
 */
const updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    let updateData = { ...req.body };

    // Parse technologies if sent as string
    if (typeof updateData.technologies === 'string') {
      updateData.technologies = updateData.technologies
        .split(',')
        .map((t) => t.trim());
    }

    // Parse features if sent as string
    if (typeof updateData.features === 'string') {
      updateData.features = updateData.features
        .split(',')
        .map((f) => f.trim());
    }

    // Handle new image upload — delete old image if exists
    if (req.file) {
      if (project.image && project.image !== 'default-project.png') {
        const oldPath = path.join(__dirname, '..', 'uploads', project.image);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      updateData.image = req.file.filename;
    }

    project = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete a project
 * @access  Private (Admin)
 */
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Delete associated image
    if (project.image && project.image !== 'default-project.png') {
      const imagePath = path.join(__dirname, '..', 'uploads', project.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
