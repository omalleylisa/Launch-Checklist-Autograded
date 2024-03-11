window.addEventListener("load", function () {
  // Set listedPlanetsResponse equal to the value returned by calling myFetch()
  let listedPlanetsResponse = myFetch();
  listedPlanetsResponse.then(function (result) {
    let listedPlanets = result;
    console.log(listedPlanets);

    // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.

    let selectedPlanet = pickPlanet(listedPlanets);
    console.log(selectedPlanet);

    addDestinationInfo(
      document,
      selectedPlanet.name,
      selectedPlanet.diameter,
      selectedPlanet.star,
      selectedPlanet.distance,
      selectedPlanet.moons,
      selectedPlanet.image
    );
  });

  // add event listener for button

  const button = document.querySelector("#formSubmit");
  button.addEventListener("click", function (event) {
    event.preventDefault();
    const pilot = document.querySelector("[name=pilotName]").value;
    const copilot = document.querySelector("[name=copilotName]").value;
    const fuelLevel = document.querySelector("[name=fuelLevel]").value;
    const cargoMass = document.querySelector("[name=cargoMass]").value;
    let list = document.getElementById("faultyItems");

    // Call formSubmission with the extracted values
   formSubmission(
   document,
   document.getElementById("faultyItems"),
   pilot,
   copilot,
   fuelLevel,
   cargoMass
);
  });
});
