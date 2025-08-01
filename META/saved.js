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
        if (button.dataset.tab === 'guns') loadSavedGuns();
        else loadSavedCybernetics();
    });
});

// Load saved guns
function loadSavedGuns() {
    const savedData = JSON.parse(localStorage.getItem('savedData') || '{"private":[],"shared":[]}');
    const container = document.getElementById('guns-list');
    container.innerHTML = '';
    
    // Filter private gun builds
    const gunBuilds = savedData.private.filter(build => build.type === 'gun');
    
    if (gunBuilds.length === 0) {
        container.innerHTML = '<p>No saved guns found.</p>';
        return;
    }

    gunBuilds.forEach((gun, index) => {
        const element = createGunElement(gun, index, false);
        container.appendChild(element);
    });
}

// Load saved cybernetics
function loadSavedCybernetics() {
    const savedData = JSON.parse(localStorage.getItem('savedData') || '{"private":[],"shared":[]}');
    const container = document.getElementById('cybernetics-list');
    container.innerHTML = '';
    
    // Filter private cybernetics builds
    const cyberBuilds = savedData.private.filter(build => build.type === 'cybernetics');
    
    if (cyberBuilds.length === 0) {
        container.innerHTML = '<p>No saved cybernetics found.</p>';
        return;
    }

    cyberBuilds.forEach((cyber, index) => {
        const element = createCyberneticsElement(cyber, index, false);
        container.appendChild(element);
    });
}

// Function to load shared builds
function loadSharedBuilds() {
    const savedData = JSON.parse(localStorage.getItem('savedData') || '{"private":[],"shared":[]}');
    const container = document.getElementById('shared-list');
    container.innerHTML = '';
    
    if (savedData.shared.length === 0) {
        container.innerHTML = '<p>No shared builds found.</p>';
        return;
    }

    savedData.shared.forEach((build, index) => {
        let element;
        if (build.type === 'gun') {
            element = createGunElement(build, index, true);
        } else {
            element = createCyberneticsElement(build, index, true);
        }
        container.appendChild(element);
    });
}

// Helper function to create gun element
function createGunElement(gun, index, isShared) {
    const element = document.createElement('div');
    element.className = 'saved-item';
    
    element.innerHTML = `
        <h3>${gun.name} ${isShared ? '<span style="color:#25D366;">(Shared)</span>' : ''}</h3>
        <p>${isShared ? 'Shared' : 'Saved'} on: ${new Date(gun.timestamp).toLocaleString()}</p>
        <button class="toggle-details" data-index="${index}" data-type="gun" data-shared="${isShared}">
            Show Details
        </button>
        <div class="details-container" id="details-${index}-${isShared ? 'shared' : 'private'}">
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
            ${isShared ? `
                <button class="export-button" data-type="gun" data-index="${index}" data-shared="${isShared}">
                    Export
                </button>
            ` : `
                <button class="delete-button" data-type="gun" data-index="${index}" data-shared="${isShared}">
                    Delete
                </button>
            `}
        </div>
    `;
    
    return element;
}

// Helper function to create cybernetics element
function createCyberneticsElement(cyber, index, isShared) {
    const hasFullData = cyber.installedCybernetics && cyber.installedCybernetics.length > 0;
    const cost = hasFullData ? 
        cyber.installedCybernetics.reduce((sum, c) => sum + c.cost, 0) :
        'N/A';
    
    const element = document.createElement('div');
    element.className = 'saved-item';
    
    element.innerHTML = `
        <h3>${cyber.name} ${isShared ? '<span style="color:#25D366;">(Shared)</span>' : ''}</h3>
        <p>${isShared ? 'Shared' : 'Saved'} on: ${new Date(cyber.timestamp).toLocaleString()}</p>
        <button class="toggle-details" data-index="${index}" data-type="cybernetics" data-shared="${isShared}">
            Show Details
        </button>
        <div class="details-container" id="details-${index}-${isShared ? 'shared' : 'private'}">
            <div class="stats-grid">
                <div class="stat-item"><strong>Capacity:</strong> ${cyber.config.currentCapacity}/18</div>
                <div class="stat-item"><strong>Humanity Loss:</strong> ${cyber.config.humanityLoss}%</div>
                <div class="stat-item"><strong>Total Cost:</strong> ${cost} ₵</div>
            </div>
            
            <h4>Cybernetics</h4>
            <div class="stats-grid">
                ${hasFullData ? cyber.installedCybernetics.map(item => `
                    <div class="cyber-item">
                        <strong>${item.name}</strong>
                    </div>
                `).join('') : cyber.config.installed.map(name => `
                    <div class="cyber-item">
                        <strong>${name}</strong>
                        <p>Full details not available</p>
                    </div>
                `).join('')}
            </div>
            
            <h4>Active Effects</h4>
            <div class="stats-grid">
                ${cyber.effects && Array.isArray(cyber.effects) ? 
                    cyber.effects.map(effect => `<p class="attachment-item">${effect}</p>`).join('') :
                    '<p>No effects data available</p>'
                }
            </div>
        </div>
        <div class="build-actions">
            ${isShared ? `
                <button class="export-button" data-type="cybernetics" data-index="${index}" data-shared="${isShared}">
                    Export
                </button>
            ` : `
                <button class="delete-button" data-type="cybernetics" data-index="${index}" data-shared="${isShared}">
                    Delete
                </button>
            `}
        </div>
    `;
    
    return element;
}

// Delete saved item
function deleteSavedItem(index, type, isShared) {
    if (!confirm('Are you sure you want to delete this configuration?')) return;
    
    const savedData = JSON.parse(localStorage.getItem('savedData') || '{"private":[],"shared":[]}');
    const list = isShared ? savedData.shared : savedData.private;
    
    // Find the item by index and type
    const itemIndex = list.findIndex(item => 
        item.type === type && 
        item.name === list[index].name && 
        item.timestamp === list[index].timestamp
    );
    
    if (itemIndex !== -1) {
        list.splice(itemIndex, 1);
        localStorage.setItem('savedData', JSON.stringify(savedData));
        
        if (isShared) {
            loadSharedBuilds();
        } else {
            if (type === 'gun') loadSavedGuns();
            else loadSavedCybernetics();
        }
    }
}

// Export build function
function exportBuild(index, type, isShared) {
    const savedData = JSON.parse(localStorage.getItem('savedData') || '{"private":[],"shared":[]}');
    const list = isShared ? savedData.shared : savedData.private;
    
    // Find the build
    const build = list[index];
    if (!build) return;
    
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
    const blob = new Blob([dataStr], {type: 'application/json'});
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
document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(`${button.dataset.tab}-list`).classList.add('active');
            
            if (button.dataset.tab === 'guns') loadSavedGuns();
            else if (button.dataset.tab === 'cybernetics') loadSavedCybernetics();
            else if (button.dataset.tab === 'shared') loadSharedBuilds();
        });
    });
    
    // Event delegation for toggle and delete buttons
    document.body.addEventListener('click', function(e) {
        // Toggle details
        if (e.target.classList.contains('toggle-details')) {
            const index = e.target.dataset.index;
            const type = e.target.dataset.type;
            const isShared = e.target.dataset.shared === 'true';
            const details = document.getElementById(`details-${index}-${isShared ? 'shared' : 'private'}`);
            
            details.classList.toggle('active');
            e.target.textContent = details.classList.contains('active') ? 
                'Hide Details' : 'Show Details';
        }
        
        // Delete button
        if (e.target.classList.contains('delete-button')) {
            const index = e.target.dataset.index;
            const type = e.target.dataset.type;
            const isShared = e.target.dataset.shared === 'true';
            
            deleteSavedItem(index, type, isShared);
        }

        // Export button handler
        if (e.target.classList.contains('export-button')) {
            const index = e.target.dataset.index;
            const type = e.target.dataset.type;
            const isShared = e.target.dataset.shared === 'true';
            
            exportBuild(index, type, isShared);
        }
    });
    
    // Load initial tab
    loadSavedGuns();
});