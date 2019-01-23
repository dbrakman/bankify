var apiKey = 'INSERT_YOUR_API_KEY_HERE';

var customerJSON;
var tokenName;
var tokenPrice;
var customerAccounts;

$(document).ready(function(){
    $("#name-submit").on("click", function(event){
        if(!customerJSON){
            inputname = $("#name-field").val();
            console.log("Clicked Start");
            require(['customer', 'account'], function (customer, account) {

                var cust = customer.initWithKey(apiKey);
                var acct = account.initWithKey(apiKey);

                customerJSON = getCustomerByName(cust, inputname);

                try {
                    console.log("found = " + customerJSON["first_name"]);

                    console.log(customerAccounts);
                    customerAccounts = acct.getAllByCustomerId(customerJSON["_id"]);

                    $("#bank-screen h1").append(", "+customerJSON["first_name"]);
                    $("#login-screen").slideUp();
                } catch(e) {
                   $("#no-account-screen").show();
                }
            });

            console.log(customerJSON);
        }

    });

    $("#back-button").click(function(){
        $("#token-screen").show();
        $("#bank-screen").text();

        $(".val-display:eq(0) h2:eq(0)").text("$");
        $(".val-display:eq(1) h2:eq(0)").text("$");

        $(".val-display:eq(0) h2:eq(1)").text("");
        $(".val-display:eq(1) h2:eq(1)").text("");
    });

    $("#create-account-btn").on("click", function(event){
        if(!customerJSON){
            inputname = $("#name-field").val();
            if(inputname.split(" ").length == 2){
                console.log("Creating Account");
                require(['customer', 'account'], function (customer, account) {

                    var cust = customer.initWithKey(apiKey);
                    var acct = account.initWithKey(apiKey);

                    var newCustDetails ="{ \"first_name\": \"" + inputname.split(" ")[0] + "\", \"last_name\": \""+ inputname.split(" ")[1] +"\", \"address\": { \"street_number\": \"1\", \"street_name\": \"Capital One Dr.\", \"city\": \"McLean\", \"state\": \"VA\", \"zip\": \"22102\" } }";
                    var newAcctDetails = "{ \"type\": \"Credit Card\", \"nickname\": \"My Account\", \"rewards\": 100, \"balance\": 1000 }"

                    cust.createCustomer(newCustDetails);

                    customerJSON = getCustomerByName(cust, inputname);

                    acct.createAccount(customerJSON["_id"], newAcctDetails);

                    console.log(customerAccounts);
                    customerAccounts = acct.getAllByCustomerId(customerJSON["_id"]);

                    $("#bank-screen h1").append(", "+customerJSON["first_name"]);
                    $("#login-screen").slideUp();

                    customerAccounts[0];

                    $("#no-account-screen").hide();
                });
            } else { alert("Please input both your first and last name!"); }
        }
    });

    $("#no-create-account-btn").on("click", function(){
        $("#no-account-screen").hide();
    });

    $("button.token-btn").on("click", function(event){
        tokenName  = $(this).find(".token-name").text();
        tokenPrice = parseFloat($(this).find(".token-price").text());

        if(customerAccounts === undefined || customerAccounts.length == 0){
            require(['account'], function (account) {

                var acct = account.initWithKey(apiKey);

                var newAcctDetails = "{ \"type\": \"Credit Card\", \"nickname\": \"My Account\", \"rewards\": 100, \"balance\": 1000 }"
                acct.createAccount(customerJSON["_id"], newAcctDetails);
                customerAccounts = acct.getAllByCustomerId(customerJSON["_id"]);

                console.log("Created New Account");

                console.log("C: "+customerAccounts["_id"]);

            });
        }
        $(".val-display:eq(0) h2:eq(0)").append(parseInt(customerAccounts[0]["balance"]));
        $(".val-display:eq(1) h2:eq(0)").append(parseInt(customerAccounts[0]["rewards"]));

        $(".val-display:eq(0) h2:eq(1)").append(Math.round(100*parseInt(customerAccounts[0]["balance"])/tokenPrice)/100 +" "+ tokenName);
        $(".val-display:eq(1) h2:eq(1)").append(Math.round(100*parseInt(customerAccounts[0]["rewards"])/tokenPrice)/100 +" "+ tokenName);

        $("#token-screen").slideUp();

        console.log("C: "+customerAccounts);

        customerAccounts.forEach(function(entry) {
            console.log(entry);
        });

    });


    $("button#token-submit").on("click", function(event){
        tokenName  = $("#token-name-field").val();
        tokenPrice = $("#token-cost-field").val();

        if(customerAccounts === undefined || customerAccounts.length == 0){
            require(['account'], function (account) {

                var acct = account.initWithKey(apiKey);

                var newAcctDetails = "{ \"type\": \"Credit Card\", \"nickname\": \"My Account\", \"rewards\": 100, \"balance\": 1000 }"
                acct.createAccount(customerJSON["_id"], newAcctDetails);
                customerAccounts = acct.getAllByCustomerId(customerJSON["_id"]);

                console.log("Created New Account");

                console.log("C: "+customerAccounts["_id"]);

            });
        }
        $(".val-display:eq(0) h2:eq(0)").append(parseInt(customerAccounts[0]["balance"]));
        $(".val-display:eq(1) h2:eq(0)").append(parseInt(customerAccounts[0]["rewards"]));

        $(".val-display:eq(0) h2:eq(1)").append(Math.round(100*parseInt(customerAccounts[0]["balance"])/tokenPrice)/100 +" "+ tokenName);
        $(".val-display:eq(1) h2:eq(1)").append(Math.round(100*parseInt(customerAccounts[0]["rewards"])/tokenPrice)/100 +" "+ tokenName);

        $("#token-screen").slideUp();

        console.log("C: "+customerAccounts);

        customerAccounts.forEach(function(entry) {
            console.log(entry);
        });

    });
});

function getCustomerByName (cust, name) {

    console.log("Searching Through customers");

    var allCustomers = cust.getCustomers();
    var myCustomer = null;

    // loop through all customers and log their info
    console.log("Searching Through customers");
    for (var i = 0; i < allCustomers.length; i++) {
        var firstName = allCustomers[i].first_name;
        var lastName = allCustomers[i].last_name;

        if((firstName +" "+ lastName) == name) {
            myCustomer = allCustomers[i];
        }
    }
    return myCustomer;
}


//
// function postCustomer (key, cust) {
//   // build customer data
//   var newCustDetails ="{ \"first_name\": \"" + customerFirstName + "\", \"last_name\": \"" + customerLastName + "\", \"address\": { \"street_number\": \"1\", \"street_name\": \"Capital One Dr.\", \"city\": \"McLean\", \"state\": \"VA\", \"zip\": \"22102\" } }";
//
//   // make the API call, returns response code
//   var responseCode = cust.createCustomer(newCustDetails);
//
//   // console logging and update web page
//   console.log("[Customer - Create Customer] Response Code: " + responseCode);
//   $('#postCustomer').html("Create Customer: Response Code <b>" + responseCode + "</b>")
// }
