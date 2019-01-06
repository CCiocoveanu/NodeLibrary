ALTER TABLE books
ADD id int;

select * from books;

INSERT INTO books (title, author) VALUES
('The Goblet of Fire', 'J. K. Rowling'),
('The Lord of the Rings', 'J. R. R. Tolkien'),
('1985', 'Anthony Burgess'),
('A Dance with Dragons', 'George R. R. Martin')

CREATE TABLE books(
 id int IDENTITY(1,1) PRIMARY KEY,
 title varchar(255),
 author varchar(255),
);