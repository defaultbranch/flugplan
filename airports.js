/**
 * Airport reference data for the Flugplan application.
 *
 * This file is intentionally limited to static airport data so it can be
 * loaded before the main application script and reused without pulling data
 * definitions into the UI logic.
 *
 * Data conventions:
 * - Coordinates use decimal degrees.
 * - Altitude is stored in feet MSL.
 * - Runway orientation is stored as magnetic runway direction in degrees.
 * - The main page expects a global `airports` array from this script.
 */

/**
 * @typedef {object} Coordinate
 * Geographic coordinate in decimal degrees.
 *
 * @property {number} latitude
 * @property {number} longitude
 */

/**
 * @typedef {object} Runway
 * Runway metadata used to populate the runway select controls.
 *
 * @property {string} name
 * @property {number} orientationDeg
 * @property {Coordinate} [threshold]
 */

/**
 * @typedef {object} Airport
 * Airport metadata used by the route inputs, schematic map, and altitude profile.
 *
 * @property {string} code
 * @property {string} name
 * @property {number} latitude
 * @property {number} longitude
 * @property {number} altitudeFeetMsl
 * @property {Runway[]} runways
 */

/**
 * Known airports currently available to the application.
 *
 * Keep entries normalized and stable because airport lookup currently supports
 * exact resolution by ICAO code, human-readable name, or the combined
 * `ICAO - Name` display format.
 *
 * @type {Airport[]}
 */
const airports = [
    {
        code: 'LSMD',
        name: 'Dübendorf',
        latitude: 47.398602,
        longitude: 8.648230,
        altitudeFeetMsl: 1470,
        runways: [
            { name: '11', orientationDeg: 108 },
            { name: '29', orientationDeg: 288 },
            { name: '11R', orientationDeg: 108 },
            { name: '29L', orientationDeg: 288 }
        ]
    },
    {
        code: 'LSME',
        name: 'Emmen Air Base',
        latitude: 47.092444,
        longitude: 8.305184,
        altitudeFeetMsl: 1400,
        runways: [
            {
                name: '04',
                orientationDeg: 40,
                threshold: {
                    latitude: 47.98342,
                    longitude: 8.29494
                }
            },
            {
                name: '22',
                orientationDeg: 220,
                threshold: {
                    latitude: 47.10132,
                    longitude: 8.31517
                }
            }
        ]
    },
    {
        code: 'LSZF',
        name: 'Birrfeld',
        latitude: 47.443600,
        longitude: 8.233610,
        altitudeFeetMsl: 1300,
        runways: [
            { name: '08L', orientationDeg: 80 },
            { name: '26R', orientationDeg: 260 },
            { name: '08R', orientationDeg: 80 },
            { name: '26L', orientationDeg: 260 }
        ]
    },
    {
        code: 'LSZM',
        name: 'Mollis Airfield',
        latitude: 47.078353,
        longitude: 9.064662,
        altitudeFeetMsl: 1485,
        runways: [
            { name: '01', orientationDeg: 13 },
            { name: '19', orientationDeg: 193 }
        ]
    },
    {
        code: 'LSZC',
        name: 'Buochs',
        latitude: 46.974444,
        longitude: 8.396944,
        altitudeFeetMsl: 1475,
        runways: [
            { name: '08', orientationDeg: 80 },
            { name: '26', orientationDeg: 260 }
        ]
    },
    {
        code: 'LSZH',
        name: 'Kloten Airport',
        latitude: 47.458056,
        longitude: 8.548056,
        altitudeFeetMsl: 1417,
        runways: [
            { name: '10', orientationDeg:  94 },
            {
                name: '28',
                orientationDeg: 274,
                threshold: {
                    latitude: 47.45655,
                    longitude: 8.57154
                }
            },
            { name: '14', orientationDeg: 135 },
            { name: '32', orientationDeg: 315 },
            { name: '16', orientationDeg: 153 },
            { name: '34', orientationDeg: 333 }
        ]
    },
    {
        code: 'LSZE',
        name: 'Bad Ragaz Airfield',
        latitude: 47.014904,
        longitude: 9.481815,
        altitudeFeetMsl: 1617,
        runways: [
            { name: '12', orientationDeg: 120 },
            { name: '30', orientationDeg: 300 }
        ]
    }
];

/**
 * Format an airport into the UI display value.
 *
 * @param {Airport} airport
 * @returns {string}
 */
function formatAirport(airport) {
    return `${airport.code} - ${airport.name}`;
}

/**
 * Format a runway into the UI display value.
 *
 * @param {Runway} runway
 * @returns {string}
 */
function formatRunway(runway) {
    return `${runway.name} (${runway.orientationDeg} deg)`;
}

/**
 * Resolve an airport from free-form user input.
 *
 * Matching rules are exact (case-insensitive) against:
 * - ICAO code (`LSMD`)
 * - Human-readable airport name (`Duebendorf`)
 * - Combined display value (`LSMD - Duebendorf`)
 *
 * @param {string} value
 * @returns {Airport | null}
 */
function findAirport(value) {
    const normalized = value.trim().toLowerCase();

    if (!normalized) {
        return null;
    }

    return airports.find((airport) => {
        const formatted = formatAirport(airport).toLowerCase();
        return airport.code.toLowerCase() === normalized
            || airport.name.toLowerCase() === normalized
            || formatted === normalized;
    }) || null;
}