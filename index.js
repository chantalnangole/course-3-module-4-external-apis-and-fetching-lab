// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const input = document.getElementById('state-input');
const button = document.getElementById('fetch-alerts');
const alertsDiv = document.getElementById('alerts-display');
const errorDiv = document.getElementById('error-message');

// Fetch alerts from API
async function fetchAlerts(state) {
  const response = await fetch(
    `https://api.weather.gov/alerts/active?area=${state}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch weather alerts');
  }

  return await response.json();
}

// Display alerts
function displayAlerts(data) {
  alertsDiv.innerHTML = '';

  // Summary message
  const summary = document.createElement('h2');
  summary.textContent = `${data.title}: ${data.features.length}`;
  alertsDiv.appendChild(summary);

  // List of alerts
  const ul = document.createElement('ul');

  data.features.forEach(alert => {
    const li = document.createElement('li');
    li.textContent = alert.properties.headline;
    ul.appendChild(li);
  });

  alertsDiv.appendChild(ul);
}

// Show error
function displayError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.remove('hidden');
}

// Clear error
function clearError() {
  errorDiv.textContent = '';
  errorDiv.classList.add('hidden');
}

// Handle button click
async function handleClick() {
  const state = input.value.trim();

  // Empty input check
  if (!state) {
    displayError('Please enter a state abbreviation');
    return;
  }

  try {
    clearError();

    const data = await fetchAlerts(state);

    displayAlerts(data);

    // Clear input AFTER success
    input.value = '';
  } catch (error) {
    displayError(error.message);
  }
}

// Event listener
button.addEventListener('click', handleClick);

// Export for tests
module.exports = {
  fetchAlerts,
  displayAlerts,
  handleClick,
};