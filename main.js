window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureHigh = document.querySelector(".high-degree");
  let temperatureLow = document.querySelector(".low-degree");
  let humidityPercentage = document.querySelector(".humidity-percentage");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=7105d1d158a678c16174292e856f7e47&units=metric`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp, temp_min, temp_max, humidity } = data.main;
          const { main, icon } = data.weather[0];

          //   Set DOM elements from the API
          temperatureDegree.textContent = Math.round(temp);
          temperatureHigh.textContent = Math.round(temp_max);
          temperatureLow.textContent = Math.round(temp_min);
          humidityPercentage.textContent = humidity;
          temperatureDescription.textContent = main;
          locationTimezone.textContent = data.name;
          document.querySelector(
            ".weather-icon"
          ).src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        });
    });
  } else {
    alert("Please enable location for the site to work!");
  }
});
