/**
 * Generates a unique ID for the user.
 * @returns {string} The generated unique ID.
 */
export declare function createUniqueId(): string;
/**
 * Retrieves the configuration.
 * @returns {Record<string, any>} The current configuration.
 */
export declare function getConfiguration(): Record<string, any>;
/**
 * Updates the configuration with new values.
 * @param {Record<string, any>} newConfig - The new configuration values.
 */
export declare function updateConfiguration(newConfig: Record<string, any>): void;
/**
 * Validates if the provided string is a valid URL.
 * @param {string} urlString - The string to validate as a URL.
 * @returns {boolean} True if valid, false otherwise.
 */
export declare function isValidUrl(urlString: string): boolean;
/**
 * Makes an API request.
 * @param {string} endpoint - The API endpoint to request.
 * @param {Record<string, any>} data - The data to send in the request.
 * @returns {Promise<any>} The response from the API.
 */
export declare function apiRequest(endpoint: string, data: Record<string, any>): Promise<any>;
