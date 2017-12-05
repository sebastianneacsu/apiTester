
/*function executeQuery(){

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


	const query = client.query('SELECT * from rules.rule limit 5')

	query.then((res) => {res.rows.forEach(row=>{
		console.log(row);
	});});


}
*/

function executeQuery(queryText){

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

	client.query(queryText, (err, res) => {
		console.log(err, res);
		console.log("Error = " + err);
		console.log("Rows = " + JSON.stringify(res.rows));
		document.getElementById("responseBody").innerHTML = "QUERY RESULT:  " +  JSON.stringify(res.rows);
		client.end()
	})
}

executeQuery("SELECT * from rules.rule limit 3");



//'SELECT * from rules.rule limit 10'