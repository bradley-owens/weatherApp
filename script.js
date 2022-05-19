// inputs
const citySearch = document.querySelector(".search");
const searchBtn = document.getElementById("button");

//time and info
const dateTime = document.getElementById("date-time");
const cityLocation = document.getElementById("location");

//Current data
const temp = document.getElementById("temperature");
const weatherDescription = document.getElementById("weather-description");
const windSpeed = document.getElementById("windSpeed");
const humidity = document.getElementById("humidity");
const icon = document.getElementById("icon");

//Hourly forecast

const hours = document.querySelectorAll(".hour");
const td1 = document.querySelector(".first-td");
const icon1 = document.querySelector(".first-icon");
const temp1 = document.querySelector(".first-temp");

const td2 = document.querySelector(".second-td");
const icon2 = document.querySelector(".second-icon");
const temp2 = document.querySelector(".second-temp");

const td3 = document.querySelector(".third-td");
const icon3 = document.querySelector(".third-icon");
const temp3 = document.querySelector(".third-temp");

const td4 = document.querySelector(".fourth-td");
const icon4 = document.querySelector(".fourth-icon");
const temp4 = document.querySelector(".fourth-temp");

const td5 = document.querySelector(".fifth-td");
const icon5 = document.querySelector(".fifth-icon");
const temp5 = document.querySelector(".fifth-temp");

searchBtn.addEventListener("click", function () {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      citySearch.value +
      "&appid=18668a4c2ad515c5b7e803dfd6a0af25&units=metric"
  )
    .then((response) => response.json())
    .then((data) => {
      if (data["message"] === "city not found") {
        alert("Not a valid city!");
      }

      //Location (city & country)
      const valueCityLocation = data["name"];
      const valueCountry = data["sys"]["country"];
      const geoLocation = `${valueCityLocation}, ${valueCountry}`;

      // Description
      const description = data["weather"][0].description;
      const correctDescription = description.replace(
        description[0],
        description[0].toUpperCase()
      );
      const feelsLikeTemp = data["main"]["feels_like"].toFixed(0);
      const stringDescription = `Feels like ${feelsLikeTemp}°C. ${correctDescription}`;

      //Windspeed
      const valueWindSpeed = `Wind: ${data["wind"]["speed"]}km`;

      //Humidity
      const valueHumidity = `Humidity: ${data["main"]["humidity"]}%`;

      //Main temperature
      const locationTemp = data["main"]["temp"].toFixed(0);
      const valueTemp = `${locationTemp}°C`;

      //icon
      const valueIcon = data["weather"][0].icon;

      //date and time

      let date = new Date(data["dt"] * 1000);
      const options = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
      };

      const formattedDate = new Intl.DateTimeFormat("en-AU", options).format(
        date
      );

      //Applying values to DOM

      cityLocation.innerHTML = geoLocation;
      weatherDescription.innerHTML = stringDescription;
      windSpeed.innerHTML = valueWindSpeed;
      humidity.innerHTML = valueHumidity;
      temp.innerHTML = valueTemp;
      icon.innerHTML = valueIcon;
      icon.src = `http://openweathermap.org/img/wn/${valueIcon}.png`;
      dateTime.innerHTML = formattedDate;

      // weekly forecast------------------------------------------

      fetch(
        "http://api.openweathermap.org/data/2.5/forecast?q=" +
          citySearch.value +
          "&appid=dbab33003a27afd19ca1089574e71c9b&units=metric"
      )
        .then((response) => response.json())
        .then((dataFive) => {
          //looping info from API and storing in arrays
          const dateArr = [];
          const tempArr = [];
          const iconArr = [];

          for (var i = 0; i < dataFive.list.length; i += 8) {
            const dateInfo = dataFive.list[i].dt_txt;
            const tempInfo = dataFive.list[i].main.temp;
            const iconInfo = dataFive.list[i].weather[0].icon;
            iconArr.push(iconInfo);
            tempArr.push(tempInfo);
            dateArr.push(dateInfo);
          }

          //Days----------------------------------------------------

          const dayArr = dateArr.map(function (arr) {
            var options = { weekday: "long" };
            const value = new Date(arr);
            const dayString = String(
              new Intl.DateTimeFormat("en-US", options).format(value)
            );
            return dayString.slice(0, 3);
          });

          //Destructuring and assigning
          const [firstD, secondD, thirdD, fourthD, fifthD] = dayArr;
          td1.innerHTML = firstD;
          td2.innerHTML = secondD;
          td3.innerHTML = thirdD;
          td4.innerHTML = fourthD;
          td5.innerHTML = fifthD;

          //Temp-----------------------------------------------------

          const formattedTempArr = tempArr.map(function (arr) {
            const valueTemp = arr.toFixed(0);
            return `${valueTemp}°C`;
          });

          //Destructuring and assigning
          const [firstT, secondT, thirdT, fourthT, fifthT] = formattedTempArr;
          temp1.innerHTML = firstT;
          temp2.innerHTML = secondT;
          temp3.innerHTML = thirdT;
          temp4.innerHTML = fourthT;
          temp5.innerHTML = fifthT;

          //icon--------------------------------------------------------------
          //Destructuring and assigning
          const [firstI, secondI, thirdI, fourthI, fifthI] = iconArr;
          icon1.src = `http://openweathermap.org/img/wn/${firstI}.png`;
          icon2.src = `http://openweathermap.org/img/wn/${secondI}.png`;
          icon3.src = `http://openweathermap.org/img/wn/${thirdI}.png`;
          icon4.src = `http://openweathermap.org/img/wn/${fourthI}.png`;
          icon5.src = `http://openweathermap.org/img/wn/${fifthI}.png`;
        });

      // Unpslash API for background IMG -------------------------------------------------------

      fetch(
        `https://api.unsplash.com/search/photos/?client_id=dbMN8qb4WA4zxiF3YJ5w7CizLQ-ajiZ7p7xYUD0njzI&query=${citySearch.value}`
      )
        .then((response) => response.json())
        .then((dataImg) => {
          // console.log(dataImg);

          const backgroundImg =
            dataImg.results[Math.trunc(Math.random() * 9) + 1]["urls"].regular;
          // console.log(backgroundImg);

          const bodyBackground = document.querySelector(".body");

          bodyBackground.style.backgroundImage = "url(" + backgroundImg + ")";

          citySearch.value = "";
        });
    });
});
