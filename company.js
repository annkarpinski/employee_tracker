// import dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

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

// Main Menu function
function mainMenu() {
  inquirer
    .prompt({
      name: "start",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View Records in Database",
        "Add Record to Database",
        "Update Record in Database",
        "Delete Record in Database",
        "EXIT",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View Records in Database":
          viewRecords();
          break;

        case "Add Record to Database":
          addRecord();
          break;

        case "Update Record in Database":
          updateRecord();
          break;

        case "Delete Record in Database":
          deleteRecord();
          break;

        case "EXIT":
          connection.end();
          console.log(
            "Thank you for using the company search database. Have a nice day!"
          );
      }
    });
}
