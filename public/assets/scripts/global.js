// API variables
const endpoint = "https://api.openweathermap.org";
const key = "fd03838b9b2723c3ea2712dc8e4df0e6";

// Search variables
let history = [];
let newSearch = false;
let currentLocation = {
    country: "",
    state: "",
    city: ""
}

// Time settings
dayjs.extend(window.dayjs_plugin_utc);

// Current time, date, day of week
let unixTime;
let unixOffset;
let currentDate;
let currentDayOfWeek;

// Weather icon sources
const sunny = "./assets/icons/sunny.svg";
const cloudy = "./assets/icons/cloudy.svg";
const rainy = "./assets/icons/rainy.svg";
const stormy = "./assets/icons/stormy.svg";
const snowy = "./assets/icons/snowy.svg";
const hazy = "./assets/icons/hazy.svg";
const misty = "./assets/icons/misty.svg";
const notAvailable = "./assets/icons/NA.svg";