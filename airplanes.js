/**
 * Airplane reference data for the Flugplan application.
 *
 * This file contains static aircraft performance defaults that are applied when
 * a user selects an airplane in the UI. The values here serve as nominal
 * starting points and can still be adjusted in the application after selection.
 *
 * Data conventions:
 * - Speeds are stored in knots.
 * - Altitude is stored in feet MSL.
 * - Climb and descent rates are stored in feet per minute.
 * - Nominal descent rate is negative in the data model to represent descent.
 * - The main page expects a global `airplanes` array from this script.
 */

/**
 * @typedef {object} Airplane
 * Airplane performance metadata used by the airplane selector and altitude profile.
 *
 * @property {string} name
 * @property {number} nominalClimbRateFeetPerMinute
 * @property {number} climbSpeedKts
 * @property {number} nominalCruiseAltitudeFeetMsl
 * @property {number} cruiseSpeedKts
 * @property {number} nominalDescentRateFeetPerMinute
 * @property {number} descentSpeedKts
 */

/**
 * Known airplanes currently available to the application.
 *
 * Keep entries normalized and stable because airplane lookup currently resolves
 * by exact airplane name selected from the UI.
 *
 * @type {Airplane[]}
 */
const airplanes = [
    {
        name: 'Cessna 172P Skyhawk',
        nominalClimbRateFeetPerMinute: 500,
        climbSpeedKts: 75,
        nominalCruiseAltitudeFeetMsl: 5000,
        cruiseSpeedKts: 105,
        nominalDescentRateFeetPerMinute: -500,
        descentSpeedKts: 105
    }
];