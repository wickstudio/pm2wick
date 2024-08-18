"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUniqueId = createUniqueId;
exports.getConfiguration = getConfiguration;
exports.updateConfiguration = updateConfiguration;
exports.isValidUrl = isValidUrl;
exports.apiRequest = apiRequest;
// Import necessary modules
const generateId_1 = require("./lib/generateId");
const configManager_1 = require("./lib/configManager");
const apiClient_1 = require("./lib/apiClient");
const url_1 = require("url");
// Exported functions and types
/**
 * Generates a unique ID for the user.
 * @returns {string} The generated unique ID.
 */
function createUniqueId() {
    return (0, generateId_1.generateUniqueId)();
}
/**
 * Retrieves the configuration.
 * @returns {Record<string, any>} The current configuration.
 */
function getConfiguration() {
    return (0, configManager_1.getConfig)();
}
/**
 * Updates the configuration with new values.
 * @param {Record<string, any>} newConfig - The new configuration values.
 */
function updateConfiguration(newConfig) {
    (0, configManager_1.setConfig)(newConfig);
}
/**
 * Validates if the provided string is a valid URL.
 * @param {string} urlString - The string to validate as a URL.
 * @returns {boolean} True if valid, false otherwise.
 */
function isValidUrl(urlString) {
    try {
        new url_1.URL(urlString);
        return true;
    }
    catch {
        return false;
    }
}
/**
 * Makes an API request.
 * @param {string} endpoint - The API endpoint to request.
 * @param {Record<string, any>} data - The data to send in the request.
 * @returns {Promise<any>} The response from the API.
 */
async function apiRequest(endpoint, data) {
    if (!isValidUrl(endpoint)) {
        throw new Error('Invalid URL');
    }
    return await (0, apiClient_1.makeApiRequest)(endpoint, data);
}
