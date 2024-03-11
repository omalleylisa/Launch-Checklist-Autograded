// Requires cross-fetch to ensure fetch works in environments that do not natively support it.
require('cross-fetch/polyfill');

// Updates the mission target HTML with information about the destination planet.
function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    document.getElementById("missionTarget").innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
    `;
}

// Validates user input to determine if it's a number, empty, or a string.
function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    } else if (isNaN(Number(testInput))) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }
}

// Handles form submission, updating the shuttle requirements and displaying alerts if necessary.
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let launchReady = true;
    list.style.visibility = "hidden";

    document.getElementById("pilotStatus").textContent = `Pilot ${pilot} is ready for launch`;
    document.getElementById("copilotStatus").textContent = `Co-pilot ${copilot} is ready for launch`;

    if (validateInput(pilot) === "Empty" || validateInput(pilot) === "Is a Number") {
        alert("Please enter a valid name for the pilot that is not a number.");
        launchReady = false;
    }

    if (validateInput(copilot) === "Empty" || validateInput(copilot) === "Is a Number") {
        alert("Please enter a valid name for the co-pilot that is not a number.");
        launchReady = false;
    }

    if (validateInput(fuelLevel) === "Empty" || validateInput(fuelLevel) === "Not a Number" || Number(fuelLevel) < 10000) {
        document.getElementById("fuelStatus").textContent = "Fuel level too low for launch";
        launchReady = false;
    } else {
        document.getElementById("fuelStatus").textContent = "Fuel level high enough for launch";
    }

    if (validateInput(cargoLevel) === "Empty" || validateInput(cargoLevel) === "Not a Number" || Number(cargoLevel) > 10000) {
        document.getElementById("cargoStatus").textContent = "Cargo mass too heavy for launch";
        launchReady = false;
    } else {
        document.getElementById("cargoStatus").textContent = "Cargo mass low enough for launch";
    }

    if (!launchReady) {
        document.getElementById("launchStatus").textContent = "Shuttle Not Ready for Launch";
        document.getElementById("launchStatus").style.color = "red";
    } else {
        document.getElementById("launchStatus").textContent = "Shuttle is Ready for Launch";
        document.getElementById("launchStatus").style.color = "green";
    }

    list.style.visibility = "visible";
}


// Fetches planet data from an external source.
async function myFetch() {
    let planetsReturned;

    const response = await fetch('https://handlers.education.launchcode.org/static/planets.json');
    planetsReturned = await response.json();

    return planetsReturned;
}

// Selects a random planet from the list of planets for the mission target.
function pickPlanet(planets) {
    return planets[Math.floor(Math.random() * planets.length)];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
