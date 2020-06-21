USE companyDB;

INSERT INTO Departments (name) values ('Executive');
INSERT INTO Departments (name) values ('Creative');
INSERT INTO Departments (name) values ('Sales');
INSERT INTO Departments (name) values ('Human Resources');
INSERT INTO Departments (name) values ('Accounting');

INSERT INTO Roles (title, salary, department_id) values ('Creative Director', 90000.00, 2);
INSERT INTO Roles (title, salary, department_id) values ('Copy Writer', 45000.00, 2);
INSERT INTO Roles (title, salary, department_id) values ('Account Executive', 80000.00, 5);
INSERT INTO Roles (title, salary, department_id) values ('Executive Assistant', 60000.00, 1);

INSERT INTO Employees (first_name, last_name, role_id, manager_id) values ('Donald', 'Draper', 2, 1);
INSERT INTO Employees (first_name, last_name, role_id, manager_id) values ('Roger', 'Sterling', 1, NULL);
INSERT INTO Employees (first_name, last_name, role_id, manager_id) values ('Peggy', 'Olson', 3, 2);
INSERT INTO Employees (first_name, last_name, role_id, manager_id) values ('Peter' 'Campbell', 9, 1);