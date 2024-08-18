# PM2Wick

PM2Wick is a Node.js package designed to simplify the management of PM2 processes and unique ID generation. It provides essential utilities for interacting with PM2, making API requests, and managing configuration files with ease. This package is ideal for developers who need to automate or integrate PM2 process management in their Node.js applications.

## Features

- **Unique ID Generation**: Generate and store unique IDs in a file.
- **API Request Handling**: Easily make HTTP requests with robust error handling.
- **Configuration Management**: Read, write, and update configuration files seamlessly.
- **Customizable**: Use custom file systems or configuration paths for flexibility.

## Installation

To install PM2Wick, use npm:

```bash
npm install pm2wick
```

## Usage

### 1. Generating a Unique ID

PM2Wick allows you to generate a unique ID that is stored in a file. If the ID already exists, it returns the existing ID.

```javascript
const { createUniqueId } = require('pm2wick');

const uniqueId = createUniqueId();
console.log(`Generated Unique ID: ${uniqueId}`);
```

### 2. Making an API Request

You can make API requests with automatic error handling using the `apiRequest` function.

```javascript
const { apiRequest } = require('pm2wick');

async function makeRequest() {
    const endpoint = 'https://api.example.com/data';
    const data = { key: 'value' };

    try {
        const response = await apiRequest(endpoint, data);
        console.log('API Response:', response);
    } catch (error) {
        console.error('API request failed:', error);
    }
}

makeRequest();
```

### 3. Managing Configuration Files

You can easily manage your configuration files by reading, writing, or updating them with the following functions:

```javascript
const { getConfiguration, updateConfiguration } = require('pm2wick');

// Get the current configuration
const config = getConfiguration();
console.log('Current Configuration:', config);

// Update the configuration
updateConfiguration({ token: 'new-token', prefix: '!' });
console.log('Updated Configuration:', getConfiguration());
```

### 4. CLI Integration

PM2Wick can also be used in a CLI application to handle user inputs, manage configurations, and interact with APIs. See the [CLI Example](#cli-example) for more details.

## CLI Example

You can create a simple CLI tool using PM2Wick to manage your PM2 processes or perform other tasks.

```javascript
#!/usr/bin/env node

const { createUniqueId, getConfiguration, updateConfiguration, apiRequest } = require('pm2wick');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function prompt(question) {
    return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
    console.log('Welcome to PM2Wick CLI');

    const config = getConfiguration();
    if (!config.id) {
        const id = createUniqueId();
        console.log(`Generated new PM2Wick ID: ${id}`);
        updateConfiguration({ id });
    } else {
        console.log(`Your existing PM2Wick ID is: ${config.id}`);
    }

    const choice = await prompt('What would you like to do? (1: Show config, 2: Update config, 3: Make API request, 4: Exit): ');

    switch (choice) {
        case '1':
            console.log('Current Configuration:', getConfiguration());
            break;
        case '2':
            const token = await prompt('Enter new token: ');
            const prefix = await prompt('Enter new prefix: ');
            updateConfiguration({ token, prefix });
            console.log('Configuration updated.');
            break;
        case '3':
            const endpoint = await prompt('Enter API endpoint: ');
            const data = JSON.parse(await prompt('Enter data as JSON: '));
            try {
                const response = await apiRequest(endpoint, data);
                console.log('API Response:', response);
            } catch (error) {
                console.error('API request failed:', error);
            }
            break;
        case '4':
            console.log('Exiting...');
            rl.close();
            return;
        default:
            console.log('Invalid choice. Exiting...');
            rl.close();
            return;
    }

    rl.close();
}

main().catch(err => {
    console.error('An error occurred:', err);
    rl.close();
});
```

## Testing

PM2Wick includes a comprehensive test suite. To run the tests, simply use:

```bash
npm test
```

Tests are written using [Jest](https://jestjs.io/) and cover all key functionalities, including unique ID generation, API requests, and configuration management.

## Contributing

Contributions are welcome! Please submit an issue or a pull request on GitHub if you have suggestions or improvements.

## License

PM2Wick is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Support

For support, join our [Discord server](https://discord.gg/wicks).

---

Developed with ❤️ by [Wick Studio](https://wick-studio.com).