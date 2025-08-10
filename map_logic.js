// Initialize the map
// Set view to a central point in Kerala (approx. [10.8505, 76.2711]) with a suitable zoom level
const map = L.map('map').setView([10.8505, 76.2711], 8);

// Add OpenStreetMap tiles as the base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to create a custom marker icon (optional, but improves visual appeal)
// You can customize the image URL or use Font Awesome/Lucide React for icons
const accidentIcon = L.divIcon({
    className: 'custom-div-icon',
    html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ef4444" width="24px" height="24px"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>', // A simple warning icon
    iconSize: [24, 24],
    iconAnchor: [12, 24], // Center the icon bottom
    popupAnchor: [0, -20] // Adjust popup position relative to icon
});

// Fetch the GeoJSON data
fetch('kerala_accident_blackspots.geojson')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Iterate over each feature (blackspot) in the GeoJSON data
        data.features.forEach(feature => {
            const latitude = feature.geometry.coordinates[1]; // GeoJSON is [lon, lat]
            const longitude = feature.geometry.coordinates[0];
            const properties = feature.properties;

            // Create a marker for each blackspot
            const marker = L.marker([latitude, longitude], { icon: accidentIcon }).addTo(map);

            // Create rich HTML content for the pop-up
            const popupContent = `
                <div class="p-2">
                    <h3 class="font-bold text-red-600 mb-1">${properties.name}</h3>
                    <p class="text-sm leading-tight"><strong>District:</strong> ${properties.district}</p>
                    <p class="text-sm leading-tight"><strong>Total Accidents:</strong> <span class="font-semibold text-gray-800">${properties.total_accidents}</span></p>
                    <p class="text-sm leading-tight"><strong>Fatalities:</strong> <span class="font-semibold text-red-700">${properties.total_fatalities}</span></p>
                    <p class="text-sm leading-tight"><strong>Grievous Injuries:</strong> <span class="font-semibold text-orange-600">${properties.total_grievous_injuries}</span></p>
                    <p class="text-sm leading-tight"><strong>Minor Injuries:</strong> <span class="font-semibold text-yellow-600">${properties.total_minor_injuries}</span></p>
                    <p class="text-sm leading-tight"><strong>Total Casualties:</strong> <span class="font-semibold text-blue-700">${properties.total_casualties}</span></p>
                    <p class="text-sm leading-tight"><strong>Most Common Accident Type:</strong> ${properties.most_common_accident_type}</p>
                    <p class="text-sm leading-tight"><strong>Most Common Collision:</strong> ${properties.most_common_collision}</p>
                    <p class="text-sm leading-tight"><strong>Most Common Road Type:</strong> ${properties.most_common_road_type}</p>
                    <p class="text-sm leading-tight"><strong>Most Common Weather:</strong> ${properties.most_common_weather}</p>
                    <p class="text-sm leading-tight"><strong>Most Common Traffic Control:</strong> ${properties.most_common_traffic_control}</p>
                </div>
            `;

            // Bind the pop-up to the marker
            marker.bindPopup(popupContent);
        });
    })
    .catch(error => {
        console.error('Error loading or parsing GeoJSON data:', error);
        // Display an error message on the map or console
        alert('Failed to load accident data. Please check the console for more details.');
    });

// Add a responsive resize handler for the map (important for CLS)
window.addEventListener('resize', function() {
    map.invalidateSize();
});
