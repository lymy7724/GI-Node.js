const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.static("pics"));

// displays all the employees info
app.get("/employees", (req, res) => {
  fs.readFile("./hard.json", "utf8", (err, data) => {
    if (err) throw err;
    res.end(data);
  });
});

// displays specific employees info
app.get("/employees/:id", (req, res) => {
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
      res.send(`
          <div style="border: 1px solid black;border-radius: 10px;display: flex;width: 600px;gap: 10px;background-color: rgba(134, 171, 235, 0.493);box-shadow: 4px 4px 4px rgb(126, 126, 126);">
              <div>
              <img src="${emp["picture"]}" style="border-radius: 20px;width: 300px;padding: 8px; alt="sdfgh">
              </div>
              <div>
              <h2>${emp["name"]}</h2>
              <h4>Employee ID: ${emp["employeeID"]}</h4>
              <h4>Department: ${emp["department"]}</h4>
              <h6>Salary: ${emp["salary"]}</h6>
              </div>
          </div>
    `); // if employee exists, display their info only
    } else {
      res.status(404).send("The employee was not found"); // if not, error will show
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
