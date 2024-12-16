-- create new data
INSERT INTO users(name, email, password) 
VALUES ('Khac Quan', 'dokhacquan2002@gmail.com', 123456);

INSERT INTO users(name, email, password) 
VALUES ('Khac Huy', 'dokhachuy2003@gmail.com', 123456);

INSERT INTO users(name, email, password) 
VALUES ('Khac Long', 'dokhalong2003@gmail.com', 123456);

INSERT INTO users(name, email, password) 
VALUES ('Lan Anh', 'dolananh2003@gmail.com', 123456);

INSERT INTO groups(name) 
VALUES ('Admin')

INSERT INTO groups(name) 
VALUES ('Manage')

INSERT INTO groups(name) 
VALUES ('Staff')

INSERT INTO groups(name) 
VALUES ('Subcriber')

-- update data
UPDATE users SET name = 'Quan Do', email = 'quando24@gmail.com' WHERE id=1;

-- delete data
DELETE FROM users WHERE id=1;

-- show all data
SELECT * FROM users
SELECT * FROM groups

