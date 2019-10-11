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

var Product = function (id, name, department, price, stock){
    this.item_id = id,
    this.product_name = name,
    this.department_name = department,
    this.price = price,
    this.stock_quantity = stock
}

function viewProducts(){

    connection.query("SELECT * FROM store", function(err, data){
        if (err) throw err;
        console.log("==============================================================================")
        console.table(data);
        console.log("==============================================================================")
    })
}
function lowInventory(){
    connection.query("SELECT * FROM store", function(err, data){
        if (err) throw err;

        var allStocked = false;

        function checkInventory(){
            if (stock_quantity < 5){
                console.table(data[i]);
                itemsArr.push(data[i]);
                
            } else {
                allStocked = true;
            } 

        }
        
        for (var i = 0; i < data.length; i++){
            var stock_quantity = data[i].stock_quantity;
            var itemsArr = [];
            checkInventory();
        }
        // if (allStocked === true){
        //     console.log("Everything is stocked boss!");
        // }
        setTimeout(runApp, 3000);

    })
}
function addInventory(){
    inquirer.prompt([
        {
            message: "Which id would you like to add to?",
            name: "item_id"
        },
        {
            message: "How many would you like to add?",
            name: "stock_quantity"
        }
    ]).then(function(answer){
        var id = parseInt(answer.item_id);
        var newStock = parseInt(answer.stock_quantity);
        console.log(id);
        function checkId(data){
            
            for (var i = 0; i < data.length; i++){
                if (id != data[i].item_id){
                    return console.log("That doesn't appear to be a valid id. Please try again.");
                }
    
            }
        }
        if (id != NaN){
            connection.query(`SELECT * FROM store WHERE item_id = ${id}`, function(err, data){
                var stock = parseInt(data[0].stock_quantity);
                var updatedStock = stock + newStock;
                checkId(data);
    
                if (err){
                    throw err;
                } 
                
                connection.query(`UPDATE store SET stock_quantity = ${updatedStock} WHERE item_id = ${id}`, function(err, data){
                    if(err) throw err;
                    
                })
                console.log(`${newStock} products have been added to ${data[0].product_name}. There are now a total of ${updatedStock}.`);
                setTimeout(viewProducts, 3000);
                setTimeout(runApp, 6000);
                
                
            });

        } else {
            console.log("That doesn't appear to be valid. Try again.");
            addInventory();
        }
        
    })
   
}
function addProduct(){
    inquirer.prompt([
        {
            message: "What would you like to add?",
            name: "product_name"
        }, 
        {
            type: "list",
            message: "Which Department should this be added to?",
            choices: ["beauty", "household", "auto", "toys"],
            name: "department_name"
        }, 
        {
            message: "What would you like the price to be?",
            name: "price"
        },
        {
            message: "What is the inventory for this product?",
            name: "stock_quantity"
        }
        
    ]).then(function(answer){
        var name = answer.product_name;
        var department = answer.department_name;
        var price = answer.price;
        var stock= answer.stock_quantity;
        console.log()
        // var newProduct = new Product (name, department, price, stock);
        connection.query(`INSERT INTO store (product_name, department_name, price, stock_quantity) VALUES ("${name}", "${department}", ${price}, ${stock})`);
        console.log(`${stock} ${name}s added to the ${department} department at a price of ${price} each`);
        setTimeout(runApp, 3000);
    })
}

function runApp(){
    inquirer.prompt([
        {
            type: "list",
            message: "Welcome Manager! What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"],
            name: "action"
        }
    ]).then(function(answer){   
        var action = answer.action;
        if (action === "View Products for Sale"){
            viewProducts();
            setTimeout(runApp, 3000);
        } else if (action === "View Low Inventory"){
            lowInventory();
        } else if (action === "Add to Inventory"){
            addInventory();
        } else if (action === "Add New Product"){
            addProduct();
        } else {
            connection.end();
            return console.log("Thank you!");

        }
    })
}

runApp();