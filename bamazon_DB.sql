DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INTEGER(10),
  stock_quantity INTEGER(10),
  product_sales INTEGER(10) DEFAULT 0,
  PRIMARY KEY (item_id)
);

ALTER TABLE products
AUTO_INCREMENT=100;

CREATE TABLE departments (
  department_id INTEGER(10) NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs INTEGER(10),
  PRIMARY KEY (department_id)
);

ALTER TABLE departments
AUTO_INCREMENT=500;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("computer", "electronics", 150, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("iPad", "electronics", 100, 150);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("iphone", "electronics", 500, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("soul", "human", 2500, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("personality", "human", 3000, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("sense of humor", "human", 2200, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("time machine", "electronics", 3000, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("the hope diamond", "jewelry", 5000000, 1);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("The Mona Lisa", "art", 3500000, 3);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Guernica Print", "art", 300, 250);


INSERT INTO departments (department_name, over_head_costs)
VALUES("human", 2000);
INSERT INTO departments (department_name, over_head_costs)
VALUES("art", 3000);
INSERT INTO departments (department_name, over_head_costs)
VALUES("electronics", 50000);
INSERT INTO departments (department_name, over_head_costs)
VALUES("jewelry", 1000);

