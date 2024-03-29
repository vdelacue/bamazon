//Require necessary dependencies
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

//connect to sql database using connection variable
connection.connect(function (err) {
    if (err) throw err;
    console.log(colors.america(`
                    ºO•❤•.¸✿¸.•❤•.❀•.Ƹ̵̡Ӝ̵̨̄Ʒ ( ͡° ͜ʖ﻿ ͡°)`))
    console.log(colors.cyan.bold(`
                    Welcome To Bamazon Supervisor!`))
                    
    console.log(colors.america(`
                    ( ͡° ͜ʖ﻿ ͡°) Ƹ̵̡Ӝ̵̨̄Ʒ.•❀.•❤•.¸✿¸.•❤•Oº
                    
                    `))
    supervisorPrompt();
});

//Array holding prompt choices for inquirer prompt
const choicesArr = [
    "View Products Sales by Department",
    "Create New Department",
    "Exit"
]

//function that is called when connection is made to sql database that will take input from user to make queries
function supervisorPrompt() {
    inquirer
        .prompt({
            name: "select",
            type: "list",
            message: "What would you like to do?",
            choices: choicesArr
        }).then(function (answers) {
            //Each choice will execute its own function and query from database according to what the user wants to do/see
            switch (answers.select) {
                case choicesArr[0]:
                    viewSales();
                    break;
                case choicesArr[1]:
                    addDept();
                    break;
                case choicesArr[2]:
                    connection.end()
                    break;
            }
        })
}

function viewSales() {
    connection.query(`
SELECT 
    departments.department_id, 
    departments.department_name, 
    departments.over_head_costs, 
    SUM(IFNULL(products.product_sales, 0)) AS product_sales,
    SUM(IFNULL(products.product_sales, 0)) - departments.over_head_costs AS total_profit
FROM 
    products
RIGHT JOIN 
    departments 
ON 
    products.department_name = departments.department_name
GROUP BY 
    departments.department_id, 
    departments.department_name, 
    departments.over_head_costs`,

        function (err, results) {
            if (err) throw err;
            console.log(colors.rainbow(`
                            Checkout Your Sales!`));

            console.table(results)
            supervisorPrompt();
        });
}

function addDept() {
    inquirer
        .prompt([{
                name: "department",
                type: "input",
                message: "What department name would you like to add?"
            },
            {
                name: "overHead",
                type: "number",
                message: "What is the over head cost for your new department?",
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
                "INSERT INTO departments SET ?", {

                    department_name: answer.department,
                    over_head_costs: answer.overHead
                },
                function (err) {
                    if (err) throw err;
                    console.log(colors.rainbow(`
                
                    ──────▄▄▄▄▄███████████████████▄▄▄▄▄──────
                    ────▄██████████▀▀▀▀▀▀▀▀▀▀██████▀████▄────
                    ──▄██▀████████▄─────────────▀▀████─▀██▄──
                    ─▀██▄▄██████████████████▄▄▄─────────▄██▀─
                    ───▀█████████████████████████▄────▄██▀───
                    ─────▀████▀▀▀▀▀▀▀▀▀▀▀▀█████████▄▄██▀─────
                    ───────▀███▄──────────────▀██████▀───────
                    ─────────▀██████▄─────────▄████▀─────────
                    ────────────▀█████▄▄▄▄▄▄▄███▀────────────
                    ──────────────▀████▀▀▀████▀──────────────
                    ────────────────▀███▄███▀────────────────
                    ───────────────────▀█▀───────────────────

        You successfully added ${answer.department} to your departments!
                    
                                
                                `));
                    supervisorPrompt();

                }
            );
        });
}

