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
    ManagerPrompt();
});

const choicesArr = [
    "View Products for Sale",
    "View Low Inventory",
    "Add to Inventory",
    "Add New Product",
    "Exit"
]

function ManagerPrompt() {
    inquirer
        .prompt({
            name: "select",
            type: "list",
            message: "What would you like to do?",
            choices: choicesArr
        }).then(function (answers) {
            switch (answers.select) {
                case choicesArr[0]:
                    // console.log(`run function o search by artist`)
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
// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made then run buyItem fucntion to prompt the user to buy
    start();
    buyItem();
});

// function to list all items
const start = function () {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to buy on
        console.log(colors.rainbow(`
                                WELCOME TO MANAGER'S BAMAZON!
                            Checkout available items!`));
        console.table(results)
    });
}