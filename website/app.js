/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = '117185f20d89f35255df3556e43f4626&units=imperial';
let lat = 7.348720
const lon = 3.879290
const apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

// decide whether to fetch from API or app endpoint
let dataFetched = false

// Create a new date instance dynamically with JS
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const today  = new Date();


const readableDate = today.toLocaleDateString("en-US", options);

const generateBtn = document.getElementById('generate')
generateBtn.addEventListener('click', function () {
    // alert('btn clicked')
    fetchData();
})

// fetch data from open weather API
async function fetchData() {
    // form data validation
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value
    
    if (zip.length < 1 || feelings.length < 1) {
        console.log('validation failed')
        alert('please enter your zip code and tell us how you feel...')
    } else if (dataFetched == true) {
        fetchFromAppData()
    } else {
        fetchFromAPI()
    }
 }


async function fetchFromAPI() {
     console.log('fetching data from API...')
        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                //   console.log(data)
                console.log('data fetched...')
                console.log(data)
                // update live page with the data
                document.getElementById('temp').innerHTML = Math.round(data.main.temp) + 'degrees';
                document.getElementById('content').innerHTML = data.main.feels_like;
                document.getElementById("date").innerHTML = readableDate;

                // indicate that data has been fetched from API
                dataFetched = true;

        
                // update backend data
                const backendPostURL = "http://localhost:3001/data"
                const postOptions = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ temperature: data.main.temp, date: readableDate, feels_like:data.main.feels_like, zip: zip, feelings: feelings })
                }

                fetch(backendPostURL, postOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log('backend response:', data)
                    })
                
            })
    
            .catch(console.error())
}
 

async function fetchFromAppData() {
    console.log('fetching data from backend...')
    fetch("http://localhost:3001/all")
        .then(response => response.json())
        .then(data => {
             console.log('new backend response:', data)
             document.getElementById('temp').innerHTML = Math.round(data.temperature) + 'degrees';
             document.getElementById('content').innerHTML = data.feels_like;
             document.getElementById("date").innerHTML = readableDate;
        })
}