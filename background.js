// Define the unique identifier key
const ID_KEY = 'unique_identifier';

// Generate a new identifier if it doesn't already exist
function getOrCreateIdentifier() {
    return new Promise((resolve) => {
        chrome.storage.local.get([ID_KEY], (result) => {
            if (result[ID_KEY]) {
                resolve(result[ID_KEY]);
            } else {
                const uniqueId = crypto.randomUUID(); // Generate unique ID
                chrome.storage.local.set({ [ID_KEY]: uniqueId }, () => {
                    resolve(uniqueId);
                });
            }
        });
    });
}

// Send a GET request to the URL
async function sendGetRequest() {
    const uniqueId = await getOrCreateIdentifier();
    const url = `https://example.com?unique_id=${uniqueId}`; // Replace with your URL
    fetch(url)
        .then(response => console.log(`Request sent: ${url}`))
        .catch(error => console.error('Error sending request:', error));
}

// Event listeners
chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed.');
    sendGetRequest();
});

chrome.runtime.onStartup.addListener(() => {
    console.log('Chrome started.');
    sendGetRequest();
});
