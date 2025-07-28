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
    const savedGuns = JSON.parse(localStorage.getItem('savedGuns') || '[]');
    const container = document.getElementById('guns-list');
    container.innerHTML = '';

    if (savedGuns.length === 0) {
        container.innerHTML = '<p>No saved guns found.</p>';
        return;
    }

    savedGuns.forEach((gun, index) => {
        const element = document.createElement('div');
        element.className = 'saved-item';
        element.innerHTML = `
                    <h3>${gun.name}</h3>
                    <p>Saved on: ${new Date(gun.timestamp).toLocaleString()}</p>
                    <button class="toggle-details" data-index="${index}">Show Details</button>
                    <div class="details-container" id="gun-details-${index}">
                        <div class="stats-grid">
                            <div class="stat-item"><strong>Damage:</strong> ${gun.stats.damage}</div>
                            <div class="stat-item"><strong>Range:</strong> ${gun.stats.range}</div>
                            <div class="stat-item"><strong>Ammo:</strong> ${gun.stats.ammo}</div>
                            <div class="stat-item"><strong>Accuracy:</strong> ${gun.stats.accuracy}</div>
                            <div class="stat-item"><strong>Volume:</strong> ${gun.stats.volume}</div>
                            <div class="stat-item"><strong>Weight:</strong> ${gun.stats.weight}</div>
                        </div>
                        
                        <h4>Attachments</h4>
                        <div class="attachment-item">
                            <strong>Weapon:</strong> ${gun.config.weapon.selection} (${gun.config.weapon.category})
                        </div>
                        ${Object.entries(gun.config.attachments).map(([type, name]) => `
                            <div class="attachment-item">
                                <strong>${type.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> ${name}
                            </div>
                        `).join('')}
                    </div>
                    <button class="delete-button" data-type="gun" data-index="${index}">Delete</button>
                `;
        container.appendChild(element);
    });

    // Add event listeners to toggle buttons
    document.querySelectorAll('.toggle-details').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.dataset.index;
            const details = document.getElementById(`gun-details-${index}`);
            details.classList.toggle('active');
            this.textContent = details.classList.contains('active') ? 'Hide Details' : 'Show Details';
        });
    });

    // Add delete handlers
    document.querySelectorAll('#guns-list .delete-button').forEach(button => {
        button.addEventListener('click', function () {
            deleteSavedItem(
                parseInt(this.dataset.index),
                this.dataset.type
            );
        });
    });
}

// Load saved cybernetics
function loadSavedCybernetics() {
    const savedCybernetics = JSON.parse(localStorage.getItem('savedCybernetics') || '[]');
    const container = document.getElementById('cybernetics-list');
    container.innerHTML = '';
    
    if(savedCybernetics.length === 0) {
        container.innerHTML = '<p>No saved cybernetics found.</p>';
        return;
    }
    
    savedCybernetics.forEach((cyber, index) => {
        // Check if installedCybernetics exists
        const hasFullData = cyber.installedCybernetics && cyber.installedCybernetics.length > 0;
        const cost = hasFullData ? 
            cyber.installedCybernetics.reduce((sum, c) => sum + c.cost, 0) :
            'N/A';
        
        const element = document.createElement('div');
        element.className = 'saved-item';
        element.innerHTML = `
            <h3>${cyber.name}</h3>
            <p>Saved on: ${new Date(cyber.timestamp).toLocaleString()}</p>
            <button class="toggle-details" data-index="${index}">Show Details</button>
            <div class="details-container" id="cyber-details-${index}">
                <div class="stats-grid">
                    <div class="stat-item"><strong>Capacity:</strong> ${cyber.config.currentCapacity}/18</div>
                    <div class="stat-item"><strong>Humanity Loss:</strong> ${cyber.config.humanityLoss}%</div>
                    <div class="stat-item"><strong>Total Cost:</strong> ${cost} ₵</div>
                </div>
                
                <h4>Cybernetics</h4>
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
                
                <h4>Active Effects</h4>
                <ul>
                    ${cyber.effects && Array.isArray(cyber.effects) ? 
                        cyber.effects.map(effect => `<li>${effect}</li>`).join('') :
                        '<li>No effects data available</li>'
                    }
                </ul>
            </div>
            <button class="delete-button" data-type="cybernetics" data-index="${index}">Delete</button>
        `;
        container.appendChild(element);
    });

    // Add event listeners to toggle buttons
    document.querySelectorAll('.toggle-details').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.dataset.index;
            const details = document.getElementById(`cyber-details-${index}`);
            details.classList.toggle('active');
            this.textContent = details.classList.contains('active') ? 'Hide Details' : 'Show Details';
        });
    });

    // Add delete handlers
    document.querySelectorAll('#cybernetics-list .delete-button').forEach(button => {
        button.addEventListener('click', function () {
            deleteSavedItem(
                parseInt(this.dataset.index),
                this.dataset.type
            );
        });
    });
}

// Delete saved item
function deleteSavedItem(index, type) {
    if (!confirm('Are you sure you want to delete this saved configuration?')) return;

    if (type === 'gun') {
        const savedGuns = JSON.parse(localStorage.getItem('savedGuns') || '[]');
        savedGuns.splice(index, 1);
        localStorage.setItem('savedGuns', JSON.stringify(savedGuns));
        loadSavedGuns();
    }
    else if (type === 'cybernetics') {
        const savedCybernetics = JSON.parse(localStorage.getItem('savedCybernetics') || '[]');
        savedCybernetics.splice(index, 1);
        localStorage.setItem('savedCybernetics', JSON.stringify(savedCybernetics));
        loadSavedCybernetics();
    }
}

// Load initial tab
document.addEventListener('DOMContentLoaded', loadSavedGuns);