// ============================================
// Skill Controller — CRUD for developer skills
// ============================================
const Skill = require('../models/Skill');

/**
 * @route   GET /api/skills
 * @desc    Get all skills (grouped by category)
 * @access  Public
 */
const getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ category: 1, order: 1 });

    res.status(200).json({
      success: true,
      count: skills.length,
      data: skills,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/skills
 * @desc    Add a new skill
 * @access  Private (Admin)
 */
const createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Skill added successfully',
      data: skill,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/skills/:id
 * @desc    Update a skill
 * @access  Private (Admin)
 */
const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Skill updated successfully',
      data: skill,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/skills/:id
 * @desc    Delete a skill
 * @access  Private (Admin)
 */
const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Skill deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };
