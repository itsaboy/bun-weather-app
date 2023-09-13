// get geo data
const getGeoData = async (currentLocation) => {
    const req = `${endpoint}/geo/1.0/direct?q=${currentLocation.city},${currentLocation.state},${currentLocation.country}&appid=${key}`;
    const res = await fetch(req);
    const geoData = await res.json();

    if (res.status === 200 && newSearch === true) {
        displayLocation(currentLocation);
        saveLocation(currentLocation);
        newSearch = false;
        getCurrentWeather(geoData[0]);
        getForecastWeather(geoData[0]);
    } else if (res.status === 200 && newSearch === false) {
        displayLocation(currentLocation);
        getCurrentWeather(geoData[0]);
        getForecastWeather(geoData[0]);
    } else {
        displayErrorModal(`Status: ${res.status}`);
    };
};

// get current weather
const getCurrentWeather = async (geoData) => {
    const latitude = geoData.lat;
    const longitude = geoData.lon;

    const req = `${endpoint}/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${key}`;
    const res = await fetch(req);
    const currentData = await res.json();
    
    if (res.status === 200) {
        displayCurrentWeather(currentData);
    } else {
        displayErrorModal(`Status: ${res.status}`);
    };
};

// get five-day forecast
const getForecastWeather = async (geoData) => {
    const latitude = geoData.lat;
    const longitude = geoData.lon;

    const req = `${endpoint}/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${key}`;
    const res = await fetch(req);
    const forecastData = await res.json();
    
    if (res.status === 200) {
        displayForecastWeather(forecastData);
    } else {
        displayErrorModal(`Status: ${res.status}`);
    };
};

// saves new location
const saveLocation = (currentLocation) => {
    history.push(currentLocation);
    for (let i = 0; i < history.length; i++) {
        localStorage.setItem(i, JSON.stringify(history[i]));
    };
    loadLocations();
    currentLocation.country = "";
    currentLocation.state = "";
    currentLocation.city = "";
};

// loads saved locations
const loadLocations = () => {
    history = [];
    for (let i = 0; i < localStorage.length; i++) {
        history.push(JSON.parse(localStorage[i]));
    };
    populateDropdown();
};

// reloads saved locations after one is deleted
const reloadLocations = () => {
    for (let i = 0; i < history.length; i++) {
        localStorage.setItem(i, JSON.stringify(history[i]));
    };
    loadLocations();
}

// deletes saved location
const deleteLocation = () => {
    for (let i = 0; i < history.length; i++) {
        if (history[i].country === currentLocation.country
        && history[i].state === currentLocation.state
        && history[i].city === currentLocation.city) {
            history.splice(i, 1);
            localStorage.clear();
        };
    };
    currentLocation.country = "";
    currentLocation.state = "";
    currentLocation.city = "";
    reloadLocations();
};

// fills saved locations dropdown
const populateDropdown = () => {
    $("#saved-locations").empty();
    $("#saved-locations").append(`<option value="none" selected disabled>Location</option>`);
    for (let i = 0; i < history.length; i++) {
        if (!history[i].state) {
            const loadedLocation =  $(`<option>${history[i].city}, ${history[i].country}</option>`);
            loadedLocation.attr("country", history[i].country);
            loadedLocation.attr("state", "");
            loadedLocation.attr("city", history[i].city);
            $("#saved-locations").append(loadedLocation);
        } else {
            const loadedLocation =  $(`<option>${history[i].city}, ${history[i].state}, ${history[i].country}</option>`);
            loadedLocation.attr("country", history[i].country);
            loadedLocation.attr("state", history[i].state);
            loadedLocation.attr("city", history[i].city);
            $("#saved-locations").append(loadedLocation);
        };     
    };
};

// displays current location
const displayLocation = (currentLocation) => {
    if (!currentLocation.state) {
        $("#location").text(`${currentLocation.city}, ${currentLocation.country}`);
    } else {
        $("#location").text(`${currentLocation.city}, ${currentLocation.state}, ${currentLocation.country}`);
    };
};

// displays current weather
const displayCurrentWeather = (currentData) => {
    $("#current-data").removeClass("hidden");
    unixTime = dayjs().utc().unix() * 1000;
    unixOffset = currentData.timezone;
    currentDate = dayjs(unixTime - unixOffset).format("MMM-D-YYYY");
    currentDayOfWeek = dayjs(unixTime - unixOffset).format("dddd");
    $("#day0-date").text(currentDate);
    $("#day0-day").text(currentDayOfWeek);
    $("#day0-descr").text(currentData.weather[0].main);
    $("#day0-temp").text(`Temp: ${currentData.main.temp.toFixed(0)}° F`);
    $("#day0-feels").text(`Feels Like: ${currentData.main.feels_like.toFixed(0)}° F`);
    $("#day0-humid").text(`Humidity: ${currentData.main.humidity}%`);
    $("#day0-wind").text(`Wind Speed: ${currentData.wind.speed} mph`);
    if (currentData.weather[0].main === "Clear") {
        $("#day0-icon").attr("src", sunny);
    } else if (currentData.weather[0].main === "Clouds") {
        $("#day0-icon").attr("src", cloudy);
    } else if (currentData.weather[0].main === "Rain") {
        $("#day0-icon").attr("src", rainy);
    } else if (currentData.weather[0].main === "Thunderstorm") {
        $("#day0-icon").attr("src", stormy);
    } else if (currentData.weather[0].main === "Snow") {
        $("#day0-icon").attr("src", snowy);
    } else if (currentData.weather[0].main === "Haze") {
        $("#day0-icon").attr("src", hazy);
    };    
};

// displays five-day forecast
const displayForecastWeather = (forecastData) => {
    // Label
    $("#forecast-labels").removeClass("hidden");
    // Day one
    $("#day1-data").removeClass("hidden");
    $("#day1-date").text(dayjs(unixTime).add(1, "day").startOf("day").format("MMM-D-YYYY"));
    $("#day1-day").text(dayjs(unixTime).add(1, "day").startOf("day").format("dddd"));
    $("#day1-descr").text(forecastData.list[0].weather[0].main);
    $("#day1-temp").text(`${forecastData.list[0].main.temp.toFixed(0)}° F`);
    $("#day1-feels").text(`${forecastData.list[0].main.feels_like.toFixed(0)}° F`);
    $("#day1-humid").text(`${forecastData.list[0].main.humidity}%`);
    $("#day1-wind").text(`${forecastData.list[0].wind.speed} mph`);
    if (forecastData.list[0].weather[0].main === "Clear") {
        $("#day1-icon").attr("src", sunny);
    } else if (forecastData.list[0].weather[0].main === "Clouds") {
        $("#day1-icon").attr("src", cloudy);
    } else if (forecastData.list[0].weather[0].main === "Rain") {
        $("#day1-icon").attr("src", rainy);
    } else if (forecastData.list[0].weather[0].main === "Thunderstorm") {
        $("#day1-icon").attr("src", stormy);
    } else if (forecastData.list[0].weather[0].main === "Snow") {
        $("#day1-icon").attr("src", snowy);
    } else if (forecastData.list[0].weather[0].main === "Haze") {
        $("#day1-icon").attr("src", hazy);
    };

    // Day two
    $("#day2-data").removeClass("hidden");
    $("#day2-date").text(dayjs(unixTime).add(2, "day").startOf("day").format("MMM-D-YYYY"));
    $("#day2-day").text(dayjs(unixTime).add(2, "day").startOf("day").format("dddd"));
    $("#day2-descr").text(forecastData.list[1].weather[0].main);
    $("#day2-temp").text(`${forecastData.list[1].main.temp.toFixed(0)}° F`);
    $("#day2-feels").text(`${forecastData.list[1].main.feels_like.toFixed(0)}° F`);
    $("#day2-humid").text(`${forecastData.list[1].main.humidity}%`);
    $("#day2-wind").text(`${forecastData.list[1].wind.speed} mph`);
    if (forecastData.list[1].weather[0].main === "Clear") {
        $("#day2-icon").attr("src", sunny);
    } else if (forecastData.list[1].weather[0].main === "Clouds") {
        $("#day2-icon").attr("src", cloudy);
    } else if (forecastData.list[1].weather[0].main === "Rain") {
        $("#day2-icon").attr("src", rainy);
    } else if (forecastData.list[1].weather[0].main === "Thunderstorm") {
        $("#day2-icon").attr("src", stormy);
    } else if (forecastData.list[1].weather[0].main === "Snow") {
        $("#day2-icon").attr("src", snowy);
    } else if (forecastData.list[1].weather[0].main === "Haze") {
        $("#day2-icon").attr("src", hazy);
    };

    // Day three
    $("#day3-data").removeClass("hidden");
    $("#day3-date").text(dayjs(unixTime).add(3, "day").startOf("day").format("MMM-D-YYYY"));
    $("#day3-day").text(dayjs(unixTime).add(3, "day").startOf("day").format("dddd"));
    $("#day3-descr").text(forecastData.list[2].weather[0].main);
    $("#day3-temp").text(`${forecastData.list[2].main.temp.toFixed(0)}° F`);
    $("#day3-feels").text(`${forecastData.list[2].main.feels_like.toFixed(0)}° F`);
    $("#day3-humid").text(`${forecastData.list[2].main.humidity}%`);
    $("#day3-wind").text(`${forecastData.list[2].wind.speed} mph`);
    if (forecastData.list[2].weather[0].main === "Clear") {
        $("#day3-icon").attr("src", sunny);
    } else if (forecastData.list[2].weather[0].main === "Clouds") {
        $("#day3-icon").attr("src", cloudy);
    } else if (forecastData.list[2].weather[0].main === "Rain") {
        $("#day3-icon").attr("src", rainy);
    } else if (forecastData.list[2].weather[0].main === "Thunderstorm") {
        $("#day3-icon").attr("src", stormy);
    } else if (forecastData.list[2].weather[0].main === "Snow") {
        $("#day3-icon").attr("src", snowy);
    } else if (forecastData.list[2].weather[0].main === "Haze") {
        $("#day3-icon").attr("src", hazy);
    };

    // Day four
    $("#day4-data").removeClass("hidden");
    $("#day4-date").text(dayjs(unixTime).add(4, "day").startOf("day").format("MMM-D-YYYY"));
    $("#day4-day").text(dayjs(unixTime).add(4, "day").startOf("day").format("dddd"));
    $("#day4-descr").text(forecastData.list[3].weather[0].main);
    $("#day4-temp").text(`${forecastData.list[3].main.temp.toFixed(0)}° F`);
    $("#day4-feels").text(`${forecastData.list[3].main.feels_like.toFixed(0)}° F`);
    $("#day4-humid").text(`${forecastData.list[3].main.humidity}%`);
    $("#day4-wind").text(`${forecastData.list[3].wind.speed} mph`);
    if (forecastData.list[3].weather[0].main === "Clear") {
        $("#day4-icon").attr("src", sunny);
    } else if (forecastData.list[3].weather[0].main === "Clouds") {
        $("#day4-icon").attr("src", cloudy);
    } else if (forecastData.list[3].weather[0].main === "Rain") {
        $("#day4-icon").attr("src", rainy);
    } else if (forecastData.list[3].weather[0].main === "Thunderstorm") {
        $("#day4-icon").attr("src", stormy);
    } else if (forecastData.list[3].weather[0].main === "Snow") {
        $("#day4-icon").attr("src", snowy);
    } else if (forecastData.list[3].weather[0].main === "Haze") {
        $("#day4-icon").attr("src", hazy);
    };

    // Day five
    $("#day5-data").removeClass("hidden");
    $("#day5-date").text(dayjs(unixTime).add(5, "day").startOf("day").format("MMM-D-YYYY"));
    $("#day5-day").text(dayjs(unixTime).add(5, "day").startOf("day").format("dddd"));
    $("#day5-descr").text(forecastData.list[4].weather[0].main);
    $("#day5-temp").text(`${forecastData.list[4].main.temp.toFixed(0)}° F`);
    $("#day5-feels").text(`${forecastData.list[4].main.feels_like.toFixed(0)}° F`);
    $("#day5-humid").text(`${forecastData.list[4].main.humidity}%`);
    $("#day5-wind").text(`${forecastData.list[4].wind.speed} mph`);
    if (forecastData.list[4].weather[0].main === "Clear") {
        $("#day5-icon").attr("src", sunny);
    } else if (forecastData.list[4].weather[0].main === "Clouds") {
        $("#day5-icon").attr("src", cloudy);
    } else if (forecastData.list[4].weather[0].main === "Rain") {
        $("#day5-icon").attr("src", rainy);
    } else if (forecastData.list[4].weather[0].main === "Thunderstorm") {
        $("#day5-icon").attr("src", stormy);
    } else if (forecastData.list[4].weather[0].main === "Snow") {
        $("#day5-icon").attr("src", snowy);
    } else if (forecastData.list[4].weather[0].main === "Haze") {
        $("#day5-icon").attr("src", hazy);
    };
};