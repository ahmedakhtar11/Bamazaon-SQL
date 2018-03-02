-- 1. Create a MySQL Database called `bamazon`.
DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR (255),
    department_name VARCHAR (255),
    price INTEGER (11),
    stock_quantity INTEGER (11),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Tuna", "Food", 1, 5),
("Bread", "Food", 2, 100),
("XBox", "Electronics", 300, 30),
("PS4", "Electronics", 300, 40),
("Tents", "Camping", 40, 80),
("Sleeping Bags", "Camping", 12, 65),
("BasketBall", "Sporting Goods", 20, 2),
("Baseball Bat", "Sporting Goods", 15, 4),
("Medium Black Hoodie", "Clothing", 25, 9),
("Medium White Shirt", "Clothing", 3, 17);