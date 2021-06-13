const express = require("express");
const Action = require("./actions-model");
const {
  validateActionId,
  validateAction,
} = require("../middleware/middleware");

const router = express.Router();

router.get("/", (req, res) => {
  Action.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      console.log("err:", err);
    });
});

router.get("/:id", validateActionId, (req, res) => {
  res.status(200).json(req.action);
});

router.post("/", validateAction, (req, res, next) => {
  Action.insert(req.body)
    .then((newAction) => {
      res.status(201).json(newAction);
    })
    .catch(next);
});

router.put("/:id", validateAction, validateActionId, (req, res, next) => {
  Action.update(req.params.id, req.body)
    .then((thisUpdated) => {
      res.status(201).json(thisUpdated);
    })
    .catch(next);
});

router.delete("/:id", validateActionId, (req, res, next) => {
  Action.remove(req.params.id)
    .then((deleteActions) => {
      res.status(201).json(deleteActions);
    })
    .catch(next);
});

module.exports = router;