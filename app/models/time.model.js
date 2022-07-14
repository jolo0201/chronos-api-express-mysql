const sql = require("./db.js");

// constructor
const Time = function(time) {
  this.emp_id = time.emp_id;
  this.work_code_id = time.work_code_id;
  this.source = time.source;
  this.endpoint = time.endpoint;
};

Time.create = (newTime, result) => {
  console.log(newTime)
  let sqlString = "CALL Chronos_GenerateTimeLogs(?,?,?,?)"
  sql.query(sqlString,
    [newTime.emp_id, newTime.work_code_id, newTime.source, newTime.endpoint],
    (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: "Time log successfully created", ...newTime });
  });
};

Time.findById = (empId, date, result) => {

  sql.query(`SELECT * FROM time_logger WHERE emp_id = ? AND date = ?`,[empId, date], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found time: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found with the id
    result({ kind: "not_found" }, null);
  });
};

Time.getAll = (emp_id, result) => {
  let query = "SELECT * FROM time_logger";

  if (emp_id) {
    query += ` WHERE emp_id LIKE '%${emp_id}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("time: ", res);
    result(null, res);
  });
};


Time.updateById = (emp_id, date, timebody, result) => {
  sql.query(
    "UPDATE time_logger SET date = ?, time = ?, work_code_id = ? WHERE emp_id = ? AND date = ?",
    [timebody.date, tutorial.time, tutorial.work_code_id, emp_id,date],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated time: ", { id: id, ...tutorial });
      result(null, { id: id, ...tutorial });
    }
  );
};

Time.remove = (emp_id,date, result) => {
  sql.query("DELETE FROM time_logger WHERE id = ? AND date = ?", emp_id, date, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // id not found
      result({ kind: "not_found" }, null);
      return;
    }

    console.log(`deleted time of Employee: ${emp_id}, dated: {date}`);
    result(null, res);
  });
};

module.exports = Time;
