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
    { name: 'ZURICH EAST', code: 'ZUE', frequency: 110.05, latitude: 47.591944, longitude: 8.8175 },
    { name: 'KLOTEN', code: 'KLO', frequency: 114.85, latitude: 47.456944, longitude: 8.545556 },
    { name: 'WILLISAU', code: 'WIL', frequency: 116.90, latitude: 47.178056, longitude: 7.905833 }
];

/**
 * Resolve a VOR from free-form user input.
 *
 * Matching rules are exact (case-insensitive) against:
 * - Station code (`ZUE`)
 * - Human-readable station name (`ZURICH EAST`)
 * - Combined display value (`ZUE - ZURICH EAST`)
 *
 * @param {string} value
 * @returns {Vor | null}
 */
function findVor(value) {
    const normalized = value.trim().toLowerCase();

    if (!normalized) {
        return null;
    }

    return vors.find((vor) => {
        const formatted = `${vor.code} - ${vor.name}`.toLowerCase();
        return vor.code.toLowerCase() === normalized
            || vor.name.toLowerCase() === normalized
            || formatted === normalized;
    }) || null;
}