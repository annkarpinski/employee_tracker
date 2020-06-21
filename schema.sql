-- Drops the companyDB if it currently exists --
DROP DATABASE IF EXISTS companyDB;

-- Creates the "companyDB" database --
CREATE database companyDB;

-- Makes it so all of the following code will affect companyDB --
USE companyDB;

CREATE TABLE Departments (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE Roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL(10,4),
  department_id INT(10)
  PRIMARY KEY (id)
);

CREATE TABLE Employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT(10),
  manager_id INT(10),
  PRIMARY KEY (id)
);

SELECT Departments.id, Roles.id, Employees.id
FROM ((Departments
INNER JOIN Roles ON Departments.id = Customers.CustomerID)
INNER JOIN Employees ON Orders.ShipperID = Shippers.ShipperID);