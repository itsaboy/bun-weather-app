const inputErrorCheck = () => {
    // checks if location already in history
    if (history.some(obj => obj.country === currentLocation.country)
    && history.some(obj => obj.state === currentLocation.state)
    && history.some(obj => obj.city === currentLocation.city)) {
        displayErrorModal("Location already in history!");
    } else {
        // checks if city or country input is empty
        if (!currentLocation.city || !currentLocation.country) {
            displayErrorModal("Invalid search parameters!");
        // checks if state input is empty when country is USA    
        } else if (currentLocation.country === "USA"
        && !currentLocation.state) {
            displayErrorModal("Please specify state!");
        } else {
            newSearch = true;           
            getGeoData(currentLocation);
        };
    };      
};

// error modal display
const displayErrorModal = (errorMessage) => {
    $("#error-code").text(errorMessage);
    $("#error-modal").removeClass("hidden");
    $("#header").addClass("opacity-50");
    $("#main").addClass("opacity-50");
    $("#footer").addClass("opacity-50");
    $("#search-button").removeClass("hover:bg-sky-200");
    $("#search-button").removeClass("hover:text-sky-950");
    $("#search-button").removeClass("hover:border-sky-800");
    $("#load-button").removeClass("hover:bg-sky-200");
    $("#load-button").removeClass("hover:text-sky-950");
    $("#load-button").removeClass("hover:border-sky-800");
    $("#delete-button").removeClass("hover:bg-sky-200");
    $("#delete-button").removeClass("hover:text-sky-950");
    $("#delete-button").removeClass("hover:border-sky-800");
    $("#country-input").prop("disabled", true);
    $("#state-input").prop("disabled", true);    
    $("#city-input").prop("disabled", true);
    $("#search-button").prop("disabled", true);
    $("#saved-locations").prop("disabled", true);
    $("#load-button").prop("disabled", true);
    $("#delete-button").prop("disabled", true);
};