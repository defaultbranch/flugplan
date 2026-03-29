# Flugplan - Flight Planning Application

## Overview
A single-page flight planning web application built with vanilla JavaScript and HTML/CSS. No frameworks or build tools required.

## Current Features
- Bare HTML page with heading
- Plain JavaScript data section
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
- JavaScript is embedded in `<script>` tag at bottom
- Keep markdown updated whenever HTML, requirements, or instructions change

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
- **Runway Number** - Identifier (e.g., "25L", "09R")
- **Parent Airport** - Reference to Airport entity

### VOR (VHF Omnidirectional Range)
- **Name** - Station name (e.g., "Kennedy VOR")
- **Frequency** - VHF frequency in MHz (e.g., "110.5")
- **Latitude** - Decimal degrees
- **Longitude** - Decimal degrees

VOR lookup note: coordinates can be looked up on OpenNav under `https://opennav.com/navaid/`; search for the navaid page for the station identifier/name there. The page shows latitude/longitude in DMS and also exposes decimal coordinates in the embedded map link.

## Planned Features
Document future features here as we build them.

## Known Issues
None yet.
