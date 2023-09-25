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
const sunny = "/public/assets/icons/sunny.svg";
const cloudy = "/public/assets/icons/cloudy.svg";
const rainy = "/public/assets/icons/rainy.svg";
const stormy = "/public/assets/icons/stormy.svg";
const snowy = "/public/assets/icons/snowy.svg";
const hazy = "/public/assets/icons/hazy.svg";
const misty = "/public/assets/icons/misty.svg";
const notAvailable = "/public/assets/icons/NA.svg";