# Kerala Accident Blackspots Visualization

This project provides an interactive visualization of accident blackspots across various districts in Kerala, India. It consists of an interactive map and dashboard with statistical insights.

## Features

- **Interactive Map**: View accident blackspots on an interactive map with detailed popups
- **Data Dashboard**: Statistical charts showing:
  - Distribution of blackspots by district
  - Top 5 most dangerous locations by casualties
  - Accident distribution by road type
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
kerala-accident-blackspots/
├── index.html              # Main page with interactive map
├── dashboard.html          # Dashboard with statistical charts
├── about.html             # About page with project information
├── assets/
│   ├── style.css          # Stylesheet for all pages
│   └── script.js          # JavaScript functionality
├── data/
│   └── kerala_accident_blackspots.geojson  # Accident data
└── README.md              # This file
```

## Technologies Used

- **HTML5**: Structure and content
- **CSS3**: Styling and responsive design
- **JavaScript (ES6+)**: Interactive functionality
- **Leaflet.js**: Interactive mapping library
- **Chart.js**: Data visualization charts
- **GeoJSON**: Geographic data format

## Installation and Setup

1. **Download/Clone the project**: Ensure you have all the files in the correct structure
2. **Local Server**: Open the project using a local web server (required for loading JSON data):

   **Option A: Using Python**
   ```bash
   # Navigate to the project directory
   cd kerala-accident-blackspots

   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   **Option B: Using Node.js**
   ```bash
   npx http-server
   ```

   **Option C: Using VS Code Live Server extension**
   - Install Live Server extension
   - Right-click on index.html and select "Open with Live Server"

3. **Access the application**:
   - Open your browser and navigate to `http://localhost:8000`

## Data Source

The accident data is stored in GeoJSON format and includes the following information for each blackspot:
- Location name and district
- Geographic coordinates
- Total accidents, fatalities, and casualties
- Most common accident types, collision types, and road conditions

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Internet Explorer 11+ (with limited support)
- Mobile browsers on iOS and Android

## Known Issues and Fixes Applied

### Original Issues Fixed:
1. **Path Mismatch**: HTML files were referencing `assets/` folder but files were in root
2. **Data Loading**: JavaScript was looking for data in `data/` folder but file was in root
3. **Error Handling**: Added fallbacks for when data fails to load
4. **Code Structure**: Improved code organization and comments

### Improvements Made:
- Added error handling for data loading failures
- Improved popup content with more detailed information
- Enhanced chart titles and legends
- Better responsive design
- Added loading states and fallback messages

## Usage

### Interactive Map (index.html)
- Click on markers to see detailed information about each blackspot
- Pan and zoom to explore different areas
- Hover over markers for quick information

### Dashboard (dashboard.html)
- View three different statistical visualizations:
  1. Bar chart showing blackspots by district
  2. Horizontal bar chart of top 5 most dangerous locations
  3. Pie chart showing distribution by road type

### About Page (about.html)
- Information about the project purpose and data source
- Disclaimer about data usage

## Development

To modify or extend this project:

1. **Adding new data**: Update the GeoJSON file in the `data/` folder
2. **Styling changes**: Modify `assets/style.css`
3. **Functionality changes**: Update `assets/script.js`
4. **New pages**: Add HTML files and update navigation in all files

## License

This is a demonstration project. The data is used as provided and has not been independently verified. Use at your own discretion.

## Support

If you encounter any issues:
1. Ensure you're running the project through a local server
2. Check browser console for error messages
3. Verify all files are in their correct locations as per the project structure
