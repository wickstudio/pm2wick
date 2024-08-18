#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const readline = __importStar(require("readline"));
const url_1 = require("url");
// Initialize readline interface for command-line interaction
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Function to prompt the user for input
function prompt(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}
// Function to validate if the input is a valid URL
function isValidUrl(string) {
    try {
        new url_1.URL(string);
        return true;
    }
    catch {
        return false;
    }
}
// Main CLI logic
async function main() {
    console.log('Welcome to PM2Wick CLI');
    // Check if configuration exists
    const config = (0, index_1.getConfiguration)();
    if (!config.id) {
        // Generate a new unique ID if it doesn't exist
        const id = (0, index_1.createUniqueId)();
        console.log(`Generated new PM2Wick ID: ${id}`);
        // Save the ID to configuration
        (0, index_1.updateConfiguration)({ id });
    }
    else {
        console.log(`Your existing PM2Wick ID is: ${config.id}`);
    }
    // Prompt the user for an action
    console.log('\nWhat would you like to do?');
    console.log('1. Show current configuration');
    console.log('2. Update configuration');
    console.log('3. Make an API request');
    console.log('4. Exit');
    const choice = await prompt('Enter your choice (1-4): ');
    switch (choice) {
        case '1':
            console.log('\nCurrent Configuration:');
            console.log(JSON.stringify((0, index_1.getConfiguration)(), null, 2));
            break;
        case '2':
            const newToken = await prompt('Enter your new token: ');
            const newPrefix = await prompt('Enter your new command prefix: ');
            (0, index_1.updateConfiguration)({ token: newToken, prefix: newPrefix });
            console.log('Configuration updated successfully.');
            break;
        case '3':
            let endpoint = await prompt('Enter the API endpoint: ');
            // Validate the URL
            if (!isValidUrl(endpoint)) {
                console.log('Invalid URL. Please enter a valid URL (e.g., http://localhost:3000)');
                break;
            }
            const dataString = await prompt('Enter the data to send (as JSON): ');
            try {
                const data = JSON.parse(dataString);
                const response = await (0, index_1.apiRequest)(endpoint, data);
                console.log('API Response:');
                console.log(response);
            }
            catch (err) {
                console.error('Failed to make API request:', err);
            }
            break;
        case '4':
            console.log('Exiting PM2Wick CLI. Goodbye!');
            rl.close();
            return;
        default:
            console.log('Invalid choice. Please try again.');
            break;
    }
    // Close the readline interface and exit
    rl.close();
}
// Run the main function
main().catch(err => {
    console.error('An error occurred:', err);
    rl.close();
});
