const API_BASE_URL = 'http://127.0.0.1:5000'; // Ensure this matches your Flask backend URL

// Function to shorten a URL
// Function to shorten a URL
async function shortenUrl() {
    const originalUrl = document.getElementById('originalUrl').value;
    if (!originalUrl) {
        alert('Please enter a URL');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/shorten`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: originalUrl }),
        });

        const data = await response.json();
        if (response.status === 201) {
            // Display only the short code
            document.getElementById('shortUrlResult').innerText = `Short Code: ${data.shortCode}`;
        } else {
            // Display the error message from the backend
            document.getElementById('shortUrlResult').innerText = 'Error: ' + (data.message || 'Unknown error');
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('shortUrlResult').innerText = 'An error occurred: ' + error.message;
    }
}
// Function to retrieve the original URL
async function retrieveOriginalUrl() {
    const shortCode = document.getElementById('shortCode').value;
    if (!shortCode) {
        alert('Please enter a short code');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/shorten/${shortCode}`);
        const data = await response.json();
        if (response.status === 200) {
            document.getElementById('originalUrlResult').innerText = `Original URL: ${data.url}`;
        } else {
            document.getElementById('originalUrlResult').innerText = 'Error: ' + (data.message || 'Unknown error');
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('originalUrlResult').innerText = 'An error occurred: ' + error.message;
    }
}

// Function to update a URL
async function updateUrl() {
    const shortCode = document.getElementById('updateShortCode').value;
    const updatedUrl = document.getElementById('updatedUrl').value;

    if (!shortCode || !updatedUrl) {
        alert('Please enter both the short code and the updated URL');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/shorten/${shortCode}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: updatedUrl }),
        });

        const data = await response.json();
        if (response.status === 200) {
            document.getElementById('updateUrlResult').innerText = `URL updated successfully: ${data.url}`;
        } else {
            document.getElementById('updateUrlResult').innerText = 'Error: ' + (data.message || 'Unknown error');
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('updateUrlResult').innerText = 'An error occurred: ' + error.message;
    }
}

// Function to delete a URL
async function deleteUrl() {
    const shortCode = document.getElementById('deleteShortCode').value;
    if (!shortCode) {
        alert('Please enter a short code');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/shorten/${shortCode}`, {
            method: 'DELETE',
        });

        if (response.status === 204) {
            document.getElementById('deleteUrlResult').innerText = 'URL deleted successfully';
        } else {
            const data = await response.json();
            document.getElementById('deleteUrlResult').innerText = 'Error: ' + (data.message || 'Unknown error');
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('deleteUrlResult').innerText = 'An error occurred: ' + error.message;
    }
}

// Function to get URL statistics
async function getUrlStats() {
    const shortCode = document.getElementById('statsShortCode').value;
    if (!shortCode) {
        alert('Please enter a short code');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/shorten/${shortCode}/stats`);
        const data = await response.json();
        if (response.status === 200) {
            document.getElementById('urlStatsResult').innerText = JSON.stringify(data, null, 2);
        } else {
            document.getElementById('urlStatsResult').innerText = 'Error: ' + (data.message || 'Unknown error');
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('urlStatsResult').innerText = 'An error occurred: ' + error.message;
    }
}