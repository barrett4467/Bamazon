# Bamazon

Bamazon is an application built on node.js that uses mysql to store data. The application is entirely run in the command line by a series of inquirer prompts. 

The customer level starts by displaying all avaliable items to purchase in a table. The application then prompts the customer to enter the id of a product they'd like to purchase. Once the user has input a value, the application asks how many the user would like to purchase. The application then advised the user that the purchase was successful and logs their total. The available items table displays again with the updated stock. The app then asks if the user would like to purchase anything else. If the user selects yes, they will redo the steps above. If the user selects no, the application will disconnect from mysql and stop.

The manager level uses the same database and table as the customer level. The application starts by asking the manager if they'd like to view the available products, view products with a low inventory, add to inventory, or add an entirely new product. If the manager selects view products, the application displays the items available in a table much like it did at the start of the customer level. If view low inventory is selected, the application will only display items with stock lower than 5 products. The add to inventory option works much the same as the purchasing in the customer level, but reversed. The last option, add new product, creates an entirely new product by asking the manager to input the name, department, price, and stock count. The application takes this input and updates the database before printing the updated product list to the console. All of the above options ask the manager if there's another task they'd like to do.

You can find a walk-through of the customer level here: ![](Customer.webm) 

And the manager walk-through here: ![](Manager.webm)