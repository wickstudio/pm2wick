import { createUniqueId, getConfiguration, updateConfiguration, apiRequest } from '../index';
import * as readline from 'readline';
import { URL } from 'url';

// Set up readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Helper function to prompt the user for input
function prompt(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

// Function to validate if a string is a valid URL
function isValidUrl(string: string): boolean {
    try {
        new URL(string);
        return true;
    } catch {
        return false;
    }
}

// Main function to drive the CLI
async function main() {
    console.log('Welcome to PM2Wick CLI');
    console.log('Support Server : discord.gg/wicks');
    
    try {
        const config = getConfiguration();
        
        // Check if a unique ID exists in the configuration
        if (!config.id) {
            const id = createUniqueId();
            console.log(`Generated new PM2Wick ID : ${id}`);
            updateConfiguration({ id });
        } else {
            console.log(`Your existing PM2Wick ID is : ${config.id}`);
        }

        console.log('\nWhat would you like to do?');
        console.log('1. Show current configuration');
        console.log('2. Update configuration');
        console.log('3. Make an API request');
        console.log('4. Exit');

        const choice = await prompt('Enter your choice (1-4) : ');

        // Handle the user's choice with appropriate actions
        switch (choice) {
            case '1':
                // Display the current configuration
                console.log('\nCurrent Configuration :');
                console.log(JSON.stringify(getConfiguration(), null, 2));
                break;

            case '2':
                // Prompt the user to update their token and prefix
                const newToken = await prompt('Enter your new token : ');
                const newPrefix = await prompt('Enter your new command prefix : ');

                if (!newToken || !newPrefix) {
                    console.log('Token and prefix cannot be empty.');
                    break;
                }

                updateConfiguration({ token: newToken, prefix: newPrefix });
                console.log('Configuration updated successfully.');
                break;

            case '3':
                // Prompt the user for API endpoint and data, then make the request
                let endpoint = await prompt('Enter the API endpoint : ');
                
                if (!isValidUrl(endpoint)) {
                    console.log('Invalid URL. Please enter a valid URL (e.g., http://localhost:3000)');
                    break;
                }
                
                const dataString = await prompt('Enter the data to send (as JSON) : ');
                try {
                    const data = JSON.parse(dataString);
                    const response = await apiRequest(endpoint, data);
                    console.log('API Response:');
                    console.log(response);
                } catch (err) {
                    console.error('Failed to make API request :', err);
                }
                break;

            case '4':
                // Exit the CLI
                console.log('Exiting PM2Wick CLI. Goodbye!');
                rl.close();
                return;

            default:
                // Handle invalid user choices
                console.log('Invalid choice. Please try again.');
                break;
        }
    } catch (err) {
        console.error('An error happened :', err);
    } finally {
        // Ensure the readline interface is closed
        rl.close();
    }
}

// Execute the main function, catching any unhandled errors
main().catch(err => {
    console.error('An unexpected error happened :', err);
    rl.close();
});
