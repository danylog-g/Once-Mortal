// Tab functionality
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all
        document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

        // Add active to clicked
        button.classList.add('active');
        document.getElementById(`${button.dataset.tab}-list`).classList.add('active');

        // Load content if needed
        if (button.dataset.tab === 'gun') loadSavedGuns();
        else if (button.dataset.tab === 'cybernetics') loadSavedCybernetics();
    });
});

function isApiAvailable() {
    return window.location.hostname !== '' && window.location.hostname !== 'localhost';
}

async function apiRequest(url, options = {}) {
    if (isApiAvailable()) {
        try {
            const response = await fetch(url, options);
            if (response.ok) return response;
        } catch (error) {
            console.warn('API unavailable, falling back to localStorage:', error);
        }
    }
    return { ok: false };
}

function getFromLocalStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

// Load saved guns from MongoDB
async function loadSavedGuns() {
    const container = document.getElementById('guns-list');
    container.innerHTML = '<p>Loading guns...</p>';

    try {
        //const response = await fetch('http://192.168.2.201:8000/api/guns');
        
        // Fallback to localStorage
            let gunBuilds = getFromLocalStorage('savedGuns') || [];
            if (gunBuilds.length > 0) {
                console.log('Loaded guns from localStorage');
            }
        /*if (response.ok) {
            gunBuilds = await response.json();
        } else {
            // Fallback to localStorage
            gunBuilds = getFromLocalStorage('savedGuns') || [];
            if (gunBuilds.length > 0) {
                console.log('Loaded guns from localStorage');
            }
        }*/

        if (gunBuilds.length === 0) {
            container.innerHTML = '<p>No saved guns found.</p>';
            return;
        }

        container.innerHTML = '';
        gunBuilds.forEach((gun, index) => {
            const element = createGunElement(gun, index);
            container.appendChild(element);
        });
    } catch (error) {
        console.error('Error loading guns:', error);
        // Try localStorage as final fallback
        const gunBuilds = getFromLocalStorage('savedGuns') || [];
        if (gunBuilds.length === 0) {
            container.innerHTML = `<p>Error loading guns: ${error.message}</p>`;
        } else {
            container.innerHTML = '';
            gunBuilds.forEach((gun, index) => {
                const element = createGunElement(gun, index);
                container.appendChild(element);
            });
        }
    }
}

// Load saved cybernetics from MongoDB
async function loadSavedCybernetics() {
    const container = document.getElementById('cybernetics-list');
    container.innerHTML = '<p>Loading cybernetics...</p>';

    try {
        const response = await fetch('http://192.168.2.201:8000/api/cybernetics');

        let cyberBuilds = [];
        if (response.ok) {
            cyberBuilds = await response.json();
        } else {
            // Fallback to localStorage
            cyberBuilds = getFromLocalStorage('savedCybernetics') || [];
            if (cyberBuilds.length > 0) {
                console.log('Loaded cybernetics from localStorage');
            }
        }

        if (cyberBuilds.length === 0) {
            container.innerHTML = '<p>No saved cybernetics found.</p>';
            return;
        }

        container.innerHTML = '';
        cyberBuilds.forEach((cyber, index) => {
            const element = createCyberneticsElement(cyber, index);
            container.appendChild(element);
        });
    } catch (error) {
        console.error('Error loading cybernetics:', error);
        // Try localStorage as final fallback
        const cyberBuilds = getFromLocalStorage('savedCybernetics') || [];
        if (cyberBuilds.length === 0) {
            container.innerHTML = `<p>Error loading cybernetics: ${error.message}</p>`;
        } else {
            container.innerHTML = '';
            cyberBuilds.forEach((cyber, index) => {
                const element = createCyberneticsElement(cyber, index);
                container.appendChild(element);
            });
        }
    }
}

// Helper function to create gun element
function createGunElement(gun, index) {
    const element = document.createElement('div');
    element.className = 'saved-item';

    element.innerHTML = `
        <h3>${gun.name}</h3>
        <p>Saved on: ${new Date(gun.timestamp).toLocaleString()}</p>
        <button class="toggle-details" data-index="${index}" data-type="gun"">
            Show Details
        </button>
        <div class="details-container" id="details-${index}">
            <div class="attachment-item"> <strong>Weapon:</strong> ${gun.config.weapon.selection} (${gun.config.weapon.category}) </div>
            <div class="stats-grid">
                <div class="stat-item"><strong>Damage:</strong> ${gun.stats.damage}</div>
                <div class="stat-item"><strong>Range:</strong> ${gun.stats.range}</div>
                <div class="stat-item"><strong>Ammo:</strong> ${gun.stats.ammo}</div>
                <div class="stat-item"><strong>Accuracy:</strong> ${gun.stats.accuracy}</div>
                <div class="stat-item"><strong>Volume:</strong> ${gun.stats.volume}</div>
                <div class="stat-item"><strong>Weight:</strong> ${gun.stats.weight}</div>
            </div>
            
            <h4>Attachments</h4>
            <div class="stats-grid">
                ${Object.entries(gun.config.attachments).map(([type, name]) => `
                    <div class="attachment-item">
                        <strong>${type.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> ${name}
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="build-actions">
            <button class="export-button" data-type="gun" data-index="${index}"">
                Export
            </button>
            <button class="delete-button" data-type="gun" data-name="${gun.name}">
                Delete
            </button>
        </div>
    `;

    return element;
}

// Helper function to create cybernetics element
// Helper function to create cybernetics element
function createCyberneticsElement(cyber, index) {
    const hasFullData = cyber.installedCybernetics && cyber.installedCybernetics.length > 0;
    const cost = hasFullData ?
        cyber.installedCybernetics.reduce((sum, c) => sum + c.cost, 0) :
        'N/A';

    const element = document.createElement('div');
    element.className = 'saved-item';

    element.innerHTML = `
        <h3>${cyber.name}</h3>
        <p>Saved on: ${new Date(cyber.timestamp).toLocaleString()}</p>
        <button class="toggle-details" data-index="${index}" data-type="cybernetics"">
            Show Details
        </button>
        <div class="details-container" id="details-${index}">
            <div class="stats-grid">
                <div class="stat-item"><strong>Capacity:</strong> ${cyber.config?.currentCapacity || 'N/A'}/18</div>
                <div class="stat-item"><strong>Humanity Loss:</strong> ${cyber.config?.currentHumanityLoss || 'N/A'}%</div>
                <div class="stat-item"><strong>Total Cost:</strong> ${cost} ₵</div>
            </div>
            
            <h4>Cybernetics</h4>
            <div class="stats-grid">
                ${hasFullData ? cyber.installedCybernetics.map(item => `
                    <div class="cyber-item">
                        <strong>${item.name}</strong>
                        ${item.cost ? `<span>Cost: ${item.cost} ₵</span>` : ''}
                        ${item.capacity ? `<span>Capacity: ${item.capacity}</span>` : ''}
                        ${item.humanityLoss ? `<span>Humanity: ${item.humanityLoss}%</span>` : ''}
                    </div>
                `).join('') : (cyber.config?.installed ? cyber.config.installed.map(name => `
                    <div class="cyber-item">
                        <strong>${name}</strong>
                        <p>Full details not available</p>
                    </div>
                `).join('') : '<p>No cybernetics data available</p>')}
            </div>
            
            <h4>Active Effects</h4>
            <div class="stats-grid">
                ${cyber.effects && Array.isArray(cyber.effects) && cyber.effects.length > 0 ?
                    cyber.effects.map(effect => `<div class="attachment-item">${effect}</div>`).join('') :
                    '<p>No active effects</p>'
                }
            </div>
        </div>
        <div class="build-actions">
            <button class="export-button" data-type="cybernetics" data-index="${index}">
                Export
            </button>
            <button class="delete-button" data-type="cybernetics" data-name="${cyber.name}">
               Delete
            </button>
        </div>
    `;

    return element;
}

// Delete saved item from MongoDB
async function deleteSavedItem(name, type) {
    if (!confirm('Are you sure you want to delete this configuration?')) return;

    try {
        const response = await fetch(`http://192.168.2.201:8000/api/${type}/${name}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Failed to delete: ${response.statusText}`);
        }

        // Also delete from localStorage for consistency
        const key = type === 'gun' ? 'savedGuns' : 'savedCybernetics';
        const savedItems = getFromLocalStorage(key) || [];
        const updatedItems = savedItems.filter(item => item.name !== name);
        saveToLocalStorage(key, updatedItems);

        // Reload the appropriate list
        if (type === 'gun') loadSavedGuns();
        else loadSavedCybernetics();

        alert('Configuration deleted successfully!');
    } catch (error) {
        console.error('Error deleting item:', error);

        // Fallback to localStorage deletion
        const key = type === 'gun' ? 'savedGuns' : 'savedCybernetics';
        const savedItems = getFromLocalStorage(key) || [];
        const updatedItems = savedItems.filter(item => item.name !== name);

        if (saveToLocalStorage(key, updatedItems)) {
            // Reload the appropriate list
            if (type === 'gun') loadSavedGuns();
            else loadSavedCybernetics();
            alert('Configuration deleted from local storage!');
        } else {
            alert('Failed to delete configuration from both API and local storage.');
        }
    }
}

// Export build function
function exportBuild(build) {
    // Create a clean export object
    const exportData = {
        type: build.type,
        name: build.name,
        timestamp: build.timestamp,
        config: build.config,
        stats: build.stats || null,
        installedCybernetics: build.installedCybernetics || null,
        effects: build.effects || null
    };

    // Create JSON string
    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Create download link
    const a = document.createElement('a');
    a.href = url;
    a.download = `${build.name.replace(/\s+/g, '_')}_${build.type}.json`;
    document.body.appendChild(a);
    a.click();

    // Cleanup
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);

    alert(`"${build.name}" exported successfully!`);
}

// Load initial tab
document.addEventListener('DOMContentLoaded', function () {
    // Tab functionality
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(`${button.dataset.tab}-list`).classList.add('active');

            if (button.dataset.tab === 'gun') loadSavedGuns();
            else if (button.dataset.tab === 'cybernetics') loadSavedCybernetics();
        });
    });

    // Event delegation for toggle and delete buttons
    document.body.addEventListener('click', function (e) {
        // Toggle details
        if (e.target.classList.contains('toggle-details')) {
            const index = e.target.dataset.index;
            const details = document.getElementById(`details-${index}`);

            details.classList.toggle('active');
            e.target.textContent = details.classList.contains('active') ?
                'Hide Details' : 'Show Details';
        }

        // Delete button
        if (e.target.classList.contains('delete-button')) {
            const name = e.target.dataset.name;
            const type = e.target.dataset.type;
            console.log(type);
            deleteSavedItem(name, type);
        }

        // Export button handler
        if (e.target.classList.contains('export-button')) {
            const index = e.target.dataset.index;
            const type = e.target.dataset.type;

            // Get the build data from the appropriate list
            const containerId = `${type}-list`;
            const container = document.getElementById(containerId);
            const buildElement = container.children[index];

            // Extract build name
            const buildName = buildElement.querySelector('h3').textContent.replace(' (Shared)', '').trim();

            // Try to get build data from localStorage first, then API
            const key = type === 'gun' ? 'savedGuns' : 'savedCybernetics';
            const savedItems = getFromLocalStorage(key) || [];
            let build = savedItems.find(item => item.name === buildName);

            if (build) {
                exportBuild(build);
            } else {
                // Fallback to API
                fetch(`http://192.168.2.201:8000/api/${type}/${buildName}`)
                    .then(response => {
                        if (!response.ok) throw new Error('Failed to fetch build data');
                        return response.json();
                    })
                    .then(build => exportBuild(build))
                    .catch(error => {
                        console.error('Error exporting build:', error);
                        alert('Failed to export build. See console for details.');
                    });
            }
        }
    });

    // Load initial tab
    loadSavedGuns();
});