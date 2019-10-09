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
        console.log("==============================================================================")
        console.table(data);
        console.log("==============================================================================")
    })

}

displayAll();
setTimeout(runGame, 2000);

function totalCalc (data, count){
    var total = data[0].price * count;
    return total;
}

function updateStock(data, count, id){
    var stock = data[0].stock_quantity - count;
    connection.query(`UPDATE store SET stock_quantity = ${stock} WHERE item_id = ${id}`);
    return stock;
}
function again(){
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to purchase anything else?",
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
        
        connection.query(`SELECT * FROM store WHERE item_id = ${id}`, function (err, data){
                if (err) {
                    console.log("We're sorry, that doesn't appear to be a valid input. Please try again.")
                    return runGame();
                };

                if(count <= data[0].stock_quantity){
                    console.log(`Purchase successful! You've purchased ${count} ${data[0].product_name}.`);
                    console.log(`Your total is $${totalCalc(data, count)}.`);
                    updateStock(data, count, id);
                    setTimeout(displayAll, 4000);
                } else {
                    console.log(`There doesn't appear to be enough inventory of ${data[0].product_name}`);
                    console.log(`Looks like there's only ${data[0].stock_quantity} left`);
                }
            
    
                setTimeout(again, 6000);

        })


    })
}

// id and amount 
//check store determine if enough items and either fulfill order or state theres not enough
//update database to show updated totals 
//let customer know their total