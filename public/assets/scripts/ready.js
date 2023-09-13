jQuery(() => {

    // checks if country selected is USA
    const checkIfUSA = () => {
        if ($("#country-input").val() !== "USA") {
            $("#state-input").prop("disabled", true);
            !currentLocation.state;
        } else {
            $("#state-input").prop("disabled", false);
        };
    };

    // sets current state
    $("#state-input").on("change", () => {
        currentLocation.state = $("#state-input option:selected").val();
    });

    // sets current country
    $("#country-input").on("change", () => {
        currentLocation.country = $("#country-input option:selected").val();
        checkIfUSA();
    });

    // search button
    $("#search-button").on("click", (event) => {
        event.preventDefault();
        currentLocation.city = $("#city-input").val().toUpperCase().trim();
        inputErrorCheck();
        fieldReset();
    });

    // sets location if selected in saved locations dropdown
    $("#saved-locations").on("change", () => {
        currentLocation.country = $("#saved-locations option:selected").attr("country");
        currentLocation.state = $("#saved-locations option:selected").attr("state");
        currentLocation.city = $("#saved-locations option:selected").attr("city");
    });

    // load button
    $("#load-button").on("click", (event) => {
        event.preventDefault();
        getGeoData(currentLocation);
    });

    // delete button
    $("#delete-button").on("click", (event) => {
        event.preventDefault();
        deleteLocation();
    });

    // resets fields after search
    const fieldReset = () => {
        $("#city-input").val("");
        $("#state-input").val("none");
        $("#country-input").val("none");
        $("#saved-locations").val("none"); 
    };

    // error modal "ok" button
    $("#error-button").on("click", () => {
        $("#error-modal").addClass("hidden");
        $("#header").removeClass("opacity-50");
        $("#main").removeClass("opacity-50");
        $("#footer").removeClass("opacity-50");
        $("#search-button").addClass("hover:bg-sky-200");
        $("#search-button").addClass("hover:text-sky-950");
        $("#search-button").addClass("hover:border-sky-800");
        $("#load-button").addClass("hover:bg-sky-200");
        $("#load-button").addClass("hover:text-sky-950");
        $("#load-button").addClass("hover:border-sky-800");
        $("#delete-button").addClass("hover:bg-sky-200");
        $("#delete-button").addClass("hover:text-sky-950");
        $("#delete-button").addClass("hover:border-sky-800");
        $("#country-input").prop("disabled", false);    
        $("#city-input").prop("disabled", false);
        $("#search-button").prop("disabled", false);
        $("#saved-locations").prop("disabled", false);
        $("#load-button").prop("disabled", false);
        $("#delete-button").prop("disabled", false);
        fieldReset();
    });

    checkIfUSA();
    loadLocations();

});