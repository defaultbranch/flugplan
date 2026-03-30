/**
 * VOR reference data for the Flugplan application.
 *
 * This file contains static VOR station data used by the station autocomplete,
 * route map highlighting, and distance annotations in the altitude profile.
 *
 * Data conventions:
 * - Frequencies are stored in MHz.
 * - Coordinates use decimal degrees.
 * - Codes are the short station identifiers shown in the UI.
 * - The main page expects a global `vors` array from this script.
 */

/**
 * @typedef {object} Vor
 * VOR station metadata used by the station selector and route visualizations.
 *
 * @property {string} name
 * @property {string} code
 * @property {number} frequency
 * @property {number} latitude
 * @property {number} longitude
 */

/**
 * Known VOR stations currently available to the application.
 *
 * Keep entries normalized and stable because VOR lookup currently supports
 * exact resolution by station code, human-readable name, or the combined
 * `CODE - Name` display format.
 *
 * @type {Vor[]}
 */
const vors = [
    { name: 'ZURICH EAST', code: 'ZUE', frequency: 110.05, latitude: 47.592201, longitude: 8.817670 },
    { name: 'KLOTEN', code: 'KLO', frequency: 114.85, latitude: 47.457100, longitude: 8.545580 },
    { name: 'WILLISAU', code: 'WIL', frequency: 116.90, latitude: 47.178299, longitude: 7.905920 }
];

/**
 * Format a VOR station into the UI display value.
 *
 * @param {Vor} vor
 * @returns {string}
 */
function formatVor(vor) {
    return `${vor.code} - ${vor.name}`;
}

/**
 * Resolve a VOR from free-form user input.
 *
 * Matching rules are exact (case-insensitive) against:
 * - Station code (`ZUE`)
 * - Human-readable station name (`ZURICH EAST`)
 * - Combined display value (`ZUE - ZURICH EAST`)
 * - Frequency (`110.05`)
 *
 * @param {string} value
 * @returns {Vor | null}
 */
function findVor(value) {
    const normalized = value.trim().toLowerCase();
    const numericValue = Number.parseFloat(value);

    if (!normalized) {
        return null;
    }

    return vors.find((vor) => {
        const formatted = formatVor(vor).toLowerCase();
        return vor.code.toLowerCase() === normalized
            || vor.name.toLowerCase() === normalized
            || formatted === normalized
            || (Number.isFinite(numericValue) && Math.abs(vor.frequency - numericValue) < 0.0005);
    }) || null;
}