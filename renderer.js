// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// http request function

var request = require('request');

function sendRequest () {
	var e = document.getElementById("requestMethod");
	var selectedMethod = document.getElementById("requestMethod").options[e.selectedIndex].value;
	var urlInput = document.getElementById("requestURL").value;

	request({
		method: selectedMethod,
		uri: urlInput,
	}, 
	function (error, response, body) {
		if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage.
    document.getElementById("responseBody").innerHTML = body;

} else {
	console.warn(error);
	document.getElementById("responseBody").innerHTML = body;

}
});
}


document.querySelector('#btnEd').addEventListener('click', sendRequest);
document.getElementById("requestURL").defaultValue = "https://httpbin.org/get";

// sql query function

function executeQuery(){

	var e = document.getElementById("dbClientSelect");
	var selectedDBClient = document.getElementById("dbClientSelect").options[e.selectedIndex].value;
	var queryInput = document.getElementById("queryText").value;

	const { Client } = require('pg');
	const client = new Client({
		user: 'postgres',
		host: 'localhost',
		database: 'db71u',
		password: 'secretpassword',
		port: 5432,
	});

	client.connect((err) => {
		if (err) {
			console.error('connection error', err.stack)
		} else {
			console.log('connected')
		}
	})

	client.query(queryInput, (err, res) => {
		console.log(err, res);
		console.log("Error = " + err);
		console.log("Rows = " + JSON.stringify(res.rows));
		document.getElementById("responseBody").innerHTML = "QUERY RESULT:  " +  JSON.stringify(res.rows);
		client.end()
	})
}
document.querySelector('#btnQuery').addEventListener('click', executeQuery);
document.getElementById("queryText").defaultValue = "SELECT * from rules.rule limit 5";
