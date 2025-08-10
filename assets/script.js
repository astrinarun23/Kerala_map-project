// This function runs when the entire page is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check which page is currently active and call the appropriate function
    if (document.getElementById('map')) {
        initializeMap();
    }
    if (document.querySelector('.chart-container')) {
        initializeDashboard();
    }
});

// Function to fetch the GeoJSON data
async function getAccidentData() {
    try {
        const response = await fetch('data/kerala_accident_blackspots.geojson');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.features;
    } catch (error) {
        console.error('Error fetching accident data:', error);
        return [];
    }
}

// --- MAP INITIALIZATION (for index.html) ---
async function initializeMap() {
    const features = await getAccidentData();

    // Initialize the map and set its view to Kerala's approximate center
    const map = L.map('map').setView([9.9, 76.5], 8);

    // Add a tile layer from OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add markers for each blackspot
    features.forEach(feature => {
        const { coordinates } = feature.geometry;
        const properties = feature.properties;
        const [lon, lat] = coordinates;

        const marker = L.marker([lat, lon]).addTo(map);

        // Create popup content
        const popupContent = `
            <b>${properties.name}</b><br>
            District: ${properties.district}<br>
            Total Accidents: ${properties.total_accidents}<br>
            Total Fatalities: ${properties.total_fatalities}
        `;

        marker.bindPopup(popupContent);
    });
}


// --- DASHBOARD INITIALIZATION (for dashboard.html) ---
async function initializeDashboard() {
    const features = await getAccidentData();

    // --- Chart 1: Blackspots by District ---
    const districtCounts = features.reduce((acc, feature) => {
        const district = feature.properties.district;
        acc[district] = (acc[district] || 0) + 1;
        return acc;
    }, {});

    const districtCtx = document.getElementById('districtChart').getContext('2d');
    new Chart(districtCtx, {
        type: 'bar',
        data: {
            labels: Object.keys(districtCounts),
            datasets: [{
                label: 'Number of Blackspots',
                data: Object.values(districtCounts),
                backgroundColor: 'rgba(0, 74, 153, 0.7)',
                borderColor: 'rgba(0, 74, 153, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: { y: { beginAtZero: true } },
            responsive: true
        }
    });

    // --- Chart 2: Top 5 by Total Casualties ---
    const sortedByCasualties = [...features].sort((a, b) => b.properties.total_casualties - a.properties.total_casualties);
    const top5Casualties = sortedByCasualties.slice(0, 5);

    const casualtiesCtx = document.getElementById('casualtiesChart').getContext('2d');
    new Chart(casualtiesCtx, {
        type: 'bar',
        data: {
            labels: top5Casualties.map(f => f.properties.name),
            datasets: [{
                label: 'Total Casualties (Fatalities + Injuries)',
                data: top5Casualties.map(f => f.properties.total_casualties),
                backgroundColor: 'rgba(204, 0, 0, 0.7)',
                borderColor: 'rgba(204, 0, 0, 1)',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y', // Horizontal bar chart
            responsive: true
        }
    });

    // --- Chart 3: Accidents by Road Type ---
    const roadTypeCounts = features.reduce((acc, feature) => {
        const roadType = feature.properties.most_common_road_type;
        acc[roadType] = (acc[roadType] || 0) + 1;
        return acc;
    }, {});

    const roadTypeCtx = document.getElementById('roadTypeChart').getContext('2d');
    new Chart(roadTypeCtx, {
        type: 'pie',
        data: {
            labels: Object.keys(roadTypeCounts),
            datasets: [{
                label: 'Distribution by Road Type',
                data: Object.values(roadTypeCounts),
                backgroundColor: [
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                ],
                hoverOffset: 4
            }]
        },
        options: { responsive: true }
    });
}