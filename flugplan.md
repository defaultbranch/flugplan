# Flugplan - Flight Planning Application

## Overview
A single-page flight planning web application built with HTML, small inline CSS, and vanilla JavaScript. No frameworks or build tools required.

## Current Features
- Single-screen layout with departure, arrival, airplane, and VOR input panels; output panels below
- Airport input fields in departure and arrival panels with dropdown suggestions and keyboard selection
- Runway select fields in departure and arrival panels, populated from the selected airport with runway name and orientation
- Airplane panel with airplane select field and editable cruise altitude input in feet MSL
- VOR station input field with dropdown suggestions and keyboard selection
- Selected and typed values in airport, runway, airplane, cruise altitude, and VOR controls are persisted in browser localStorage and restored on reload
- Map panel with a schematic 2D map (no map tiles)
- Schematic map shows selected departure and arrival airports and can highlight a selected VOR station
- Map caption shows route heading direction
- Altitude profile panel with altitude-over-distance chart
- Altitude chart uses miles on x-axis and feet MSL on y-axis
- Altitude chart ceilings at the selected cruise altitude when reachable, bounded by departure and arrival field elevation when necessary
- If the requested cruise altitude cannot be reached before descent must begin, the profile peaks at the climb-to-descent transition instead of forcing a cruise segment
- Altitude chart includes vertical bars for climb end and descent start, with x-axis indicators
- Plain JavaScript data section
- Airport data (LSMD Dübendorf, LSZF Birrfeld, LSZM Mollis Airfield) with latitude, longitude, altitude in feet MSL, and runway objects
- Airplane data with one entry (Cessna 172P Skyhawk) including climb, cruise, and descent performance
- VOR station data (ZURICH EAST, KLOTEN, WILLISAU) with code, frequency, latitude, and longitude

## Technology Stack
- **HTML5** - Semantic markup
- **JavaScript (ES6+)** - Plain vanilla JS, no dependencies

## Project Structure
```
flugplan/
├── flugplan.html     # Single page application
└── flugplan.md       # This documentation
```

## How to Run
1. Open `flugplan.html` directly in a web browser
2. No server needed - fully static

## Development Notes
- All code is in a single HTML file for simplicity
- Layout is intentionally minimal; avoid adding behavior unless explicitly requested
- JavaScript is embedded in `<script>` tag at bottom
- Browser localStorage is used to remember current control values across page reloads
- Keep markdown updated whenever HTML, requirements, or instructions change

## UI Notes
- Departure, arrival, airplane, and VOR are in the top input row/grid; the airplane panel contains airplane selection plus an editable cruise altitude field; map and altitude profile are side by side below
- Runway selects populate automatically when a known airport is selected or typed exactly
- Airplane select is populated from the airplane data array
- Selecting an airplane overwrites the cruise altitude field with that airplane's nominal cruise altitude, but the value can still be edited manually
- VOR input uses a custom suggestion list generated from the VOR data
- Each VOR suggestion is a single combined entry in the form `CODE - Name`
- VOR suggestions support typing either station code or human-readable name
- Airport, runway, airplane, cruise altitude, and VOR control values are restored from localStorage when the page reloads
- Output map is schematic SVG based on airport and VOR coordinates; no real map tiles are used
- Altitude profile is a schematic SVG derived from selected airports, airplane performance, and the current cruise altitude input
- Climb and descent segments keep the airplane's configured climb and descent rates; when cruise is impossible on the available distance, those segments meet directly at the peak altitude
- Climb-end and descent-start are indicated on the x-axis without text labels
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

### VOR (VHF Omnidirectional Range)
- **Name** - Station name (e.g., "Kennedy VOR")
- **Frequency** - VHF frequency in MHz (e.g., "110.5")
- **Latitude** - Decimal degrees
- **Longitude** - Decimal degrees

VOR lookup note: coordinates can be looked up on OpenNav under `https://opennav.com/navaid/`; search for the navaid page for the station identifier/name there. The page shows latitude/longitude in DMS and also exposes decimal coordinates in the embedded map link.

Airport lookup note: airport details can be looked up on OurAirports under `https://ourairports.com/airports/<ICAO>/`.

Current airport source: coordinates and field elevations for LSMD, LSZF, and LSZM were taken from OurAirports.

Current runway source: runway identifiers and available heading data for LSMD, LSZF, and LSZM were taken from OurAirports runways data.

## Next Session Handoff
- Keep markdown updated whenever HTML, requirements, or instructions change.
- Current outputs: Map and Altitude Profile are schematic SVGs; the map updates from selected departure/arrival airports and optional VOR, and the altitude profile updates from selected departure/arrival airports and airplane.
- The altitude profile uses the current cruise altitude input as its target ceiling when reachable; otherwise it peaks where fixed-rate climb transitions directly into fixed-rate descent.
- Runway dropdowns populate only for exact known airport values (`ICAO`, full name, or `ICAO - Name`).
- VOR input resolves exact known station values (`CODE`, full name, or `CODE - Name`) for selection/highlighting.
- Current control values persist in browser localStorage and are restored during initialization when valid, including cruise altitude.

## Planned Features
Document future features here as we build them.

## Known Issues
None yet.
