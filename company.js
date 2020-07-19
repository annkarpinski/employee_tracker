// import dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const util = require("util");
require("console.table");

// Connect to database
const connection = mysql.createConnection({
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

connection.query = util.promisify(connection.query);

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
  const queryStr =
    "SELECT employees.id, employees.first_name AS 'First Name', employees.last_name AS 'Last Name', roles.title AS 'Title', departments.name AS 'Department', roles.salary AS 'Salary', CONCAT(manager.first_name, ' ' , manager.last_name) AS 'Manager' FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id";
  connection.query(queryStr, function (err, data) {
    if (err) throw err;
    console.table(data);
    mainMenu();
  });
}

function viewRoles() {
  const queryStr =
    "SELECT roles.id, roles.title AS 'Title', roles.salary As 'Salary' FROM roles ORDER BY roles.id";
  connection.query(queryStr, function (err, data) {
    if (err) throw err;
    console.table(data);
    mainMenu();
  });
}

function viewDepartments() {
  const queryStr =
    "SELECT departments.id, departments.name AS 'Department' FROM departments ORDER BY departments.id";
  connection.query(queryStr, function (err, data) {
    if (err) throw err;
    console.table(data);
    mainMenu();
  });
}

//------------------------------------
// Functions to add data to database
//------------------------------------

// //function to add Department
// function addDepartment() {
//   inquirer
//     .prompt({
//       name: "department",
//       type: "input",
//       message: "What department would you like to add?",
//     })
//     .then(function (answer) {
//       const queryStr = "INSERT INTO departments (name) VALUES (?)";
//       connection.query(queryStr, answer.departments, function (err, data) {
//         if (err) throw err;
//         console.table(answer.department + " has been added.");
//         mainMenu();
//       });
//     });
// }

// //function to add Role
// function addRole() {
//   const department = [];
//   inquirer
//     .prompt([
//       {
//         name: "title",
//         type: "input",
//         message: "What is the title of the role you want to add?",
//       },
//       {
//         name: "salary",
//         type: "input",
//         message: "What is the salary for this role?",
//       },
//       {
//         name: "department",
//         type: "list",
//         message: "What department does this role belong to?",
//       },
//     ])
//     .then(function (answer) {
//       let queryStr = "INSERT INTO roles ";
//       connection.query(queryStr, answer.roles, function (err, data) {
//         if (err) throw err;
//         console.table(answer.roles + " has been added.");
//         mainMenu();
//       });
//     });
// }

// function to add Employee
function addEmployee() {
  const roles = [];
  const managers = [];
  const queryRoles = "SELECT title FROM roles;";
  connection.query(queryRoles, function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      roles.push(res[i].title);
    }
    const queryManager = "SELECT first_name, last_name FROM employees";
    connection.query(queryManager, function (err, res) {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        managers.push(res[i].first_name + " " + res[i].last_name);
      }
      inquirer
        .prompt([
          {
            name: "firstName",
            type: "input",
            message: "What is the new employee's first name?",
          },
          {
            name: "lastName",
            type: "input",
            message: "What is the new employee's last name?",
          },
          {
            name: "title",
            type: "list",
            message: "What is the new employee's title?",
            choices: roles,
          },
          {
            name: "manager",
            type: "list",
            message: "Who is the new employee's manager?",
            choices: managers,
          },
        ])
        .then(function (answer) {
          const queryStr =
            "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, (SELECT id FROM roles WHERE title = ?), (SELECT id FROM employees AS e WHERE CONCAT(e.first_name, ' ', e.last_name) = ?))";
          connection.query(
            queryStr,
            [answer.firstName, answer.lastName, answer.title, answer.manager],
            function (err, res) {
              if (err) throw err;
              console.log("Successfully added an employee!");
              mainMenu();
            }
          );
        });
    });
  });
}

//------------------------------------
// Functions to update data in database
//------------------------------------

// // function to update Employee Role
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
