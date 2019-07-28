var mysql = require("mysql");
var inquirer = require("inquirer");

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
    // run the start function after the connection is made to prompt the user
    start();
    buyItem();
});


// function which prompts the user for what action they should take
var start = function () {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to buy on

        console.log(results);
        console.log(`
        
        WELCOME TO BAMAZON!
        
        `);
        for (var i = 0; i < results.length; i++) {
            console.log(`
           --------------------------------------------------------- 

                "Item ID": ${results[i].item_id}
                "Product Name": ${results[i].product_name}
                "Department": ${results[i].department_name}
                "Price": ${results[i].price}
                "Stock Quantity": ${results[i].stock_quantity}
                `)
        };
    });
}
var buyItem = function () {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to buy on
        
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
                // determine if bid was high enough
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
                            console.log("item purchased successfully!");
                            // start();
                        }
                    );
                } else {
                    // not enough in stock to fulfill order, so apologize and start over
                    console.log("Insufficient quantity!");
                    // start();
                }
            });
    })
}