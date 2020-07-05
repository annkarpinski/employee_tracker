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
  let queryStr =
    "SELECT employees.id, employees.first_name AS 'First Name', employees.last_name AS 'Last Name', roles.title AS 'Title', departments.name AS 'Department', roles.salary AS 'Salary', employees.manager_id AS 'Manager ID' FROM ((departments INNER JOIN roles ON departments.id = roles.department_id) INNER JOIN employees ON employees.role_id = roles.id) ORDER BY employees.id";
  connection.query(queryStr, function (err, data) {
    if (err) throw err;

    console.table(data);
    mainMenu();
  });
}

function viewRoles() {
  let queryStr =
    "SELECT roles.id, roles.title AS 'Title', roles.salary As 'Salary' FROM roles ORDER BY roles.id";
  connection.query(queryStr, function (err, data) {
    if (err) throw err;
    console.table(data);
    mainMenu();
  });
}

function viewDepartments() {
  var queryStr =
    "SELECT departments.id, departments.name AS 'Department' FROM departments ORDER BY departments.id";
  connection.query(queryStr, function (err, data) {
    if (err) throw err;
    console.table(data);
    mainMenu();
  });
}

//function to add Department
function addDepartment() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "What department would you like to add?",
    })
    .then(function (answer) {
      let queryStr = "INSERT INTO departments SET ?";
      connection.query(queryStr, answer.departments, function (err, data) {
        if (err) throw err;
        console.table(answer.department + " has been added.");
        mainMenu();
      });
    });
}

// // function to add Employee
// function addEmployee() {
//   var employees = [];
//   var roles = [];
//   var loadRoles = function(){
//     var queryStr = "SELECT title FROM role;";
//     connection.queryStr(queryStr function(err, res){
//       if (err) throw err;
//       for(var i = 0; i < res.length; i++){
//         employees.push(res[i].first_name)
//       }
//     })
//   }
//   loadRoles();
//   loadEmployees();
//   inquirer
//     .prompt({
//       name: "firstName",
//       type: "input",
//       message: "What is the new employee's first name?",
//     },
//     {
//       name: "lastName",
//       type: "input",
//       message: "What is the new employee's last name?",
//     },
//     {
//       name: "role",
//       type: "input",
//       message: "What is the new employee's role?",
//     },
//     {
//       name: "firstName",
//       type: "input",
//       message: "Who is the new employee's manager?",
//     })
//     .then(function (answer) {
//       var queryStr = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, (SELECT id FROM role WHERE title = ?), (SELECT id FROM employee AS e WHERE e.first_name = ?))";

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
