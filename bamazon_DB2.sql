USE bamazon_DB;

CREATE TABLE departments (
  department_id INTEGER(10) NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  over_head_costs INTEGER(10),
  PRIMARY KEY (department_id)
);

ALTER TABLE products
AUTO_INCREMENT=100;

INSERT INTO departments (product_name, department_name, price, stock_quantity)
VALUES("computer", "electronics", 150, 200);
