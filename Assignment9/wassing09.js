CREATE TABLE tempData (
id int,
dateTime timestamp DEFAULT current_timestamp,
buttonVal Boolean,
temp varchar(30));
INSERT INTO tempData
FROM VALUES (1,DEFAULT,true,75);
