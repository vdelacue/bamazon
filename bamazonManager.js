const mysql = require("mysql");
const inquirer = require("inquirer");
const colors = require('colors');

// create the connection information for the sql database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_DB"
});


connection.connect(function (err) {
    if (err) throw err;
    console.log(colors.rainbow(`
                                WELCOME TO BAMAZON MANAGER!
                            `));
    managerPrompt();
});

const choicesArr = [
    "View Products for Sale",
    "View Low Inventory",
    "Add to Inventory",
    "Add New Product",
    "Exit"
]

function managerPrompt() {
    inquirer
        .prompt({
            name: "select",
            type: "list",
            message: "What would you like to do?",
            choices: choicesArr
        }).then(function (answers) {
            switch (answers.select) {
                case choicesArr[0]:
                    viewProducts();
                    break;
                case choicesArr[1]:
                    viewLowInventory();
                    break;
                case choicesArr[2]:
                    addInventory();
                    break;
                case choicesArr[3]:
                    addProduct();
                    break;
                case choicesArr[4]:
                    connection.end()
                    break;
            }

        })
}

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log(colors.rainbow(`
                            Checkout all your available products!`));
        console.table(results)
        managerPrompt();
    });

}

function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function (err, results) {
        if (err) throw err;
        if (results.length === 0) {
            console.log(colors.red.bold(`
            CURRENTLY NO ITEMS WITH STOCK QUANTITIES LESS THAN 5!
            BETTER GET A NEW MARKETING TEAM AND START SELLING!
            `));
            managerPrompt();
        } else {
            console.log(colors.rainbow(`
                            ITEMS WITH QUANTITIES LESS THAN 5`));
            console.table(results)
            managerPrompt();
        }
    });
}

function addInventory() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // items are listed, prompt user for which they'd like to buy according to id
        inquirer
            .prompt([{
                    name: "idInput",
                    type: "number",
                    message: "Please enter the ID of the item you would like to purchase"
                },
                {
                    name: "quantity",
                    type: "number",
                    message: "How many would you like to purchase?"
                }
            ])
            .then(function (answer) {
                // get the information of the chosen item
                let chosenItem;
                for (let i = 0; i < results.length; i++) {
                    if (results[i].item_id === parseInt(answer.idInput)) {
                        chosenItem = results[i];
                    }
                }
                // determine if quanity requested is in stock
                if (chosenItem.stock_quantity > parseInt(answer.quantity)) {
                    // quantity requested is in stock, let the user know total cost of purchase
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [{
                                stock_quantity: (chosenItem.stock_quantity - answer.quantity)
                            },
                            {
                                item_id: chosenItem.item_id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log(colors.green.bold(`Item purchased successfully Your Total is $${chosenItem.price * answer.quantity}`));
                            start();
                        }
                    );
                } else {
                    // not enough in stock to fulfill order, so apologize and start over
                    console.log(colors.red.bold(`Insufficient quantity! The Quantity you have selected it too large please try again`));
                    start();
                }
            });
    })
}

function addProduct() {
    inquirer
        .prompt([{
                name: "product",
                type: "input",
                message: "What is the product you would like to add?"
            },
            {
                name: "department",
                type: "input",
                message: "In which department would you like to list your product?"
            },
            {
                name: "price",
                type: "number",
                message: "What is the price of your product?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "stock",
                type: "number",
                message: "how much stock do you have of your product to sell?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO products SET ?", {

                    product_name: answer.product,
                    department_name: answer.department,
                    price: answer.price,
                    stock_quantity: answer.stock
                },
                function (err) {
                    if (err) throw err;
                    console.log(colors.cyan.bold(`
                            You successfully added ${answer.product} to your products!`));
                    managerPrompt();

                }
            );
        });
}