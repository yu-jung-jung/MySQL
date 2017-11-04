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

connection.connect(function(err) {
  if (err) throw err;
  console.log("Sucessfully Connected to Bamazon");
  displayDB();
});

function displayDB() {
	connection.query("SELECT * FROM products", function(err, res){

		if(err){
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
    		
    		prompt();

		}

	})
}

function prompt(){

	inquirer.prompt([
	{
		name:"userID",
		type: "input",
		message: "Type the ID of the item you wish to purchase",
		validate: function(userValue){
			if(!isNaN(userValue)){
				return true
			}else{
				return false
			}
		}	
	},
	{
		name:"userQuantity",
		type: "input",
		message: "Type Quantity of the item you wish to purchase",
		validate: function(userValue){
			if(!isNaN(userValue)){
				return true
			}else{
				return false
			}
		}

	}

		]).then(function(answers){

			purchase();

		})
}

function purchase() {
	connection.query("SELECT * FROM products WHERE item_id =" +answers.userID, function(err,res){
		if(err){
			console.log(err)
		}else{
			if(answers.userQuantity <= res[i].stock_quantity){

				connection.query("UPDATE products SET stock_quantity = stock_quantity - " + answers.userQuantity+" WHERE item_id = "+ answers.userID, function(err,res){
					if(err){
						console.log(err)
					}else{
						console.log("Your Order Has Been Sucessfully Submitted!")
					}
				} )
			} else{
				console.log("We apologies. Insufficient quantity of that item in stock")
			}
		}
	})

	connection.end();
}

