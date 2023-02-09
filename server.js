// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// const appFunction = require('./website/app')

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

// get projectdata
app.get("/all", (req, res) => {
    // return projectData
    res.send(projectData)
});

// update projectdata
app.post("/data", (req, res) => {
    const {temperature, date, zip, feels_like, feelings} = req.body
    const newData = saveData(temperature, date, zip, feels_like, feelings);
    console.log(newData)
    res.send(newData);
});


// save the data fetched from API to backend
function saveData(temperature, date, zip, feels_like, feelings) {
    projectData.temperature = temperature;
    projectData.date = date;
    projectData.feelings = feelings;
    projectData.feels_like = feels_like;
    projectData.zip = zip;
    return projectData;
}



// Setup Server
const PORT = 3001
app.listen(PORT, function() {
    console.log(`app running on port ${PORT}`)
});