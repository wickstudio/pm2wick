import axios from 'axios';
import { makeApiRequest } from '../lib/apiClient';

// Mock the axios module to control its behavior in tests
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Client', () => {
    // Clear any mock data after each test to ensure test isolation
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should make a successful API request', async () => {
        // Mock a successful API response
        const mockData = { success: true, data: { id: '12345' } };
        mockedAxios.post.mockResolvedValue({ data: mockData });

        const endpoint = 'https://wick-studio.com/endpoint';
        const requestData = { key: 'value' };

        // Call the API client function
        const response = await makeApiRequest(endpoint, requestData);

        // Verify that the response matches the mock data
        expect(response).toEqual(mockData);

        // Ensure that axios was called with the correct parameters
        expect(mockedAxios.post).toHaveBeenCalledWith(endpoint, requestData);
    });

    test('should handle an API request error', async () => {
        // Mock console.error to suppress error output during the test
        const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
    
        // Mock a failed API response
        const mockError = new Error('Network Error');
        mockedAxios.post.mockRejectedValue(mockError);
    
        const endpoint = 'https://wick-studio.com/endpoint';
        const requestData = { key: 'value' };
    
        // Call the API client function and expect it to throw an error
        await expect(makeApiRequest(endpoint, requestData)).rejects.toThrow('Network Error');

        // Ensure that axios was called with the correct parameters
        expect(mockedAxios.post).toHaveBeenCalledWith(endpoint, requestData);
    
        // Restore console.error after the test to avoid side effects
        consoleErrorMock.mockRestore();
    });    
});
