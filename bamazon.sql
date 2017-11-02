/*create db and table*/
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price INTEGER(10) NOT NULL,
stock_quantity INTEGER(10),
PRIMARY KEY (item_id)
);

/*create data*/
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("choo choo train", "toy", 30, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("fluffy teddy bear", "toy", 20, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("padding vest", "clothing", 30, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("grandma's sweater", "clothing", 100, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("laptop", "electronics", 100, 11);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("expensive laptop", "electronics", 1850, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bacon", "food", 8, 23);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("vegan bacon", "food", 12, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bacon", "food", 8, 23);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dog treats", "pet", 15, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cat treats", "pet", 15, 20);

