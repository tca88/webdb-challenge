const router = require("express").Router();

const Projects = require("../models/projects-model.js");

router.get("/", (req, res) => {
  Projects.getProjects()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "We ran into an error retrieving the project" });
    });
});

router.get("/:id", (req, res) => {
  Projects.getById(req.params.id)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: "We could not find the project" });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "We ran into an error retrieving the project" });
    });
});

router.get("/:id/actions", (req, res) => {
  Projects.getActionsByProject(req.params.id)
    .where({ project_id: req.params.id })
    .then(actions => {
      if (actions) {
        Projects.getById(req.params.id).then(project => {
          const data = { ...project, actions: actions };
          res.status(200).json(data);
        });
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "We ran into an error retrieving the project" });
    });
});

router.post("/", (req, res) => {
  Projects.addProject(req.body)
    .then(project => {
      if (project.name || project.description || project.completed) {
        res.status(201).json(project);
      } else {
        res.status(400).json({
          message: "Please provide the necessary information for the project"
        });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "We ran into an error retrieving the project" });
    });
});

router.put("/:id", (req, res) => {
  Projects.update(req.params.id, req.body)
    .then(project => {
      if (project.name || project.description || project.completed) {
        res.status(201).json(project);
      } else {
        res.status(404).json({
          message: "That project does not exist"
        });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "We ran into an error retrieving the project" });
    });
});

router.delete("/:id", (req, res) => {
  Projects.remove(req.params.id)
    .then(project => {
      if (project) {
        res.status(200).json({ message: "The project has been deleted" });
      } else {
        res.status(404).json({ message: "We could not find the project" });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "We ran into an error retrieving the project" });
    });
});

module.exports = router;
