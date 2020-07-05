USE companyDB;

INSERT INTO departments (name)
    VALUES
        ('Executive'),
        ('Creative'),
        ('Sales'),
        ('Human Resources'),
        ('Accounting');

INSERT INTO roles (title, salary, department_id)
    VALUES
    ('Creative Director', 90000.00, 2),
    ('Copy Writer', 45000.00, 2),
    ('Account Executive', 80000.00, 5),
    ('Accountant', 80000.00, 5),
    ('Recruiter', 70000.00, 4),
    ('Executive Assistant', 60000.00, 1);

INSERT INTO employees (first_name, last_name, role_id)
    VALUES
        ('Donald', 'Draper', 2),
        ('Roger', 'Sterling', 1),
        ('Peggy', 'Olson', 3),
        ('Peter', 'Campbell', 4),
        ('Joan', 'Holloway', 4);