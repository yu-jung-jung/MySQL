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
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) 

    for(var i = 0; i < res.length; i++){

    	console.log("ID                :" + res[i].item_id);
    	console.log("Product name      :" + res[i].product_name);
    	console.log("Category          :" + res[i].department_name);
    	console.log("Price             :" + res[i].price);
    	console.log("Available Quantity:" + res[i].stock_quantity);
    	console.log("====================================")
    }   
    console.log(res);
      prompt(); 
  });

}

function prompt(){

	inquirer.prompt([
	{
		name:"userID",
		type: "input",
		message: "Type the ID of the item you wish to purchase",
    	validate: function(userValue){
        	if (!isNaN(userValue)){
        	return true
        	}else
        	{
            return false
        	}
      	}
    },

	{
		name:"userQuantity",
		type: "input",
		message: "Type Quantity of the item you wish to purchase",
    	validate: function(userValue){
        	if (!isNaN(userValue)){
        	return true
        	}else
        	{
            return false
        	}
      	}

	}
		]).then(function(anwers){

			purchase();

		})

}

function purchase(){

	connection.query("SELECT * FROM products WHERE item_id = " + anwers.userID, function(err,res){
		if(err){
			console.log(err)
		}
		else{

			if(anwers.userQuantity <= res[i].stock_quantity){

				console.log("Your Order Has Been Sucessfully Submitted!")

				connection.query("UPDATE products SET stock_quantity = stock_quantity -" + anwers.userQuantity + " WHERE item_id = " + userID )


			} else{
				console.log("We apologies. We do not have enough")
			}
		}

	})

}
connection.end();