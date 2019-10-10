var inquirer = require("inquirer");
var mysql = require("mysql");
var conTable = require ("console.table");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "becca",
    database: "bamazon_db"
});

function again(){
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to do anything else?",
            choices: ["yes", "no"],
            name: "confirm"
        }
    ]).then(function(answer){
        if (answer.confirm === "yes"){
            runGame();
        } else{
            connection.end();
            console.log("Thank you!");
        }
    })
}
function viewProductSales(){
    console.log("Salesssss");
    connection.query(`SELECT department_name FROM store INNER JOIN departments ON store.department_name = departments.department_name`, function(err, data){
        console.log(data);
    })
}

function createDepartment(){
    console.log("Create");
}

function runGame(){
    inquirer.prompt([
        {
            type: "list",
            message: "Hello  Supervisor! What would you like to do?",
            choices: ["View Product Sales by Department", "Create New Department"],
            name: "action"
        }
    ]).then(function(answer){
        if (answer.action === "View Product Sales by Department"){
            viewProductSales();
            setTimeout(again, 2500);
        } else {
            createDepartment();
            setTimeout(again, 2500);
        }
    })
}

runGame();

