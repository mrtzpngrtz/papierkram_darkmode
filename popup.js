document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('darkModeToggle');
    const statusText = document.getElementById('statusText');

    // Load saved state (defaults to enabled on first install)
    chrome.storage.local.get(['enabled'], (result) => {
        const state = result.enabled === undefined ? true : result.enabled;
        
        toggle.checked = state;
        updateStatus(state);
        
        if (result.enabled === undefined) {
            chrome.storage.local.set({ enabled: true });
        }
    });

    toggle.addEventListener('change', () => {
        const isEnabled = toggle.checked;
        chrome.storage.local.set({ enabled: isEnabled }, () => {
            updateStatus(isEnabled);
        });
    });

    function updateStatus(enabled) {
        statusText.textContent = enabled ? 'Enabled' : 'Disabled';
        statusText.style.color = enabled ? '#0078d4' : '#666';
    }
});
