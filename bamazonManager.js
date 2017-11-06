//npm
var inquirer = require('inquirer');
var mysql = require("mysql");

//mysql connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306, 
  user: "root",
  password: "1234",
  database: "bamazon"
});

// Question
inquirer.prompt([{
	name: "first",
	type: "list",
	message: "Select the task below: ",
	choices:["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]

	}]). then(function(answers){

	var task = answers.first;

		if(task === "View Products for Sale"){
			viewProduct();
		}
		else if (task === "View Low Inventory"){
			viewInventory();
		}
		else if (task === "Add to Inventory"){
			addInventory();

		}
		else if( task === "Add New Product"){
			addProduct();
		}
		else{

			console.log("Invalid Input");
		}

	});

// should list every available item: the item IDs, names, prices, and quantities.
	function viewProduct(){
		connection.query("SELECT * FROM products", function(err, res) {

		    if (err) {
		    	console.log(err)

		    }else{

		    for(var i = 0; i < res.length; i++){

		    	console.log("ID                :" + res[i].item_id);
		    	console.log("Product name      :" + res[i].product_name);
		    	console.log("Price             :" + res[i].price);
		    	console.log("Available Quantity:" + res[i].stock_quantity);
		    	console.log("====================================")
		    }  

		     
		    } 

  		});		

  		connection.end()

	};

//app should display a prompt that will let the manager "add more" of any item currently in the store.
	function addInventory(){

		inquirer.prompt([{
			name: "addInventory",
			type: "list",
			message: "Select the item you want to add more",
			choices: ["choo choo train",
					"fluffy teddy bear",
					"padding vest",
					"grandma's sweater",
					"laptop",
					"expensive laptop",
					"bacon",
					"vegan bacon"]
				},
			{
				name: "addInventoryQuantity",
				type: "Input",
				message: "Type the quantity of the products you wish to add",
				validation: function(userValue){
					if(!isNaN(userValue)){
						return true;
					}else{
						return false;
					}
				}
			}
		]). then(function(answer){

		
				var query = connection.query(
					"UPDATE products SET ? WHERE ?", 
					[ 
						{
							stock_quantity: answer.addInventoryQuantity

						},
						{
							product_name: answer.addInventory

						}

					],
					
					 function(err,res){
						if(err){
							console.log(err)

						}else{

						console.log("Upadate complete!")							
						}

					})	
					connection.end();	
			})

		

	};

// should list all items with an inventory count lower than five.
	function viewInventory(){
		connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
		    if (err) {
		    	console.log(err)
		    }else{

			    for(var i = 0; i < res.length; i++){

			    	console.log("ID                :" + res[i].item_id);
			    	console.log("Product name      :" + res[i].product_name);
			    	console.log("Category          :" + res[i].department_name);
			    	console.log("Price             :" + res[i].price);
			    	console.log("Available Quantity:" + res[i].stock_quantity);
			    	console.log("====================================")
			    } 
			}

		    // viewProduct();

  		});		
		connection.end();

	};

//should allow the manager to add a completely new product to the store.
	function addProduct() {
		inquirer.prompt([{
			name: "newItemName",
			type: "input",
			message: "Type the name of the new product"
		},
		{
			name: "newItemCategory",
			type: "input",
			message: "Type the category of the new product"

		},
		{
			name: "newItemPrice",
			type: "input",
			message: "Type the price of the new product",
			validate: function(userValue){
				if(!isNaN(userValue)){
					return true;
				}else
					return false;
			}

		},
		{
			name: "newItemQuantity",
			type: "input",
			message: "Type the quantity of the new product",
			validate: function(userValue){
				if(!isNaN(userValue)){
					return true;
				}else

				return false;
			}

		}
		]).then(function(newItem){
			// var name = newItem.newItemName
			// var category = newItem.newItemCategory
			// var price = newItem.newItemPrice
			// var quantity = newItem.newItemQuantity

			add();

			function add(){

				connection.query("INSERT INTO products SET ?",
				{
					product_name: newItem.newItemName,
					department_name: newItem.newItemCategory,
					price: newItem.newItemPrice,
					stock_quantity: newItem.newItemQuantity

				}, 
				
				function(err,res){

					if(err){
						console.log(err)
					}else{
					console.log("Product Has Been added!")
					}
				})
			}
			connection.end()
		})
	}


