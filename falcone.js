document.addEventListener("DOMContentLoaded", async () => {
    const planetURL = "https://findfalcone.geektrust.com/planets";
    const vehicleURL = "https://findfalcone.geektrust.com/vehicles";
    const tokenURL = "https://findfalcone.geektrust.com/token";
    const findURL = "https://findfalcone.geektrust.com/find";

    const dropdowns = document.querySelectorAll(".dropdown");
    const vehicleContainers = document.querySelectorAll(".vehicle-options");
    const timeDisplay = document.getElementById("total-time");
    const findButton = document.getElementById("find-button");

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
            dropdown.innerHTML = '<option value="">Choose a planet</option>';
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
            checkButtonState(); // Check button state after selecting a planet
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
                label.innerHTML = `<b>${vehicle.name}</b> | Speed: ${vehicle.speed} | ${remainingVehicles} left`;
                label.classList.add("radio-label"); 

                let img = document.createElement("img");
                img.src = `pics/${vehicle.name.toLowerCase()}.png`;
                img.alt = vehicle.name;
                img.classList.add("vehicle-pic");

                let optionWrapper = document.createElement("div");
                optionWrapper.classList.add("radio-option");
                optionWrapper.appendChild(radio);
                optionWrapper.appendChild(img);
                optionWrapper.appendChild(label);

                if (vehicle.name === previousSelection) {
                    radio.checked = true;
                }

                radio.addEventListener("change", () => {
                    selectedVehicles[selectedPlanet] = vehicle.name;
                    selectedTimes[selectedPlanet] = planetData.distance / vehicle.speed;
                    updateVehicleCount();
                    checkButtonState(); // Check button state after selecting a vehicle
                });

                if (isAvailable || radio.checked) {
                    vehicleContainer.appendChild(optionWrapper);
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
        timeDisplay.textContent = `Total Time: ${totalTime.toFixed(2)}`;
    }

    function checkButtonState() {
        const selectedPlanets = [...dropdowns].map(d => d.value).filter(v => v);
        const selectedVehicleNames = Object.values(selectedVehicles);

        if (selectedPlanets.length === 4 && selectedVehicleNames.length === 4) {
            findButton.disabled = false;
        } else {
            findButton.disabled = true;
        }
    }

    async function findFalcone() {
        const selectedPlanets = [...dropdowns].map(d => d.value).filter(v => v);
        const selectedVehicleNames = Object.values(selectedVehicles);
        const totalTime = Object.values(selectedTimes).reduce((sum, time) => sum + time, 0);
    
        if (selectedPlanets.length < 4 || selectedVehicleNames.length < 4) {
            return;
        }
    
        // Disable button and show loading text
        findButton.disabled = true;
        findButton.innerHTML = `<img src="pics/searching.gif" alt="Searching..." class="searching-gif";">`;
        
        // Simulate a 3-second delay
        setTimeout(async () => {
            try {
                let tokenResponse = await fetch(tokenURL, {
                    method: "POST",
                    headers: { "Accept": "application/json" }
                });
                let tokenData = await tokenResponse.json();
                let token = tokenData.token;
    
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
    
                let params = new URLSearchParams({
                    status: findData.status,
                    planet: findData.planet_name || "",
                    time: totalTime.toFixed(2)
                });
    
                window.location.href = `result.php?${params.toString()}`;
    
            } catch (error) {
                console.error("Error finding Falcone:", error);
                alert("Error in the request. Please try again.");
            } finally {
                findButton.disabled = false; // Re-enable button if needed
                findButton.textContent = "Find Falcone";
            }
        }, 3000); // 3-second delay
    }
    
    findButton.addEventListener("click", findFalcone);

    checkButtonState(); // Initial check to disable the button at the start
});
