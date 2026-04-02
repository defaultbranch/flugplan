# Flugplan - Flight Planning Application

## Overview
A single-page flight planning web application built with HTML, small inline CSS, and vanilla JavaScript. No frameworks or build tools required.

## Current Features
- Single-screen layout with departure, arrival, airplane, and VOR input panels; output panels below
- Airport input fields in departure and arrival panels with dropdown suggestions and keyboard selection
- Runway select fields in departure and arrival panels, populated from the selected airport with runway name and orientation
- Arrival panel includes a swap button to exchange departure and arrival airports/runways
- Airplane panel with airplane select field and editable performance inputs (cruise altitude, climb speed/rate, cruise speed, descent speed/rate)
- VOR station input field with dropdown suggestions and keyboard selection
- Selected and typed values in airport, runway, airplane, airplane performance inputs, and VOR controls are persisted in browser localStorage and restored on reload
- Map panel with a schematic 2D map (no map tiles)
- Schematic map shows selected departure and arrival airports and can highlight a selected VOR station
- Map caption shows route heading direction
- Altitude profile panel with altitude-over-distance chart
- Altitude chart uses nautical miles on x-axis and feet MSL on y-axis
- Altitude chart ceilings at the selected cruise altitude when reachable, bounded by departure and arrival field elevation when necessary
- If the requested cruise altitude cannot be reached before descent must begin, the profile peaks at the climb-to-descent transition instead of forcing a cruise segment
- Altitude chart includes vertical bars for climb end and descent start, with x-axis indicators
- Altitude chart x-axis shows selected-VOR distance annotations at takeoff, climb-end, descent-start, and landing points, and can also show climb/descent distance labels when space permits
- Altitude profile caption includes an estimated total flight time derived from climb, cruise, and descent speeds/distances
- Plain JavaScript data sections, with airport, airplane, and VOR data loaded from dedicated script files
- Airport data (LSMD Dübendorf, LSME Emmen Air Base, LSZF Birrfeld, LSZM Mollis Airfield, LSZC Buochs, LSZH Kloten Airport, LSZE Bad Ragaz Airfield) with latitude, longitude, altitude in feet MSL, and runway objects
- Airplane data with one entry (Cessna 172P Skyhawk) including climb, cruise, and descent performance
- VOR station data (ZURICH EAST, KLOTEN, WILLISAU) with code, frequency, latitude, and longitude

## Technology Stack
- **HTML5** - Semantic markup
- **JavaScript (ES6+)** - Plain vanilla JS, no dependencies

## Project Structure
```
flugplan/
├── airports.js       # Airport dataset with JSDoc typedefs
├── airplanes.js      # Airplane dataset with JSDoc typedefs
├── flugplan.css      # Application stylesheet
├── vors.js           # VOR dataset with JSDoc typedefs
├── flugplan.html     # Single page application shell and scripts
└── flugplan.md       # This documentation
```

## How to Run
1. Open `flugplan.html` directly in a web browser
2. No server needed - fully static

## Development Notes
- Airport data lives in `airports.js`; airplane data lives in `airplanes.js`; VOR data lives in `vors.js`; styles live in `flugplan.css`; the application logic remains embedded in `flugplan.html`
- Layout is intentionally minimal; avoid adding behavior unless explicitly requested
- CSS is loaded from `flugplan.css`
- `flugplan.html` loads `airports.js`, `airplanes.js`, and `vors.js` before the inline application script
- Main UI/rendering JavaScript remains embedded in the bottom `<script>` tag
- Browser localStorage is used to remember current control values across page reloads
- Keep markdown updated whenever HTML, requirements, or instructions change

## UI Notes
- Departure, arrival, airplane, and VOR are in the top input row/grid; the airplane panel contains airplane selection plus editable cruise altitude, climb speed/rate, cruise speed, and descent speed/rate; map and altitude profile are side by side below
- Input rows use a compact one-line layout with label and control aligned horizontally
- Labels are configured not to wrap in the one-line field layout
- Runway selects populate automatically when a known airport is selected or typed exactly
- Arrival panel swap button exchanges departure/arrival airport and runway selections, then refreshes map/profile output
- Airplane select is populated from the airplane data array
- Selecting an airplane overwrites airplane performance inputs with that airplane's nominal values, but each value can still be edited manually
- VOR input uses a custom suggestion list generated from the VOR data
- Each VOR suggestion is a single combined entry in the form `CODE - Name`
- VOR suggestions support typing station code, human-readable name, or frequency
- Airport, runway, airplane, airplane performance inputs, and VOR control values are restored from localStorage when the page reloads
- Output map is schematic SVG based on airport and VOR coordinates; no real map tiles are used
- Altitude profile is a schematic SVG derived from selected airports and the current airplane performance inputs
- Climb and descent segments keep the airplane's configured climb and descent rates; when cruise is impossible on the available distance, those segments meet directly at the peak altitude
- When a VOR is selected, VOR distances are annotated below the main x-axis distance labels for takeoff, climb-end, descent-start, and landing points along the computed route profile
- Climb-finish and descent-start distances are labeled on the x-axis only when the text fits without overlapping
- Airport inputs use custom suggestion lists generated from the airport data
- Each airport suggestion is a single combined entry in the form `ICAO - Name`
- Airport suggestions support typing either ICAO code or human-readable name
- Keyboard behavior for airport and VOR suggestions: down/up arrows move through suggestions, Enter selects, Escape closes

## Data Model / Entities

### Airport
- **ICAO Code** - Unique identifier (e.g., KJFK, EGLL)
- **Human-readable Name** - Full airport name (e.g., "John F. Kennedy International")
- **Latitude** - Decimal degrees
- **Longitude** - Decimal degrees
- **Altitude** - Feet MSL (above mean sea level)
- **Radios** - List of Radio entities for this airport
- **VORs** - List of VOR names relevant to this airport (for approaches/navigation)

### Radio
- **Name** - Radio type (e.g., "Tower", "Ground", "ATIS")
- **Frequency** - Frequency in MHz or Hz (e.g., "118.1")

### Runway
- **Name** - Runway identifier (e.g., "25L", "09R")
- **Orientation** - Direction in degrees (e.g., `108`)
- **Parent Airport** - Reference to Airport entity

### Airplane
- **Name** - Aircraft name (e.g., "Cessna 172P Skyhawk")
- **Nominal Climb Rate** - Feet per minute (e.g., `500`)
- **Climb Speed** - Knots (e.g., `75`)
- **Nominal Cruise Altitude** - Feet MSL (e.g., `5000`)
- **Cruise Speed** - Knots (e.g., `105`)
- **Nominal Descent Rate** - Feet per minute, negative for descent (e.g., `-500`)
- **Descent Speed** - Knots (e.g., `105`)

### Cruise Altitude Input
- **Cruise Altitude** - User-editable target cruise altitude in feet MSL
- **Default Source** - Overwritten from the selected airplane's nominal cruise altitude when airplane selection changes
- **Persistence** - Stored in browser localStorage and restored on reload

### Airplane Performance Inputs
- **Climb Speed** - User-editable climb speed in knots
- **Climb Rate** - User-editable climb rate in feet per minute
- **Cruise Speed** - User-editable cruise speed in knots
- **Descent Speed** - User-editable descent speed in knots
- **Descent Rate** - User-editable descent rate in feet per minute
- **Default Source** - Overwritten from the selected airplane's nominal values when airplane selection changes
- **Persistence** - Stored in browser localStorage and restored on reload

### VOR (VHF Omnidirectional Range)
- **Name** - Station name (e.g., "Kennedy VOR")
- **Frequency** - VHF frequency in MHz (e.g., "110.5")
- **Latitude** - Decimal degrees
- **Longitude** - Decimal degrees

VOR lookup note: coordinates can be looked up on OpenNav under `https://opennav.com/navaid/`; search for the navaid page for the station identifier/name there. The page shows latitude/longitude in DMS and also exposes decimal coordinates in the embedded map link.

Airport lookup note: airport details can be looked up on OurAirports under `https://ourairports.com/airports/<ICAO>/`.

Current airport source: coordinates and field elevations for LSMD, LSME, LSZF, LSZM, LSZC, LSZH, and LSZE were taken from OurAirports.

Current VOR source: frequencies and navaid coordinates for ZUE, KLO, and WIL were taken from OurAirports navaids data.

Implementation note: airport records plus airport/runway formatting and airport lookup helpers are declared in `airports.js` with JSDoc typing.

Implementation note: airplane records plus airplane lookup helper are declared in `airplanes.js` with JSDoc typing.

Implementation note: VOR records plus VOR formatting and lookup helpers are declared in `vors.js` with JSDoc typing.

Current helper ownership:
- `airports.js`: `formatAirport`, `formatRunway`, `findAirport`
- `airplanes.js`: `findAirplane`
- `vors.js`: `formatVor`, `findVor`

Current runway source: runway identifiers and available heading data for LSMD, LSZF, LSZM, LSZC, and LSZH were taken from OurAirports runways data. LSME runway identifiers (04/22) and LSZE runway identifiers (12/30) were verified from public airfield references and heading values are represented by runway designation (40/220 and 120/300).

## Next Session Handoff
- Keep markdown updated whenever HTML, requirements, or instructions change.
- Data and lookup/format helpers are now split into dedicated files (`airports.js`, `airplanes.js`, `vors.js`); main UI/rendering logic is still inline in `flugplan.html`.
- Script load order in `flugplan.html` matters: `airports.js`, `airplanes.js`, and `vors.js` must load before the inline app script.
- Current outputs: Map and Altitude Profile are schematic SVGs; the map updates from selected departure/arrival airports and optional VOR, and the altitude profile updates from selected departure/arrival airports plus current airplane performance inputs.
- The altitude profile uses the current cruise altitude input as its target ceiling when reachable; otherwise it peaks where fixed-rate climb transitions directly into fixed-rate descent.
- The altitude profile x-axis shows total route distance, selected-VOR distances at key flight phase points, and optional climb/descent distance labels when spacing allows.
- The altitude profile caption also shows estimated total flight time in minutes.
- Altitude-profile distances are based on airport and navaid reference-point coordinates, not the aircraft's exact parking/runway position.
- Runway dropdowns populate only for exact known airport values (`ICAO`, full name, or `ICAO - Name`).
- Arrival panel includes a `Swap with Departure` button that swaps both airport text values and runway selections.
- VOR input resolves exact known station values (`CODE`, full name, `CODE - Name`, or frequency) for selection/highlighting.
- Current control values persist in browser localStorage and are restored during initialization when valid, including airplane performance inputs.

## Planned Features
Document future features here as we build them.

## Known Issues
None yet.
