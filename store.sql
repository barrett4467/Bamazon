DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE store (
	item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(5, 2) NOT NULL,
    stock_quantity INT,
	primary key (item_id)
);

INSERT INTO store (product_name, department_name, price, stock_quantity)
VALUES ("Fancy Mascara", "beauty", 26.00, 70), ("Crystal Growing Kit", "toys", 32.00, 10), ("Phone and Tablet Recipe Stand", "household", 20.00, 150), ("Car Air Purifier", "auto", 15.00, 5), ("Pore Freshener", "beauty", 10.00, 70), ("Party Card Game", "toys", 15.00, 90), ("Healthy Hoof Cream", "beauty", 5, 15), ("Microwave Egg Poacher", "household", 9.00, 62), ("Reusable Produce Bags", "household", 11.00, 30), ("Antiperspirant Foot Lotion", "beauty", 15.00, 45);

SELECT * FROM store;
