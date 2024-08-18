import axios, { AxiosResponse } from 'axios';

/**
 * Makes a POST request to the specified API endpoint with the provided data.
 * 
 * @param {string} endpoint - The API endpoint URL.
 * @param {Record<string, any>} data - The data to send in the request as a JSON object.
 * @returns {Promise<any>} - A promise that resolves with the response data or rejects with an error.
 * @throws Will throw an error if the request fails or if the endpoint is invalid.
 */
export async function makeApiRequest(endpoint: string, data: Record<string, any>): Promise<any> {
    try {
        // Make the API request using axios and return the response data
        const response: AxiosResponse<any> = await axios.post(endpoint, data);
        return response.data;
    } catch (error) {
        // Ensure the error is correctly typed and log a descriptive error message
        const err = error as any;
        console.error(`Error making API request to ${endpoint}:`, err.message || err);

        // Re-throw the error to allow further handling by the caller
        throw err;
    }
}
