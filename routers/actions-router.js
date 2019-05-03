const router = require("express").Router();

const Actions = require("../models/actions-model.js");

router.get("/", (req, res) => {
  Actions.getActions()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "We ran into an error retrieving the action" });
    });
});

router.get("/:id", (req, res) => {
  Actions.getById(req.params.id)
    .then(action => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({ message: "We could not find the action" });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "We ran into an error retrieving the action" });
    });
});

router.post("/", (req, res) => {
  Actions.addAction(req.body)
    .then(action => {
      if (
        action.description ||
        action.notes ||
        action.completed ||
        action.project_id
      ) {
        res.status(201).json(action);
      } else {
        res.status(400).json({
          message: "Please provide the necessary information for the action"
        });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "We ran into an error retrieving the action" });
    });
});

router.put("/:id", (req, res) => {
  Actions.update(req.params.id, req.body)
    .then(action => {
      if (
        action.description ||
        action.notes ||
        action.completed ||
        action.project_id
      ) {
        res.status(201).json(action);
      } else {
        res.status(404).json({
          message: "That action does not exist"
        });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "We ran into an error retrieving the action" });
    });
});

router.delete("/:id", (req, res) => {
  Actions.remove(req.params.id)
    .then(action => {
      if (action) {
        res.status(200).json({ message: "The action has been deleted" });
      } else {
        res.status(404).json({ message: "We could not find the action" });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "We ran into an error retrieving the action" });
    });
});

module.exports = router;
