# **Bamazon** 
Bamazon is a CLI App that is an Amazon-like storefront. This command line based app will take in orders from customers and deplete stock from the store's inventory. Additional functionality was added depending on the user there are different command line prompts based on who is using the App, Customer, Manager, or Supervisor. To watch demos scroll to bottom of readme for GIFs.

---

# **Technologies and Depencies**

This application implements a simple `command line` based storefront using the `npm` [inquirer](https://www.npmjs.com/package/inquirer) package and the `MySQL` database backend together with the `npm` [mysql](https://www.npmjs.com/package/mysql) package. The application presents three interfaces: **customer**, **manager** and **supervisor**

The site runs in Node, the server side code is written in `javascript` implementing features of of ECMA16.

# _Core Dependencies/npm packages_ of the site:

> - `inquirer` - Is used to help populate prompts and results for each interface. It also handles the answers inputted by the user. 
> - `colors` - Is used to style the fonts with some fun colors and patterns. 
> - `npm` - node package manager used to install necessary dependencies that are required for the application to run correctly.
> - `MySql` - In order to run this application, you should have the MySQL database already set up on your machine. If you don't, visit the [MySQL installation page](https://dev.mysql.com/doc/refman/5.6/en/installing.html) to install the version you need for your operating system. Once you have MySQL installed, you will be able to create the *Bamazon* database as well as the *products* and *departments* table with the SQL code found in [bamazon_DB.sql](bamazon_DB.sql). Run this code inside your MySQL client like [MySQL Workbench](https://www.mysql.com/products/workbench/) to populate the database, then you will be ready to proceed with running the Bamazon customer, manager and Supervisor interfaces.

--- 

# Features: _Interfaces of Bamazon_:

## `Customer Interface` 
The customer interface allows the user to view the current inventory of store items: item IDs, descriptions, department in which the item is located and price. The user is then able to purchase one of the existing items by entering the item ID and the desired quantity. If the selected quantity is currently in stock, the user's order is fulfilled, displaying the total purchase price and updating the store database. If the desired quantity is not available, the user is prompted to modify their order.

To run the Customer interface please follow the steps below:	
> - git clone <(insert copied clone address from repo here)>
> - cd bamazon
> - npm install
> - node bamazonCustomer.js

### Sample Customer Prompt view:
```
                  WELCOME TO BAMAZON!
               Checkout available items!
┌─────────┬─────────┬────────────────────┬─────────┐
│ (index) │ item_id │    product_name    │  price  │
├─────────┼─────────┼────────────────────┼─────────┤
│    0    │   100   │     'computer'     │   150   │
│    1    │   101   │       'iPad'       │   100   │
│    2    │   102   │      'iphone'      │   500   │
│    3    │   103   │       'soul'       │  2500   │
│    4    │   104   │   'personality'    │  3000   │
│    5    │   105   │  'sense of humor'  │  2200   │
│    6    │   106   │   'time machine'   │  3000   │
│    7    │   107   │ 'the hope diamond' │ 5000000 │
│    8    │   108   │  'The Mona Lisa'   │ 3500000 │
│    9    │   109   │  'Guernica Print'  │   300   │
│   10    │   110   │   'diamond ring'   │   300   │
│   11    │   111   │       'ring'       │   400   │
│   12    │   112   │     'charger'      │   25    │
└─────────┴─────────┴────────────────────┴─────────┘
? Please enter the ID of the item you would like to purchase 
```
---

## `Manager Interface`
The manager interface presents a list of four options, as below. 

```
	? What would you like to do? (Use arrow keys)
	❯ View Products for Sale 
	  View Low Inventory 
	  Add to Inventory 
	  Add New Product

       WELCOME TO BAMAZON MANAGER!
                            
? What would you like to do? View Low Inventory

                            ITEMS WITH QUANTITIES LESS THAN 5
┌─────────┬─────────┬──────────────┬─────────────────┬───────┬────────────────┬───────────────┐
│ (index) │ item_id │ product_name │ department_name │ price │ stock_quantity │ product_sales │
├─────────┼─────────┼──────────────┼─────────────────┼───────┼────────────────┼───────────────┤
│    0    │   100   │  'computer'  │  'electronics'  │  150  │       1        │     33300     │
└─────────┴─────────┴──────────────┴─────────────────┴───────┴────────────────┴───────────────┘
```
	  
The **View Products for Sale** option allows the user to view the current inventory of store products: item IDs, product name, department in which the product is located, price, and the quantity available in stock. 

The **View Low Inventory** option shows the user the products which currently have a stock quantity of less than 5 available.

The **Add to Inventory** option allows the user to select a given item ID and add additional inventory to the target item.

The **Add New Product** option allows the user to enter the values of a new product which will be entered into the database upon completion of the form. 

To run the manager interface please follow the steps below:	
> - git clone <(insert copied clone address from repo here)>
> - cd bamazon
> - npm install
> - node bamazonManager.js

---

## `Supervisor Interace`

The supervisor interface presents a list of two options, as below. 
```
                    ºO•❤•.¸✿¸.•❤•.❀•.Ƹ̵̡Ӝ̵̨̄Ʒ ( ͡° ͜ʖ﻿ ͡°)

                    Welcome To Bamazon Supervisor!

                    ( ͡° ͜ʖ﻿ ͡°) Ƹ̵̡Ӝ̵̨̄Ʒ.•❀.•❤•.¸✿¸.•❤•Oº
                    
                    
? What would you like to do? 
? Please select an option: (Use arrow keys)
	❯ View Products Sales by Department 
	  Add New Department

? What would you like to do? View Products Sales by Department
                            Checkout Your Sales!
┌─────────┬───────────────┬─────────────────┬─────────────────┬───────────────┬──────────────┐
│ (index) │ department_id │ department_name │ over_head_costs │ product_sales │ total_profit │
├─────────┼───────────────┼─────────────────┼─────────────────┼───────────────┼──────────────┤
│    0    │      502      │  'electronics'  │      50000      │     39400     │    -10600    │
│    1    │      500      │     'human'     │      2000       │     3000      │     1000     │
│    2    │      503      │    'jewelry'    │      1000       │     16300     │    15300     │
│    3    │      501      │      'art'      │      3000       │     1800      │    -1200     │
│    4    │      504      │    'kitchen'    │      2000       │       0       │    -2000     │
│    5    │      505      │   'appliance'   │      3000       │       0       │    -3000     │
│    6    │      506      │   'appliance'   │      3000       │       0       │    -3000     │
│    7    │      507      │  'hospitality'  │       200       │       0       │     -200     │
│    8    │      508      │    'school'     │      30000      │       0       │    -30000    │
│    9    │      509      │     'home'      │      2000       │       0       │    -2000     │
└─────────┴───────────────┴─────────────────┴─────────────────┴───────────────┴──────────────┘
```	
	  
The **View Products Sales by Department** option allows the user to view department id, department name, product sales, over head costs, and total profits for each department.

The **Add New Department** option allows the user to enter details about a new department which will be entered into the database upon completion of the form.

To run the supervisor interface please follow the steps below:	
> - git clone <(insert copied clone address from repo here)>
> - cd bamazon
> - npm install
> - node Supervisor.js

---

# **Code Example**
Below is a sample of the bamazonManager.js file that executes a 
```js
function viewProducts() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log(colors.rainbow(`
                            Checkout all your available products!`));
        console.table(results)
        managerPrompt();
    });
}
```
---

# **Bamazon GIF Demos** 

Here is a series of GIFs that show a full demo of Bamazon, and the 3 phases separately for customer, manager, and supervisor. The GIFs demonstrate typical user flow through the application (for the customer, manager, and supervisor). This includes views of the prompts and the responses after their selection 

 ## FULL DEMO OF BAMAZON
 [GIF Preview of FULL DEMO for Bamazon](GIF/bamazonFullDemoGIF.gif)
 ## CUSTOMER DEMO OF BAMAZON
 [GIF Preview of Customer for Bamazon](GIF/bamazonCustomerHwGIF.gif)
 ## MANAGER DEMO OF BAMAZON
 [GIF Preview of Manager for Bamazon](GIF/bamazonManagerGIF.gif)
 ## SUPERVISOR DEMO OF BAMAZON
 [GIF Preview of Supervisor for Bamazon](GIF/bamazonSupervisorGIF.gif)

MIT © [Vanessa de la Cuetara](2019)

