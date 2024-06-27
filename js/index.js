






let serchInput          = document.querySelector(".searchInput");
// console.log(date);

let currentDataDayName  = document.querySelector(".currentDataDayName");
let currentDayNumber    = document.querySelector(".currentDayNumber");
let currentDayMonth     = document.querySelector(".currentDayMonth");
let currentLocation     = document.querySelector(".currentLocation");
let currentTemp         = document.querySelector(".currentTemp");
let currentConditionImg = document.querySelector(".currentConditionImg");
let currentText         = document.querySelector(".currentText");
let humiditly           = document.querySelector(".humiditly");
let wind                = document.querySelector(".wind");
let windDirecton        = document.querySelector(".windDirecton");

let NextDayName         = document.querySelectorAll(".NextDayName");
let nextCondtionImg     = document.querySelectorAll(".nextCondtionImg");
let nextMaxTemp         = document.querySelectorAll(".nextMaxTemp");
let nextMinTemp         = document.querySelectorAll(".nextMinTemp");
let nextConditionText   = document.querySelectorAll(".nextConditionText");

async function getData(cityName) {
    let WeatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${cityName}&days=3`);
    let weatherData = await WeatherResponse.json();
    return weatherData;
};

function displayTodayData(data) {
    let date = new Date();
    currentDataDayName.innerHTML = date.toLocaleDateString("en-US", {weekday:"long"});
    currentDayNumber.innerHTML = date.getDate();
    currentDayMonth.innerHTML = date.toLocaleDateString("en-US", {month:"long"});
    currentLocation.innerHTML = data.location.name;
    currentTemp.innerHTML = data.current.temp_c;
    currentConditionImg.setAttribute("src", data.current.condition.icon);
    currentText.innerHTML = data.current.condition.text;
    humiditly.innerHTML = `${data.current.humidity}%`;
    wind.innerHTML = `${data.current.wind_kph} km/h`;
    windDirecton.innerHTML = data.current.wind_dir;
}

function displayNextDaysData(data) {
    let dataForecast = data.forecast.forecastday;
    for (let i = 0; i < 2; i++) {
        let nextDate = new Date(dataForecast[i+1].date);
        NextDayName[i].innerHTML = nextDate.toLocaleDateString("en-US", {weekday:"long"});
        nextMaxTemp[i].innerHTML = dataForecast[i+1].day.maxtemp_c;
        nextMinTemp[i].innerHTML = dataForecast[i+1].day.mintemp_c;
        nextCondtionImg[i].setAttribute("src", dataForecast[i+1].day.condition.icon);
        nextConditionText[i].innerHTML = dataForecast[i+1].day.condition.text;
    }
}

serchInput.addEventListener("keyup", function () {
    startApp(serchInput.value)
});

async function startApp(city = "dubai") {
    let weatherData = await getData(city);
    if (!weatherData.error) {
        displayTodayData(weatherData);
        displayNextDaysData(weatherData);
    }
};
startApp();