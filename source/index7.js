function showTemp(response) {
  //let city = response.data.city;
  let temp = Math.round(response.data.temperature.current);
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = `${temp}`;

  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = response.data.city;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;

  let time = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  time.innerHTML = formatDate(date);

  let icon = document.querySelector("#icon");
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" />`;

  console.log(response);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#searchCity");
  searchCity(searchInputElement.value);
}

function searchCity(city) {
  let apiKey = "oe055taad4b159f1c193102ce46d9b5e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#time");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

searchCity("Johannesburg");
