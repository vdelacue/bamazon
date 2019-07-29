var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require('colors');

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made then run buyItem fucntion to prompt the user to buy
    start();
    buyItem();
});

// function to list all items
var start = function () {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to buy on
        console.log(colors.rainbow(`
                                WELCOME TO BAMAZON!
                            Checkout available items!`));
        console.table(results)
        //loop through results and print all available items, id, and department
    //     for (var i = 0; i < results.length; i++) {
    //         console.log(colors.rainbow(`
    // ---------------------------------------------------------`))
    // console.log(colors.white.bold(`Item ID: ${results[i].item_id}`))
    // console.log(colors.white.bold(`Product Name: ${results[i].product_name}`))
    // console.log(colors.white(`Department: ${results[i].department_name}`))
    // console.log(colors.white(`Price: ${results[i].price}`))
    // console.log(colors.red.bold(`Stock Quantity: ${results[i].stock_quantity}`))
    //     };
    });
}
//function which prompts the user to select an item according to id and quantity
var buyItem = function () {
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
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
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
                            console.log(`Item purchased successfully Your Total is $${chosenItem.price * answer.quantity}`);
                            // start();
                        }
                    );
                } else {
                    // not enough in stock to fulfill order, so apologize and start over
                    console.log(`Insufficient quantity!`);
                    // start();
                }
            });
    })
}