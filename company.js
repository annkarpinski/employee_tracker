// import dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");

// Connect to database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "companyDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connection successful!");
  mainMenu();
});

// Play with async awaits for your inquirer prompts if you're having trouble
// Main Menu function
function mainMenu() {
  // * Add departments, roles, employees

  // * View departments, roles, employees

  // * Update employee roles
  inquirer
    .prompt({
      name: "start",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Roles",
        "View All Departments",
        "Add Employee",
        "Add Role",
        "Add Department",
        "Update Employee Role",
        "EXIT",
      ],
    })
    .then(function (answer) {
      switch (answer.start) {
        case "View All Employees":
          viewEmployees();
          break;

        case "View All Roles":
          viewRoles();
          break;

        case "View All Departments":
          viewDepartments();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Update Employee Role":
          updateEmployee();
          break;

        case "EXIT":
          console.log(
            "Thank you for using the company search database. Have a nice day!"
          );
          connection.end();
      }
    });
}

//------------------------------------
// Functions to view data in database
//------------------------------------

function viewEmployees() {
  var queryStr =
    "SELECT Employees.id, Employees.first_name, Employees.last_name, Roles.title, Departments.name as department, Roles.salary, Employees.manager_id FROM ((Departments INNER JOIN Roles ON Departments.id = Roles.department_id) INNER JOIN Employees ON Employees.role_id = Roles.id)";
  connection.query(queryStr, function (err, data) {
    if (err) throw err;

    console.table(data);
    mainMenu();
  });
}

function viewRoles() {
  var queryStr = "SELECT * FROM Roles";
  connection.query(queryStr, function (err, data) {
    if (err) throw err;

    console.table(data);
    mainMenu();
  });
}

function viewDepartments() {
  var queryStr = "SELECT * FROM Departments";
  connection.query(queryStr, function (err, data) {
    if (err) throw err;

    console.table(data);
    mainMenu();
  });
}

// // function to add Employee
// function addEmployee() {
//   inquirer
//     .prompt({
//       name: "add",
//       type: "rawlist",
//       message: "What would you like to add?",
//       choices: ["Department", "Role", "Employee"],
//     })
//     .then(function (answer) {
//       switch (answer.add) {
//         case "Department":
//           addDepartment();
//           break;

//         case "Role":
//           addRole();
//           break;

//         case "Employee":
//           addEmployee();
//           break;
//       }
//     });
// }

// function to update Employee Role
// function updateEmployee() {
//   inquirer
//     .prompt({
//       name: "update",
//       type: "rawlist",
//       message: "What would you like to update?",
//       choices: ["Manager", "Employee"],
//     })
//     .then(function (answer) {
//       switch (answer.update) {
//         case "Manager":
//           updateManager();
//           break;

//         case "Employee":
//           updateEmployee();
//           break;
//       }
//     });
// }
