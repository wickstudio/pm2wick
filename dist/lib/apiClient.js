"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeApiRequest = makeApiRequest;
const axios_1 = __importDefault(require("axios"));
/**
 * Makes an API request to a specified endpoint with the provided data.
 * @param {string} endpoint - The API endpoint to send the request to.
 * @param {Record<string, any>} data - The data to include in the request body.
 * @returns {Promise<any>} - The response from the API.
 */
async function makeApiRequest(endpoint, data) {
    try {
        const response = await axios_1.default.post(endpoint, data);
        return response.data;
    }
    catch (error) {
        // Typecasting error as any
        const err = error;
        console.error(`Error making API request to ${endpoint}:`, err.message || err);
        throw err;
    }
}
