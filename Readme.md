# Kerala Accident Blackspots Dashboard

An interactive, data-driven dashboard created to visualize and analyze road accident blackspots across various districts in Kerala. This project aims to provide an accessible tool for public awareness, research, and policy-making by presenting key accident statistics on an interactive map and through analytical charts.

## Features

* **Interactive Map**: Displays all accident blackspots geographically, with pop-ups showing key details like total accidents and fatalities for each location.
* **Data Dashboard**: Presents aggregated data through a series of charts, including:
    * Number of blackspots per district.
    * The top 5 most dangerous locations by total casualties.
    * A breakdown of accidents by road type (NH, SH, City Road).
* **Responsive Design**: A clean, user-friendly interface that works on various screen sizes.

## Data Source

The analysis is based on a GeoJSON file (`kerala_accident_blackspots.geojson`) detailing accident statistics for specific locations in Kerala. The dataset for each blackspot includes geographical coordinates, total number of accidents, casualties, and common contributing factors like collision type and weather conditions.

## Technologies Used

* **Frontend**: HTML5, CSS3, JavaScript
* **Mapping Library**: [Leaflet.js](https://leafletjs.com/)
* **Charting Library**: [Chart.js](https://www.chartjs.org/)
* **Development Server**: [http-server](https://www.npmjs.com/package/http-server) (via Node.js and npm)

## Getting Started

To run this project locally, you will need to have [Node.js](https://nodejs.org/) and npm installed on your machine.

### Installation & Setup

1.  **Clone the repository (or create the files manually):**
    ```sh
    git clone <your-repository-url>
    cd kerala-accident-dashboard
    ```

2.  **Install development dependencies:**
    This command will read the `package.json` file and install the local web server.
    ```sh
    npm install
    ```

3.  **Run the local server:**
    This script will start the `http-server` and automatically open the website in your default browser.
    ```sh
    npm start
    ```

You should now be able to view the interactive map and navigate to the dashboard and about pages.