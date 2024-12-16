-- show all data
SELECT * FROM users

-- show columnn data
SELECT id, name, email FROM users

-- show data with sql operators
SELECT * FROM users WHERE id > 1 AND id < 3
SELECT * FROM users WHERE id > 3 OR id < 1 
SELECT * FROM users WHERE id != 2
SELECT * FROM users WHERE id IN (1,3,5)
SELECT * FROM users WHERE id NOT IN (1,3,5)
SELECT * FROM users WHERE id BETWEEN 1 AND 3
SELECT * FROM users WHERE id NOT BETWEEN 1 AND 3
SELECT * FROM users WHERE email LIKE '%khacquan%'
SELECT * FROM users WHERE updated_at IS NULL

-- show data with sql functions
SELECT * FROM users WHERE LOWER(email) LIKE '%khac quan%' OR LOWER(name) LIKE '%khac quan'

-- arrage data with order by
SELECT * FROM users ORDER BY id DESC

-- limit data with limit & offset
SELECT * FROM users ORDER BY id DESC LIMIT 2 
SELECT * FROM users ORDER BY id DESC OFFSET 1

-- connect multiple table with join syntax
SELECT users.* , groups.name as group_name FROM users INNER JOIN groups ON users.group_id = groups.id -- inner join: return data which is linked between 2 tables
SELECT users.* , groups.name as group_name FROM users LEFT JOIN groups ON users.group_id = groups.id -- left join: return data which is priorited for left tables
SELECT users.* , groups.name as group_name FROM users RIGHT JOIN groups ON users.group_id = groups.id -- right join: return data which is priorited for right tables
-- connect multiple table with join syntax and conditions
SELECT users.* , groups.name as group_name FROM users INNER JOIN groups ON users.group_id = groups.id WHERE groups.name= 'Admin'
