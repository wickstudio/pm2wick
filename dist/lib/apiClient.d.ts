/**
 * Makes an API request to a specified endpoint with the provided data.
 * @param {string} endpoint - The API endpoint to send the request to.
 * @param {Record<string, any>} data - The data to include in the request body.
 * @returns {Promise<any>} - The response from the API.
 */
export declare function makeApiRequest(endpoint: string, data: Record<string, any>): Promise<any>;
