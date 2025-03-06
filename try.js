//Fetch Planets WORKING
// document.addEventListener("DOMContentLoaded", () => {
//     const apiURL = "https://findfalcone.geektrust.com/planets"; 
//     const dropdowns = document.querySelectorAll(".dropdown");
    
//     // Fetch planets from API
//     fetch(apiURL)
//         .then(response => response.json())
//         .then(planets => {
//             dropdowns.forEach(dropdown => {
//                 planets.forEach(planet => {
//                     let option = document.createElement("option");
//                     option.value = planet.name;
//                     option.textContent = planet.name;
//                     dropdown.appendChild(option);
//                 });
//             });
//         })
//         .catch(error => console.error("Error fetching planets:", error));

//     // Prevent duplicate selection
//     dropdowns.forEach(dropdown => {
//         dropdown.addEventListener("change", () => {
//             let selectedValues = [...dropdowns].map(d => d.value);
//             dropdowns.forEach(dd => {
//                 [...dd.options].forEach(option => {
//                     option.hidden = selectedValues.includes(option.value) && option.value !== dd.value;
//                 });
//             });
//         });
//     });
// });


//WORKING DROPDOWNS AND RADIOBUTTONS
// document.addEventListener("DOMContentLoaded", async () => {
//     const planetURL = "https://findfalcone.geektrust.com/planets";
//     const vehicleURL = "https://findfalcone.geektrust.com/vehicles";
    
//     const dropdowns = document.querySelectorAll(".dropdown");
//     const vehicleContainers = document.querySelectorAll(".vehicle-options");

//     let planets = [];
//     let vehicles = [];
//     let selectedVehicles = {}; // Tracks selected vehicles per planet

//     try {
//         // Fetch planets & vehicles
//         const [planetData, vehicleData] = await Promise.all([
//             fetch(planetURL).then(res => res.json()),
//             fetch(vehicleURL).then(res => res.json())
//         ]);

//         planets = planetData;
//         vehicles = vehicleData.map(v => ({ ...v, used: 0 })); // Track used vehicles

//         // Populate dropdowns with planets
//         dropdowns.forEach(dropdown => {
//             dropdown.innerHTML = '<option value="">-- Select --</option>';
//             planets.forEach(planet => {
//                 let option = document.createElement("option");
//                 option.value = planet.name;
//                 option.textContent = planet.name;
//                 dropdown.appendChild(option);
//             });
//         });

//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }

//     // Prevent duplicate planet selection
//     dropdowns.forEach(dropdown => {
//         dropdown.addEventListener("change", () => {
//             let selectedValues = new Set([...dropdowns].map(d => d.value).filter(v => v));

//             dropdowns.forEach(dd => {
//                 [...dd.options].forEach(option => {
//                     option.hidden = selectedValues.has(option.value) && dd.value !== option.value;
//                 });
//             });

//             updateVehicleOptions();
//         });
//     });

//     function updateVehicleOptions() {
//         dropdowns.forEach((dropdown, index) => {
//             const selectedPlanet = dropdown.value;
//             const vehicleContainer = vehicleContainers[index];
//             vehicleContainer.innerHTML = ""; // Clear previous options

//             if (!selectedPlanet) return;

//             // Get planet distance
//             const planetData = planets.find(p => p.name === selectedPlanet);
//             if (!planetData) return;

//             // Store previous selection
//             let previousSelection = selectedVehicles[selectedPlanet] || "";

//             // Populate vehicle options
//             vehicles.forEach(vehicle => {
//                 const remainingVehicles = vehicle.total_no - vehicle.used;
//                 const isAvailable = remainingVehicles > 0 && vehicle.max_distance >= planetData.distance;

//                 let radio = document.createElement("input");
//                 radio.type = "radio";
//                 radio.name = `vehicle-${index}`;
//                 radio.value = vehicle.name;
//                 radio.dataset.vehicle = vehicle.name;
//                 radio.dataset.index = index;

//                 let label = document.createElement("label");
//                 label.textContent = `${vehicle.name} (Available: ${remainingVehicles}, Speed: ${vehicle.speed})`;

//                 if (vehicle.name === previousSelection) {
//                     radio.checked = true; // Restore checked state
//                 }

//                 radio.addEventListener("change", () => {
//                     selectedVehicles[selectedPlanet] = vehicle.name;
//                     updateVehicleCount();
//                 });

//                 if (isAvailable || radio.checked) {
//                     vehicleContainer.appendChild(radio);
//                     vehicleContainer.appendChild(label);
//                     vehicleContainer.appendChild(document.createElement("br"));
//                 }
//             });
//         });
//     }

//     function updateVehicleCount() {
//         // Reset used count
//         vehicles.forEach(vehicle => vehicle.used = 0);

//         // Count selected vehicles
//         Object.values(selectedVehicles).forEach(selectedVehicle => {
//             let vehicle = vehicles.find(v => v.name === selectedVehicle);
//             if (vehicle) vehicle.used++;
//         });

//         // Refresh availability without clearing selections
//         updateVehicleOptions();
//     }
// });

// document.addEventListener("DOMContentLoaded", async () => {
//     const planetURL = "https://findfalcone.geektrust.com/planets";
//     const vehicleURL = "https://findfalcone.geektrust.com/vehicles";
    
//     const dropdowns = document.querySelectorAll(".dropdown");
//     const vehicleContainers = document.querySelectorAll(".vehicle-options");
//     const timeDisplay = document.getElementById("total-time"); // Element to show total time

//     let planets = [];
//     let vehicles = [];
//     let selectedVehicles = {}; // Tracks selected vehicles per planet
//     let selectedTimes = {}; // Stores time taken for each pair

//     try {
//         // Fetch planets & vehicles
//         const [planetData, vehicleData] = await Promise.all([
//             fetch(planetURL).then(res => res.json()),
//             fetch(vehicleURL).then(res => res.json())
//         ]);

//         planets = planetData;
//         vehicles = vehicleData.map(v => ({ ...v, used: 0 })); // Track used vehicles

//         // Populate dropdowns with planets
//         dropdowns.forEach(dropdown => {
//             dropdown.innerHTML = '<option value="">-- Select --</option>';
//             planets.forEach(planet => {
//                 let option = document.createElement("option");
//                 option.value = planet.name;
//                 option.textContent = planet.name;
//                 dropdown.appendChild(option);
//             });
//         });

//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }

//     // Prevent duplicate planet selection
//     dropdowns.forEach(dropdown => {
//         dropdown.addEventListener("change", () => {
//             let selectedValues = new Set([...dropdowns].map(d => d.value).filter(v => v));

//             dropdowns.forEach(dd => {
//                 [...dd.options].forEach(option => {
//                     option.hidden = selectedValues.has(option.value) && dd.value !== option.value;
//                 });
//             });

//             updateVehicleOptions();
//         });
//     });

//     function updateVehicleOptions() {
//         dropdowns.forEach((dropdown, index) => {
//             const selectedPlanet = dropdown.value;
//             const vehicleContainer = vehicleContainers[index];
//             vehicleContainer.innerHTML = ""; // Clear previous options

//             if (!selectedPlanet) return;

//             // Get planet distance
//             const planetData = planets.find(p => p.name === selectedPlanet);
//             if (!planetData) return;

//             let previousSelection = selectedVehicles[selectedPlanet] || "";

//             vehicles.forEach(vehicle => {
//                 const remainingVehicles = vehicle.total_no - vehicle.used;
//                 const isAvailable = remainingVehicles > 0 && vehicle.max_distance >= planetData.distance;

//                 let radio = document.createElement("input");
//                 radio.type = "radio";
//                 radio.name = `vehicle-${index}`;
//                 radio.value = vehicle.name;
//                 radio.dataset.vehicle = vehicle.name;
//                 radio.dataset.index = index;

//                 let label = document.createElement("label");
//                 label.textContent = `${vehicle.name} (Available: ${remainingVehicles}, Speed: ${vehicle.speed})`;

//                 if (vehicle.name === previousSelection) {
//                     radio.checked = true;
//                 }

//                 radio.addEventListener("change", () => {
//                     selectedVehicles[selectedPlanet] = vehicle.name;
//                     selectedTimes[selectedPlanet] = planetData.distance / vehicle.speed; // Compute time
//                     updateVehicleCount();
//                 });

//                 if (isAvailable || radio.checked) {
//                     vehicleContainer.appendChild(radio);
//                     vehicleContainer.appendChild(label);
//                     vehicleContainer.appendChild(document.createElement("br"));
//                 }
//             });
//         });

//         updateTotalTime(); // Update the total time display
//     }

//     function updateVehicleCount() {
//         vehicles.forEach(vehicle => vehicle.used = 0); // Reset used count

//         Object.values(selectedVehicles).forEach(selectedVehicle => {
//             let vehicle = vehicles.find(v => v.name === selectedVehicle);
//             if (vehicle) vehicle.used++;
//         });

//         updateVehicleOptions(); // Refresh availability without removing selection
//     }

//     function updateTotalTime() {
//         let totalTime = Object.values(selectedTimes).reduce((sum, time) => sum + time, 0);
//         timeDisplay.textContent = `Total Time: ${totalTime.toFixed(2)} hours`;
//     }
// });


//WORKING TIME, PLANETS, VEHICLES, FIND
// document.addEventListener("DOMContentLoaded", async () => {
//     const planetURL = "https://findfalcone.geektrust.com/planets";
//     const vehicleURL = "https://findfalcone.geektrust.com/vehicles";
//     const tokenURL = "https://findfalcone.geektrust.com/token";
//     const findURL = "https://findfalcone.geektrust.com/find";

//     const dropdowns = document.querySelectorAll(".dropdown");
//     const vehicleContainers = document.querySelectorAll(".vehicle-options");
//     const timeDisplay = document.getElementById("total-time");
//     const resultDisplay = document.getElementById("result");
//     const findButton = document.getElementById("find-btn");

//     let planets = [];
//     let vehicles = [];
//     let selectedVehicles = {}; // Tracks selected vehicles per planet
//     let selectedTimes = {}; // Stores time taken for each pair

//     try {
//         const [planetData, vehicleData] = await Promise.all([
//             fetch(planetURL).then(res => res.json()),
//             fetch(vehicleURL).then(res => res.json())
//         ]);

//         planets = planetData;
//         vehicles = vehicleData.map(v => ({ ...v, used: 0 })); // Track used vehicles

//         // Populate dropdowns with planets
//         dropdowns.forEach(dropdown => {
//             dropdown.innerHTML = '<option value="">-- Select --</option>';
//             planets.forEach(planet => {
//                 let option = document.createElement("option");
//                 option.value = planet.name;
//                 option.textContent = planet.name;
//                 dropdown.appendChild(option);
//             });
//         });

//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }

//     dropdowns.forEach(dropdown => {
//         dropdown.addEventListener("change", () => {
//             let selectedValues = new Set([...dropdowns].map(d => d.value).filter(v => v));

//             dropdowns.forEach(dd => {
//                 [...dd.options].forEach(option => {
//                     option.hidden = selectedValues.has(option.value) && dd.value !== option.value;
//                 });
//             });

//             updateVehicleOptions();
//         });
//     });

//     function updateVehicleOptions() {
//         dropdowns.forEach((dropdown, index) => {
//             const selectedPlanet = dropdown.value;
//             const vehicleContainer = vehicleContainers[index];
//             vehicleContainer.innerHTML = ""; // Clear previous options

//             if (!selectedPlanet) return;

//             const planetData = planets.find(p => p.name === selectedPlanet);
//             if (!planetData) return;

//             let previousSelection = selectedVehicles[selectedPlanet] || "";

//             vehicles.forEach(vehicle => {
//                 const remainingVehicles = vehicle.total_no - vehicle.used;
//                 const isAvailable = remainingVehicles > 0 && vehicle.max_distance >= planetData.distance;

//                 let radio = document.createElement("input");
//                 radio.type = "radio";
//                 radio.name = `vehicle-${index}`;
//                 radio.value = vehicle.name;
//                 radio.dataset.vehicle = vehicle.name;
//                 radio.dataset.index = index;

//                 let label = document.createElement("label");
//                 label.textContent = `${vehicle.name} (Available: ${remainingVehicles}, Speed: ${vehicle.speed})`;

//                 if (vehicle.name === previousSelection) {
//                     radio.checked = true;
//                 }

//                 radio.addEventListener("change", () => {
//                     selectedVehicles[selectedPlanet] = vehicle.name;
//                     selectedTimes[selectedPlanet] = planetData.distance / vehicle.speed;
//                     updateVehicleCount();
//                 });

//                 if (isAvailable || radio.checked) {
//                     vehicleContainer.appendChild(radio);
//                     vehicleContainer.appendChild(label);
//                     vehicleContainer.appendChild(document.createElement("br"));
//                 }
//             });
//         });

//         updateTotalTime();
//     }

//     function updateVehicleCount() {
//         vehicles.forEach(vehicle => vehicle.used = 0); // Reset used count

//         Object.values(selectedVehicles).forEach(selectedVehicle => {
//             let vehicle = vehicles.find(v => v.name === selectedVehicle);
//             if (vehicle) vehicle.used++;
//         });

//         updateVehicleOptions();
//     }

//     function updateTotalTime() {
//         let totalTime = Object.values(selectedTimes).reduce((sum, time) => sum + time, 0);
//         timeDisplay.textContent = `Total Time: ${totalTime.toFixed(2)} hours`;
//     }

//     async function findFalcone() {
//         const selectedPlanets = [...dropdowns].map(d => d.value).filter(v => v);
//         const selectedVehicleNames = Object.values(selectedVehicles);

//         if (selectedPlanets.length < 4 || selectedVehicleNames.length < 4) {
//             resultDisplay.textContent = "Please select 4 planets and vehicles.";
//             return;
//         }

//         try {
//             // Step 1: Get the token
//             let tokenResponse = await fetch(tokenURL, {
//                 method: "POST",
//                 headers: { "Accept": "application/json" }
//             });
//             let tokenData = await tokenResponse.json();
//             let token = tokenData.token;

//             // Step 2: Find Falcone
//             let findResponse = await fetch(findURL, {
//                 method: "POST",
//                 headers: {
//                     "Accept": "application/json",
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     token,
//                     planet_names: selectedPlanets,
//                     vehicle_names: selectedVehicleNames
//                 })
//             });

//             let findData = await findResponse.json();

//             if (findData.status === "success") {
//                 resultDisplay.innerHTML = `🎉 Found Falcone on <b>${findData.planet_name}</b>!`;
//             } else {
//                 resultDisplay.textContent = "❌ Falcone not found. Try again!";
//             }
//         } catch (error) {
//             console.error("Error finding Falcone:", error);
//             resultDisplay.textContent = "⚠️ Error in the request. Please try again.";
//         }
//     }

//     findButton.addEventListener("click", findFalcone);
// });


document.addEventListener("DOMContentLoaded", async () => {
    const planetURL = "https://findfalcone.geektrust.com/planets";
    const vehicleURL = "https://findfalcone.geektrust.com/vehicles";
    const tokenURL = "https://findfalcone.geektrust.com/token";
    const findURL = "https://findfalcone.geektrust.com/find";

    const dropdowns = document.querySelectorAll(".dropdown");
    const vehicleContainers = document.querySelectorAll(".vehicle-options");
    const timeDisplay = document.getElementById("total-time");
    const resultDisplay = document.getElementById("result");
    const findButton = document.getElementById("find-btn");

    let planets = [];
    let vehicles = [];
    let selectedVehicles = {}; // Tracks selected vehicles per planet
    let selectedTimes = {}; // Stores time taken for each pair

    try {
        const [planetData, vehicleData] = await Promise.all([
            fetch(planetURL).then(res => res.json()),
            fetch(vehicleURL).then(res => res.json())
        ]);

        planets = planetData;
        vehicles = vehicleData.map(v => ({ ...v, used: 0 })); // Track used vehicles

        // Populate dropdowns with planets
        dropdowns.forEach(dropdown => {
            dropdown.innerHTML = '<option value="">-- Select --</option>';
            planets.forEach(planet => {
                let option = document.createElement("option");
                option.value = planet.name;
                option.textContent = planet.name;
                dropdown.appendChild(option);
            });
        });

    } catch (error) {
        console.error("Error fetching data:", error);
    }

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener("change", () => {
            let selectedValues = new Set([...dropdowns].map(d => d.value).filter(v => v));

            dropdowns.forEach(dd => {
                [...dd.options].forEach(option => {
                    option.hidden = selectedValues.has(option.value) && dd.value !== option.value;
                });
            });

            updateVehicleOptions();
        });
    });

    function updateVehicleOptions() {
        dropdowns.forEach((dropdown, index) => {
            const selectedPlanet = dropdown.value;
            const vehicleContainer = vehicleContainers[index];
            vehicleContainer.innerHTML = ""; // Clear previous options

            if (!selectedPlanet) return;

            const planetData = planets.find(p => p.name === selectedPlanet);
            if (!planetData) return;

            let previousSelection = selectedVehicles[selectedPlanet] || "";

            vehicles.forEach(vehicle => {
                const remainingVehicles = vehicle.total_no - vehicle.used;
                const isAvailable = remainingVehicles > 0 && vehicle.max_distance >= planetData.distance;

                let radio = document.createElement("input");
                radio.type = "radio";
                radio.name = `vehicle-${index}`;
                radio.value = vehicle.name;
                radio.dataset.vehicle = vehicle.name;
                radio.dataset.index = index;

                let label = document.createElement("label");
                label.textContent = `${vehicle.name} (Available: ${remainingVehicles}, Speed: ${vehicle.speed})`;

                if (vehicle.name === previousSelection) {
                    radio.checked = true;
                }

                radio.addEventListener("change", () => {
                    selectedVehicles[selectedPlanet] = vehicle.name;
                    selectedTimes[selectedPlanet] = planetData.distance / vehicle.speed;
                    updateVehicleCount();
                });

                if (isAvailable || radio.checked) {
                    vehicleContainer.appendChild(radio);
                    vehicleContainer.appendChild(label);
                    vehicleContainer.appendChild(document.createElement("br"));
                }
            });
        });

        updateTotalTime();
    }

    function updateVehicleCount() {
        vehicles.forEach(vehicle => vehicle.used = 0); // Reset used count

        Object.values(selectedVehicles).forEach(selectedVehicle => {
            let vehicle = vehicles.find(v => v.name === selectedVehicle);
            if (vehicle) vehicle.used++;
        });

        updateVehicleOptions();
    }

    function updateTotalTime() {
        let totalTime = Object.values(selectedTimes).reduce((sum, time) => sum + time, 0);
        timeDisplay.textContent = `Total Time: ${totalTime.toFixed(2)} hours`;
    }

    async function findFalcone() {
        const selectedPlanets = [...dropdowns].map(d => d.value).filter(v => v);
        const selectedVehicleNames = Object.values(selectedVehicles);
        const totalTime = Object.values(selectedTimes).reduce((sum, time) => sum + time, 0);
    
        if (selectedPlanets.length < 4 || selectedVehicleNames.length < 4) {
            alert("Please select 4 planets and vehicles.");
            return;
        }
    
        try {
            // Step 1: Get the token
            let tokenResponse = await fetch(tokenURL, {
                method: "POST",
                headers: { "Accept": "application/json" }
            });
            let tokenData = await tokenResponse.json();
            let token = tokenData.token;
    
            // Step 2: Find Falcone
            let findResponse = await fetch(findURL, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token,
                    planet_names: selectedPlanets,
                    vehicle_names: selectedVehicleNames
                })
            });
    
            let findData = await findResponse.json();
    
            // Step 3: Redirect to result.html with parameters
            let params = new URLSearchParams({
                status: findData.status,
                planet: findData.planet_name || "",
                time: totalTime.toFixed(2)
            });
    
            window.location.href = `result.php?${params.toString()}`;
    
        } catch (error) {
            console.error("Error finding Falcone:", error);
            alert("⚠️ Error in the request. Please try again.");
        }
    }
    
    findButton.addEventListener("click", findFalcone);
});
