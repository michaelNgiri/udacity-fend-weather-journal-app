/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = '117185f20d89f35255df3556e43f4626&units=imperial';
let lat = 7.348720
const lon = 3.879290
const apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// async
function fetchData(){
    console.log('hi')
    fetch(apiEndpoint)
        .then((data) => {
        console.log('data fetched...')
        console.log(data)
    })
 }
module.exports = { fetchData };