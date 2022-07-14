const Time = require("../models/time.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Time
  const time = new Time({
    emp_id: req.body.emp_id,
    work_code_id: req.body.work_code_id,
    source: req.body.source,
    endpoint: req.body.endpoint
  });

  // Save time in the database
  Time.create(time, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating time."
      });
    else res.send(data);
  });
};

// Retrieve all  from the database (with condition).
exports.findAll = (req, res) => {
  const emp_id = req.query.emp_id;

  Time.getAll(emp_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving time."
      });
    else res.send(data);
  });
};

// Find a single time by empID
exports.findOne = (req, res) => {
  Time.findById(req.params.empId, req.params.date, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found time with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving time with id " + req.params.empId
        });
      }
    } else res.send(data);
  });
};

// Update time identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Time.updateById(
    req.params.id,
    req.params.date,
    new Time(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found time with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating time with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  Tutorial.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete time with id " + req.params.id
        });
      }
    } else res.send({ message: `Time was deleted successfully!` });
  });
};

