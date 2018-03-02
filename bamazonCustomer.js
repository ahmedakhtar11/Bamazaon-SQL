// Required: Download Inquirer. (npm install inquirer)
var inquirer = require("inquirer");
// Required: Download MYSQL. (npm install mysql)
var mysql = require("mysql");

//Connecting to the Database
var connection = mysql.createConnection({
    host: "127.0.0.1",
    // Port
    port: 3306,
    // Username
    user: "root",
    // Password
    password: "",
    // Database Name
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    displayProducts();
  });

//Display the List of Products to buy.
function displayProducts () {
  connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, res) {
    if (err) throw err;
    console.log(`Welcome to the Bamazon MarketPlace! Please take a look at the products that we offer!`)
    console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
        res.forEach(element => {
        var item_id = element.item_id;
        var product_name = element.product_name;
        var price = element.price;
        var stock_quantity = element.stock_quantity;
      console.log(`ID: #${item_id} - Product: ${product_name} for $${price}.00 ~~ Inventory: ${stock_quantity}`);
      });

    purchaseProduct();
    });
  }

//Ask the User the ID number of the Product that they would like to buy.
function purchaseProduct () {
  inquirer
  .prompt([
      {
        type: "input",
        message: "Please choose the product that you wish to buy by entering its ID number listed above.",
        name: "idNumber"
      },
      {
        type: "input",
        message: "How many units would you like to purchase?",
        name: "units"
      }
    ]).then(function(input){
      idNumber = input.idNumber;
      units = Number(input.units);
  checkInventory();
  });
}

//Check whether the Quantity of Inventory Needed is Available for an Item.
function checkInventory() {
  connection.query(`SELECT stock_quantity, price FROM products WHERE item_id=${idNumber}`, function(err, res) {
      if (err) throw err;
      var stock_quantity = res[0].stock_quantity;
      var price = res[0].price;
      var product = res[0].product_name;
      if (units < stock_quantity) {
          stockUpdate = stock_quantity - units;
          updateInventory();
          console.log(`Thank you for your PURCHASE! Your TOTAL is: $${units*price}.`);
          connection.end();
          return
      } else {
          console.log(`Sorry. OUT OF STOCK! - Your order can not be processed due to insufficient quantity!`)
          connection.end();
          return
      }
  })
};

//Update the List of Inventory after a Purchase is made.
function updateInventory() {
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {stock_quantity: stockUpdate},
      {item_id: idNumber},
    ],
    function(err, res) {
      if (err) throw err;
      console.log(`Inventory count has been updated - Choose another item to purchase below`);
      console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
    }
  );
  
  //Call Display Products to display the Updated Inventory of Products Available
  displayProducts();
};

