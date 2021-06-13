const Action = require("../actions/actions-model");
const Project = require("../projects/projects-model");

const validateProjectId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.get(id);
    if (!project) {
      res.status(404).json({ message: "so this really isnt working then?" });
    } else {
      req.project = project;
      next();
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
};

const validateActionId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const action = await Action.get(id);
    if (!action) {
      res
        .status(404)
        .json({ message: "No Action with the provided ID found." });
    } else {
      req.action = action;
      next();
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const validateProject = (req, res, next) => {
  const { name, description } = req.body;
  if (!name || !description) {
    res
      .status(400)
      .json({ message: "Please be sure to include name and description." });
  } else {
    req.name = name;
    req.description = description;
    next();
  }
};

const validateAction = (req, res, next) => {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    res.status(400).json({
      message:
        "Please be sure to include a project id, a description, and notes.",
    });
  } else {
    req.project_id = project_id;
    req.description = description;
    req.notes = notes;
    next();
  }
};

module.exports = {
  validateProjectId,
  validateActionId,
  validateProject,
  validateAction,
};