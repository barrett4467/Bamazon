var inquirer = require("inquirer");
var mysql = require("mysql");
var consoleTable = require ("console.table");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "becca",
    database: "bamazon_db"
});

function displayAll(){

    connection.query("SELECT * FROM store", function(err, data){
        if (err) throw err;
        
        console.table(data);
    })

}

displayAll();
setTimeout(runGame, 2000);

function totalCalc (data, count){
    var total = data[0].price * count;
    return total
}

function runGame (){
    inquirer.prompt([
        {
            message: "Enter ID of the product you'd like to purchase",
            name: "id"
        }, 
        {
            message: "How many items would you like to purchase??",
            name: "count"
        }
    ]).then(function(answer){
        var id = parseInt(answer.id);
        var count = parseInt(answer.count);

        console.log(id);
        console.log(count);

        connection.query(`SELECT * FROM store WHERE item_id = ${id}`, function (err, data){
            if (err) throw err;
            if(count <= data[0].stock_quantity){
                console.log(`Purchase successful! You've purchased ${count} ${data[0].product_name}.`);
    
                console.log(`Your total is $${totalCalc(data, count)}.`);
            } else {
                console.log(`There doesn't appear to be enough inventory of ${data[0].product_name}`);
                console.log(`Looks like there's only ${data[0].stock_quantity} left`);
            }

            connection.end();

        })
    })
}

// id and amount 
//check store determine if enough items and either fulfill order or state theres not enough
//update database to show updated totals 
//let customer know their total