DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INTEGER(10),
  stock_quantity INTEGER(10),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("computer", "electronics", 150, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("iPad", "electronics", 100, 150);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("iphone", "electronics", 500, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("soul", "misc", 2500, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("personality", "misc", 3000, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("sense of humor", "misc", 2200, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("time machine", "electronics", 3000, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("the hope diamond", "jewelry", 5000000, 1);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("The Mona Lisa", "art", 3500000, 1);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Guernica Print", "art", 300, 250);