// Function to apply or remove dark mode
function applyDarkMode(enabled) {
    if (enabled) {
        document.documentElement.classList.add('pk-dark-mode');
    } else {
        document.documentElement.classList.remove('pk-dark-mode');
    }
}

// Initial load
chrome.storage.local.get(['enabled'], (result) => {
    // Default to true if undefined, same logic as popup
    const isEnabled = result.enabled === undefined ? true : result.enabled;
    applyDarkMode(isEnabled);
});

// Listen for changes from the popup
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.enabled) {
        applyDarkMode(changes.enabled.newValue);
    }
});
