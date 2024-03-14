// Write your helper functions here!

require('cross-fetch/polyfill');

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

// function to validate the input in the form

function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    } else if (isNaN(testInput)) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }
}

// function to check the elements using validateInput and then list the results in the bottom box

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


// fetch the planets

}
async function myFetch() {
    let planetsReturned;

    const response = await fetch('https://handlers.education.launchcode.org/static/planets.json');
    planetsReturned = await response.json();

    return planetsReturned;
}

// random planet 

function pickPlanet(planets) {
    return planets[Math.floor(Math.random() * planets.length)];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
