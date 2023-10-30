const apiKey = "5e62588767f708095f07c8b5c02e7660";

let apiUrl = "https://api.openweathermap.org/data/3.0/onecall/timemachine?lat={lat}&lon={lon}&dt={time}&appid={apiKey}";

const geocodingURL = "https://api.openweathermap.org/geo/1.0/direct?q=$locationInput&limit&=1units=imperial&appid=${apiKey}";

const weatherElement = document.querySelector("#weather");
const currentWeatherDescriptionElement = document.querySelector("#weather p:first-child");
const currentTempElement = document.querySelector("#weather p:nth-of-type(2)");
const feelsLikeTempElement = document.querySelector("#weather p:nth-of-type(3)");
const lastUpdatedTimeElement = document.querySelector("#weather p:last-child");
const searchButton = document.querySelector('button[type="submit"]');
const locationInput = document.getElementById("weather-search");

searchButton.addEventListener("click", async function (event) {
    event.preventDefault();
    const userInput = locationInput.value;
   
    const geocodingResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&limit=1&units=imperial&appid=${apiKey}`)
    const geocodingData = await geocodingResponse.json();
    locationInput.value = '';
if (geocodingData.cod == "404"){
  weatherElement.innerHTML = `<h2>Location Not Found</h2>`
  console.log(weatherElement)
  return
}

console.log(geocodingData)

    const date = new Date(geocodingData.dt*1000)
    const timeString = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    })

weatherElement.innerHTML = `<h2>${geocodingData.name}, ${geocodingData.sys.country}</h2>
<a href="https://www.google.com/maps/search/?api=1&query=${geocodingData.coord.lat},${geocodingData.coord.lon}"
target="__BLANK">Click to view map</a>
<img src="https://openweathermap.org/img/wn/${geocodingData.weather[0].icon}@2x.png">
<p style="text-transform: capitalize;">${geocodingData.weather[0].description}</p><br>
<p>Current: ${geocodingData.main.temp}° F</p>
<p>Feels like: ${geocodingData.main.feels_like}° F</p><br>
<p>Last updated: ${timeString}</p>`
});
