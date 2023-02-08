// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const appFunction = require('./website/app')

const app = express()
// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));

// end app initialization


// begin server code
app.get("/data", (req, res) => {
	res.send(projectData)
});


app.get("/datas", (req, res) => {
    appFunction.fetchData()
    // temperature:"30",
    // date:"2023-02--8",
    // user_response:"resp"
    projectData.temperature = "30 deg";
    projectData.date="2023-02-8";
    projectData.user_response="good weather";
	res.send(projectData)
});



// app.get("/api/v1/docs", (req, res) => {
// 	const fileDirectory = path.resolve(__dirname, ".", "public/");

// 	res.sendFile("docs/api.yml", { root: fileDirectory }, (err) => {
// 		res.end();

// 		if (err) throw err;
// 	});
// });














// Setup Server
const PORT = 3001

app.listen(PORT, function() {
    console.log(`app running on port ${PORT}`)
});