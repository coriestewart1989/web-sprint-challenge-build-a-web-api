const express = require("express");
const Project = require("./projects-model");
const {
  validateProjectId,
  validateProject,
} = require("../middleware/middleware");

const router = express.Router();

router.get("/", (req, res) => {
  Project.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      console.log("err:", err);
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

router.post("/", validateProject, (req, res) => {
  Project.insert(req.body)
    .then((newProject) => {
      res.status(201).json(newProject);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.put("/:id", validateProject, validateProjectId, (req, res) => {
  Project.update(req.params.id, req.body)
    .then((thisUpdated) => {
      res.status(201).json(thisUpdated);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.delete("/:id", validateProjectId, (req, res) => {
  Project.remove(req.params.id)
    .then((deletedProjects) => {
      res.status(204).json(deletedProjects);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.get("/:id/actions", validateProjectId, (req, res) => {
  Project.getProjectActions(req.params.id)
    .then((projectActions) => {
      res.status(200).json(projectActions);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

module.exports = router;