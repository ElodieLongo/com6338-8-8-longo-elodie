const apiKey = "5e62588767f708095f07c8b5c02e7660";

let apiUrl = "https://api.openweathermap.org/data/3.0/onecall/timemachine?lat={lat}&lon={lon}&dt={time}&appid={apiKey}";

const geocodingURL = "https://api.openweathermap.org/geo/1.0/direct?q=$locationInput&limit&=1units=imperial&appid=${apiKey}";

const locationElement = document.querySelector("#weather h2");
const googleMapElement = document.querySelector("#weather a");
const weatherIconElement = document.querySelector("#weather img");
const currentWeatherDescriptionElement = document.querySelector("#weather p:nth-of-type(1)");
const currentTempElement = document.querySelector("#weather p:nth-of-type(2)");
const feelsLikeTempElement = document.querySelector("#weather p:nth-of-type(3)");
const lastUpdatedTimeElement = document.querySelector("#weather p:last-child");
const searchButton = document.querySelector('button[type="submit"]');
const locationInput = document.getElementById("weather-search");

searchButton.addEventListener("click", async function (event) {
    event.preventDefault();
    const userQuery = locationInput.value;
    if (userQuery) {
      try {
        // Fetch geocoding data to get latitude and longitude
        const geocodingResponse = await fetch(geocodingURL.replace("{location}", userQuery).replace("{apiKey}", apiKey));
        const geocodingData = await geocodingResponse.json();
  
        if (geocodingData.cod === 200) {
          const lat = geocodingData.coord.lat;
          const lon = geocodingData.coord.lon;
  
          // Fetch weather data using latitude and longitude
          const weatherURL = apiUrl.replace("{lat}", lat).replace("{lon}", lon).replace("{time}", "current").replace("{apiKey}", apiKey);
          const weatherResponse = await fetch(weatherURL);
          const weatherData = await weatherResponse.json();
  
          // Update the HTML elements with weather data
          locationElement.textContent = `${geocodingData.name}, ${geocodingData.sys.country}`;
          googleMapElement.href = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
          weatherIconElement.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
          currentWeatherDescriptionElement.textContent = weatherData.weather[0].description;
          currentTempElement.textContent = `Current: ${weatherData.main.temp}° F`;
          feelsLikeTempElement.textContent = `Feels like: ${weatherData.main.feels_like}° F`;
          lastUpdatedTimeElement.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
        } else {
          console.error("City not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  });