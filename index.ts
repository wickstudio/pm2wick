import { generateUniqueId } from './lib/generateId';
import { getConfig, setConfig } from './lib/configManager';
import { makeApiRequest } from './lib/apiClient';
import { URL } from 'url';

/**
 * Creates a new unique ID or retrieves the existing one.
 * 
 * @returns {string} - The generated or existing unique ID.
 */
export function createUniqueId(): string {
    return generateUniqueId();
}

/**
 * Retrieves the current configuration.
 * 
 * @returns {Record<string, any>} - The current configuration object.
 */
export function getConfiguration(): Record<string, any> {
    return getConfig();
}

/**
 * Updates the configuration with new values.
 * 
 * @param {Record<string, any>} newConfig - The new configuration values to be merged with the existing config.
 */
export function updateConfiguration(newConfig: Record<string, any>): void {
    setConfig(newConfig);
}

/**
 * Validates if a string is a valid URL.
 * 
 * @param {string} urlString - The string to validate as a URL.
 * @returns {boolean} - True if the string is a valid URL, otherwise false.
 */
export function isValidUrl(urlString: string): boolean {
    try {
        new URL(urlString);
        return true;
    } catch {
        return false;
    }
}

/**
 * Makes an API request to the specified endpoint with the provided data.
 * 
 * @param {string} endpoint - The API endpoint URL.
 * @param {Record<string, any>} data - The data to send in the API request as a JSON object.
 * @returns {Promise<any>} - A promise that resolves with the API response data or rejects with an error.
 * @throws Will throw an error if the endpoint is invalid or the request fails.
 */
export async function apiRequest(endpoint: string, data: Record<string, any>): Promise<any> {
    // Validate the URL before making the request
    if (!isValidUrl(endpoint)) {
        throw new Error('Invalid URL');
    }

    try {
        // Make the API request using the API client and return the response
        return await makeApiRequest(endpoint, data);
    } catch (error) {
        console.error(`Failed to make API request to ${endpoint}:`, error);
        // Re-throw the error for further handling
        throw error;
    }
}
