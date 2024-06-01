const express = require("express");
const app = express();
const fs = require("fs");

// displays all the employees info
app.get("/api/employees", (req, res) => {
  fs.readFile("./hard.json", "utf8", (err, data) => {
    if (err) throw err;
    res.end(data);
  });
});

// displays specific employees info
app.get("/api/employees/:id", (req, res) => {
  fs.readFile("./hard.json", (err, data) => {
    if (err) throw err;

    data = JSON.parse(data);
    let employees = data["employees"];
    let exists = false;
    let emp = "";

    // compares employeeID to requested id
    employees.forEach((employee) => {
      if (employee["employeeID"] === req.params.id) {
        exists = true;
        emp = employee;
      }
    });

    if (exists) {
      res.send(JSON.stringify(emp)); // if employee exists, display their info only
    } else {
      res.status(404).send("The employee was not found"); // if not, error will show
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
