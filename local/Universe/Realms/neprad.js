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
    // Fallback to localStorage
    return { ok: false };
}
// Local Storage helper functions
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
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

// Weapon data - organized by category
const weaponData = DND_API.Guns;

// Attachment data
const attachmentData = DND_API.GAttachments;

// Current configuration
let currentConfig = {
    weapon: {
        category: "pistols",
        selection: "CIP - Standard"
    },
    attachments: {
        silencer: "No Suppressor",
        frame: "RC-F Standard",
        stock: "No Stock",
        grip: "No Grip",
        barrel: "RC-B Standard",
        magazine: "RC-M Standard",
        scope: "RC-Sc Standard",
        bullet: "RC-B Standard",
        sight: "No Sight",
        light: "No Light",
        switch: "Semi-Automatic",
    }
};

// Previous stats for comparison
let previousStats = null;

// DOM elements
const weaponCategorySelect = document.getElementById('weaponCategory');
const attachmentCategorySelect = document.getElementById('attachmentCategory');
const weaponOptions = document.getElementById('weaponOptions');
const attachmentOptions = document.getElementById('attachmentOptions');
const statDamage = document.getElementById('statDamage');
const statRange = document.getElementById('statRange');
const statAmmo = document.getElementById('statAmmo');
const statAccuracy = document.getElementById('statAccuracy');
const statVolume = document.getElementById('statVolume');
const statWeight = document.getElementById('statWeight');
const attachmentList = document.getElementById('attachmentList');
const changesList = document.getElementById('changesList');

// Initialize the application
function init() {
    // Load initial weapon options
    loadWeaponOptions('pistols');

    // Load initial attachment options
    loadAttachmentOptions('silencer');

    // Set up event listeners
    weaponCategorySelect.addEventListener('change', function () {
        loadWeaponOptions(this.value);
    });

    attachmentCategorySelect.addEventListener('change', function () {
        loadAttachmentOptions(this.value);
    });

    // Initial update
    updateGun();
}

// Load weapon options for a category
function loadWeaponOptions(category) {
    weaponOptions.innerHTML = '';

    const weapons = weaponData[category] || [];

    weapons.forEach(weapon => {
        const isSelected = currentConfig.weapon.category === category &&
            currentConfig.weapon.selection === weapon.name;

        const option = document.createElement('div');
        option.className = `option ${isSelected ? 'selected' : ''}`;

        option.innerHTML = `
                    <h4>${weapon.name}</h4>
                    <p>${weapon.damage} damage, ${weapon.range} ft range</p>
                `;

        option.addEventListener('click', function () {
            // Update configuration
            currentConfig.weapon = {
                category: category,
                selection: weapon.name
            };

            // Record change
            addChange(`${weapon.name} selected`);

            // Refresh UI
            loadWeaponOptions(category);
            updateGun();
        });

        weaponOptions.appendChild(option);
    });
}

// Load attachment options for a category
function loadAttachmentOptions(category) {
    attachmentOptions.innerHTML = '';

    const attachments = attachmentData[category] || [];

    attachments.forEach(attachment => {
        const isSelected = currentConfig.attachments[category] === attachment.name;

        const option = document.createElement('div');
        option.className = `option ${isSelected ? 'selected' : ''}`;

        option.innerHTML = `
                    <h4>${attachment.name}</h4>
                    <p>${getEffectDescription(attachment)}</p>
                `;

        option.addEventListener('click', function () {
            // Update configuration
            currentConfig.attachments[category] = attachment.name;

            // Record change
            addChange(`${attachment.name} added`);

            // Refresh UI
            loadAttachmentOptions(category);
            updateGun();
        });

        attachmentOptions.appendChild(option);
    });
}

// Add a change to the changes list
function addChange(text) {
    const changeItem = document.createElement('div');
    changeItem.className = 'change-item change-neutral';
    changeItem.textContent = text;
    changesList.insertBefore(changeItem, changesList.firstChild);

    // Limit to 5 changes
    if (changesList.children.length > 5) {
        changesList.removeChild(changesList.lastChild);
    }
}

// Get effect description for an attachment
function getEffectDescription(attachment) {
    let effects = [];

    if (attachment.damage && attachment.damage !== "0") effects.push(attachment.damage);
    if (attachment.range && attachment.range !== "0") effects.push(attachment.range);
    if (attachment.ammo && attachment.ammo !== "0") effects.push(`Ammo: ${attachment.ammo}`);
    if (attachment.accuracy && attachment.accuracy !== 0) effects.push(`Acc: ${attachment.accuracy > 0 ? '+' : ''}${attachment.accuracy}`);
    if (attachment.decibels && attachment.decibels !== 0) effects.push(`Vol: ${attachment.decibels}dB`);
    if (attachment.weight && attachment.weight !== 0) effects.push(`Wt: ${attachment.weight > 0 ? '+' : ''}${attachment.weight}lb`);

    return effects.join(', ');
}

// Update gun based on current configuration
function updateGun() {
    // Get weapon
    const weaponCat = currentConfig.weapon.category;
    const weaponName = currentConfig.weapon.selection;
    const weapon = weaponData[weaponCat].find(w => w.name === weaponName);

    if (!weapon) return;

    // Start with weapon stats
    let damage = weapon.damage;
    let range = weapon.range;
    let ammo = weapon.ammo;
    let weight = weapon.weight;
    let decibels = weapon.decibels;
    let accuracy = weapon.accuracy;
    let dmg_type;

    // Parse base damage into dice count and die size
    let [baseDiceCount, baseDieSize] = weapon.damage.split('d').map(Number);
    let currentDiceCount = baseDiceCount;
    let currentDieSize = baseDieSize;

    // Store current stats for comparison
    const currentStats = {
        damage,
        range,
        ammo,
        weight,
        decibels,
        accuracy,
        dmg_type
    };

    // Update attachment list
    attachmentList.innerHTML = `
                <div class="attachment-item">
                    <div class="attachment-header">
                        <span class="attachment-name">${weapon.name}</span>
                        <span class="attachment-category">Weapon</span>
                    </div>
                    <div class="attachment-effects">Base stats</div>
                </div>
            `;

    // Apply attachments
    const attachmentCategories = Object.keys(currentConfig.attachments);

    attachmentCategories.forEach(category => {
        const attachmentName = currentConfig.attachments[category];
        const attachment = attachmentData[category].find(a => a.name === attachmentName);

        if (attachment) {
            // Damage handling
            if (attachment.damage) {
                const diceCountMatch = attachment.damage.match(/([+-]?\d+)\s*dice/i);
                const dieSizeMatch = attachment.damage.match(/([+-]?\d+)\s*die\s*size/i);

                if (diceCountMatch) currentDiceCount += parseInt(diceCountMatch[1]);
                if (dieSizeMatch) currentDieSize = modifyDieSize(currentDieSize, parseInt(dieSizeMatch[1]));

                // Handle combined modifiers like "+1 dice -1 die size"
                const combinedMatch = attachment.damage.match(/\+(\d+)\s*dice\s*-\s*(\d+)\s*die\s*size/i);
                if (combinedMatch) {
                    currentDiceCount += parseInt(combinedMatch[1]);
                    currentDieSize = modifyDieSize(currentDieSize, -parseInt(combinedMatch[2]));
                }
            }
            // Range handling
            if (attachment.range && attachment.range.includes('%')) {
                const rangeParts = range.split('/');
                const modParts = attachment.range.split('/');

                range = rangeParts.map((part, i) => {
                    const baseVal = parseInt(part);
                    const mod = modParts[i] || modParts[0];
                    const percentMatch = mod.match(/([+-]?\d+)%/);

                    return percentMatch ?
                        Math.round(baseVal * (1 + parseInt(percentMatch[1]) / 100)) :
                        baseVal;
                }).join('/');
            } else if (attachment.range) {
                if (attachment.range.startsWith("+") || attachment.range.startsWith("-")) {
                    const mods = attachment.range.split('/');
                    const baseParts = range.split('/');

                    const newValues = [];
                    for (let i = 0; i < 3; i++) {
                        const baseVal = i < baseParts.length ? Number(baseParts[i]) : 0;
                        let change = 0;
                        if (i < mods.length) {
                            const num = parseInt(mods[i]);
                            if (!isNaN(num)) {
                                change = num;
                            }
                        }
                        newValues.push(baseVal + change);
                    }
                    range = newValues.join('/');
                }
            }

            // Clamp range values to be non-negative
            if (typeof range === 'string') {
                const rangeParts = range.split('/');
                range = rangeParts.map(part => {
                    const num = parseInt(part);
                    return isNaN(num) ? 0 : Math.max(0, num);
                }).join('/');
            } else {
                range = Math.max(0, range);
            }

            // Clamp dice count to minimum of 1
            currentDiceCount = Math.max(1, currentDiceCount);

            if (attachment.ammo && attachment.ammo !== "0") {
                if (attachment.ammo.includes('%')) {
                    const percent = parseInt(attachment.ammo);
                    if (!isNaN(percent)) {
                        ammo = Math.round(ammo * (1 + percent / 100));
                    }
                } else {
                    const fixed = parseInt(attachment.ammo);
                    if (!isNaN(fixed)) {
                        ammo += fixed;
                    }
                }
            }

            if (attachment.decibels && attachment.decibels !== "0") {
                if (attachment.decibels.includes('%')) {
                    const percent = parseInt(attachment.decibels);
                    if (!isNaN(percent)) {
                        decibels = Math.round(decibels * (1 + percent / 100));
                    }
                } else {
                    const fixed = parseInt(attachment.decibels);
                    if (!isNaN(fixed)) {
                        decibels += fixed;
                    }
                }
            }

            if (attachment.weight) {
                weight += attachment.weight;
            }

            if (attachment.accuracy) {
                accuracy += attachment.accuracy;
            }

            if (attachment.type) {
                dmg_type = attachment.type;
            }

            // Add to attachment list
            const attachmentItem = document.createElement('div');
            attachmentItem.className = 'attachment-item';

            attachmentItem.innerHTML = `
                        <div class="attachment-header">
                            <span class="attachment-name">${attachment.name}</span>
                            <span class="attachment-category">${category.charAt(0).toUpperCase() + category.slice(1)}</span>
                        </div>
                        <div class="attachment-effects">${getEffectDescription(attachment)}</div>
                    `;
            attachmentList.appendChild(attachmentItem);
        }
    });

    // Format final damage string
    const __damage = `${currentDiceCount}d${currentDieSize} (${dmg_type})`;
    // Update stats display
    statDamage.textContent = __damage;
    statRange.textContent = `${range} ft`;
    statAmmo.textContent = `${ammo} shots`;
    statAccuracy.textContent = `${accuracy >= 0 ? '+' : ''}${accuracy}`;
    statWeight.textContent = `${weight.toFixed(1)} lb`;

    // Get volume description based on decibels
    statVolume.innerHTML = `${getVolumeDescription(decibels)[0]} <hr class="ballsack"> ${getVolumeDescription(decibels)[1]}`;

    // Highlight changes from previous stats
    if (previousStats) {
        highlightChanges(previousStats, currentStats);
    }

    // Update previous stats
    previousStats = currentStats;
}

// Helper function to modify die size
function modifyDieSize(currentSize, steps) {
    const dieSizes = [4, 6, 8, 10, 12, 20];
    const currentIndex = dieSizes.indexOf(currentSize);

    if (currentIndex === -1) return currentSize; // Unknown size

    let newIndex = currentIndex + steps;
    newIndex = Math.max(0, Math.min(newIndex, dieSizes.length - 1));

    return dieSizes[newIndex];
}

// Helper function for volume description
function getVolumeDescription(decibels) {
    let volumeDesc = "Deafening";
    let flag = "";
    if (decibels > 500) { volumeDesc = "LETHAL"; flag = "Death on discharge"; }
    else if (decibels > 300) { volumeDesc = "*Lethal*"; flag = "4d20 Thunder dmg per discharge"; }
    else if (decibels > 205) { volumeDesc = "Lethal"; flag = "2d12 Thunder dmg per discharge"; }
    else if (decibels > 194) { volumeDesc = "Death of Hearing Tissue"; flag = "1d8 Thunder dmg per discharge"; }
    else if (decibels > 180) { volumeDesc = "Death of Hearing Tissue"; flag = "1d4 Thunder dmg per discharge"; }
    else if (decibels > 150) { volumeDesc = "Destabalizing"; flag = "Disadvantage on all Dex Rolls for 4 turns (24 sec)" }
    else if (decibels > 140) volumeDesc = "Deafening";
    else if (decibels > 125) volumeDesc = "Very Loud";
    else if (decibels > 120) volumeDesc = "Loud";
    else if (decibels > 100) volumeDesc = "Noisy";
    else if (decibels > 85) volumeDesc = "City Noise";
    else if (decibels > 70) volumeDesc = "Conversation";
    else if (decibels > 50) volumeDesc = "Quiet Noise";
    else if (decibels >= 25) volumeDesc = "Whispers";
    else if (decibels < 25) volumeDesc = "Silent";

    return [`${decibels} dB (${volumeDesc})`, `${flag}`];
}

// Highlight changes in the UI
function highlightChanges(oldStats, newStats) {
    const elements = {
        damage: statDamage,
        range: statRange,
        ammo: statAmmo,
        accuracy: statAccuracy,
        volume: statVolume,
        weight: statWeight
    };

    // Reset all highlights
    Object.values(elements).forEach(el => {
        el.classList.remove('change-positive', 'change-negative');
    });

    // Check each stat for changes
    if (oldStats.damage !== newStats.damage) {
        elements.damage.classList.add('change-negative');
    }

    if (oldStats.range !== newStats.range) {
        elements.range.classList.add('change-positive');
    }

    if (oldStats.ammo !== newStats.ammo) {
        elements.ammo.classList.add(newStats.ammo > oldStats.ammo ? 'change-positive' : 'change-negative');
    }

    if (oldStats.accuracy !== newStats.accuracy) {
        elements.accuracy.classList.add(newStats.accuracy > oldStats.accuracy ? 'change-positive' : 'change-negative');
    }

    if (oldStats.decibels !== newStats.decibels) {
        elements.volume.classList.add(newStats.decibels < oldStats.decibels ? 'change-positive' : 'change-negative');
    }

    if (oldStats.weight !== newStats.weight) {
        elements.weight.classList.add(newStats.weight > oldStats.weight ? 'change-negative' : 'change-positive');
    }
}

// Function to generate a random gun build
function generateRandomGun() {
    // Random weapon category
    const categories = ['pistols', 'rifles', 'shotguns', 'snipers', 'lmgs', 'atws'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    // Random weapon from category
    const weapons = weaponData[randomCategory];
    const randomWeapon = weapons[Math.floor(Math.random() * weapons.length)];

    // Update weapon configuration
    currentConfig.weapon = {
        category: randomCategory,
        selection: randomWeapon.name
    };

    // Add change
    addChange(`Random weapon: ${randomWeapon.name}`);

    // Random attachments for each category
    const attachmentTypes = Object.keys(attachmentData);
    attachmentTypes.forEach(type => {
        const attachments = attachmentData[type];
        const randomAttachment = attachments[Math.floor(Math.random() * attachments.length)];
        currentConfig.attachments[type] = randomAttachment.name;
        addChange(`Random ${type}: ${randomAttachment.name}`);
    });

    // Refresh UI
    weaponCategorySelect.value = randomCategory;
    loadWeaponOptions(randomCategory);
    loadAttachmentOptions(attachmentCategorySelect.value);
    updateGun();
}

// Function to export gun config as a json file
function exportGun() {
    const data = JSON.stringify(currentConfig);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'gun-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    addChange("Gun configuration exported");
}

// Function to import gun config from a json file
function importGun() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = event => {
            try {
                const newConfig = JSON.parse(event.target.result);

                // Validate the imported config
                if (newConfig.weapon && newConfig.attachments) {
                    currentConfig = newConfig;

                    // Update UI
                    weaponCategorySelect.value = currentConfig.weapon.category;
                    loadWeaponOptions(currentConfig.weapon.category);
                    loadAttachmentOptions(attachmentCategorySelect.value);
                    updateGun();

                    addChange("Gun configuration imported");
                } else {
                    alert("Invalid gun configuration file");
                }
            } catch (error) {
                alert("Error parsing file: " + error.message);
            }
        };

        reader.readAsText(file);
    };

    input.click();
}

// Function to save gun configuration
async function saveGun() {
    const name = prompt(`Enter a name for this gun configuration:`);
    if (!name) return;

    // Compute stats directly
    const weaponCat = currentConfig.weapon.category;
    const weaponName = currentConfig.weapon.selection;
    const weapon = weaponData[weaponCat].find(w => w.name === weaponName);

    if (!weapon) return;

    // Start with weapon stats
    let damage = weapon.damage;
    let range = weapon.range;
    let ammo = weapon.ammo;
    let weight = weapon.weight;
    let decibels = weapon.decibels;
    let accuracy = weapon.accuracy;

    // Parse base damage
    let [baseDiceCount, baseDieSize] = damage.split('d').map(Number);
    let currentDiceCount = baseDiceCount;
    let currentDieSize = baseDieSize;

    // Apply attachments
    Object.entries(currentConfig.attachments).forEach(([category, attachmentName]) => {
        const attachment = attachmentData[category].find(a => a.name === attachmentName);
        if (!attachment) return;

        // Damage handling
        if (attachment.damage) {
            const diceCountMatch = attachment.damage.match(/([+-]?\d+)\s*dice/i);
            const dieSizeMatch = attachment.damage.match(/([+-]?\d+)\s*die\s*size/i);

            if (diceCountMatch) currentDiceCount += parseInt(diceCountMatch[1]);
            if (dieSizeMatch) currentDieSize = modifyDieSize(currentDieSize, parseInt(dieSizeMatch[1]));

            const combinedMatch = attachment.damage.match(/\+(\d+)\s*dice\s*-\s*(\d+)\s*die\s*size/i);
            if (combinedMatch) {
                currentDiceCount += parseInt(combinedMatch[1]);
                currentDieSize = modifyDieSize(currentDieSize, -parseInt(combinedMatch[2]));
            }
        }

        // Range handling
        if (attachment.range && attachment.range.includes('%')) {
            const rangeParts = range.split('/');
            const modParts = attachment.range.split('/');

            range = rangeParts.map((part, i) => {
                const baseVal = parseInt(part);
                const mod = modParts[i] || modParts[0];
                const percentMatch = mod.match(/([+-]?\d+)%/);

                return percentMatch ?
                    Math.round(baseVal * (1 + parseInt(percentMatch[1]) / 100)) :
                    baseVal;
            }).join('/');
        } else if (attachment.range) {
            if (attachment.range.startsWith("+") || attachment.range.startsWith("-")) {
                const mods = attachment.range.split('/');
                const baseParts = range.split('/');

                const newValues = [];
                for (let i = 0; i < 3; i++) {
                    const baseVal = i < baseParts.length ? Number(baseParts[i]) : 0;
                    let change = 0;
                    if (i < mods.length) {
                        const num = parseInt(mods[i]);
                        if (!isNaN(num)) {
                            change = num;
                        }
                    }
                    newValues.push(baseVal + change);
                }
                range = newValues.join('/');
            }
        }

        // Clamp range values to be non-negative
        if (typeof range === 'string') {
            const rangeParts = range.split('/');
            range = rangeParts.map(part => {
                const num = parseInt(part);
                return isNaN(num) ? 0 : Math.max(0, num);
            }).join('/');
        } else {
            range = Math.max(0, range);
        }

        // Clamp dice count to minimum of 1
        currentDiceCount = Math.max(1, currentDiceCount);

        // Other stats
        if (attachment.ammo && attachment.ammo !== "0") {
            if (attachment.ammo.includes('%')) {
                const percent = parseInt(attachment.ammo);
                if (!isNaN(percent)) {
                    ammo = Math.round(ammo * (1 + percent / 100));
                }
            } else {
                const fixed = parseInt(attachment.ammo);
                if (!isNaN(fixed)) {
                    ammo += fixed;
                }
            }
        }

        if (attachment.decibels && attachment.decibels !== "0") {
            if (attachment.decibels.includes('%')) {
                const percent = parseInt(attachment.decibels);
                if (!isNaN(percent)) {
                    decibels = Math.round(decibels * (1 + percent / 100));
                }
            } else {
                const fixed = parseInt(attachment.decibels);
                if (!isNaN(fixed)) {
                    decibels += fixed;
                }
            }
        }

        if (attachment.weight) {
            weight += attachment.weight;
        }

        if (attachment.accuracy) {
            accuracy += attachment.accuracy;
        }
    });

    // Format stats for saving
    const stats = {
        damage: `${currentDiceCount}d${currentDieSize}`,
        range: `${range} ft`,
        ammo: `${ammo} shots`,
        accuracy: `${accuracy >= 0 ? '+' : ''}${accuracy}`,
        weight: `${weight.toFixed(1)} lb`,
        volume: getVolumeDescription(decibels)[0],
        flag: getVolumeDescription(decibels)[1]
    };

    const build = {
        type: 'gun',
        name,
        timestamp: new Date().toISOString(),
        config: currentConfig,
        stats: stats
    };

    try {
        const response = await fetch('http://192.168.2.201:8000/api/guns', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(build)
        });

        if (!response.ok) {
            // Fallback to localStorage
            const savedGuns = getFromLocalStorage('savedGuns') || [];
            const existingIndex = savedGuns.findIndex(g => g.name === name);
            if (existingIndex !== -1) {
                savedGuns[existingIndex] = build;
            } else {
                savedGuns.push(build);
            }
            if (saveToLocalStorage('savedGuns', savedGuns)) {
                addChange(`Gun configuration saved as "${name}" (local)`);
            } else {
                throw new Error('Failed to save to localStorage');
            }
        }

        const saved = await response.json();
        console.log('Saved to MongoDB:', saved);
        addChange(`Gun configuration saved as "${name}"`);

    } catch (err) {
        console.error('Error saving gun:', err);
        // Fallback to localStorage
        const savedGuns = getFromLocalStorage('savedGuns') || [];
        const existingIndex = savedGuns.findIndex(g => g.name === name);
        if (existingIndex !== -1) {
            savedGuns[existingIndex] = build;
        } else {
            savedGuns.push(build);
        }
        if (saveToLocalStorage('savedGuns', savedGuns)) {
            addChange(`Gun configuration saved as "${name}" (local)`);
        } else {
            throw new Error('Failed to save to localStorage');
        }
    }
}

// Cybernetics Data
const cyberneticsData = DND_API.Cybernetics;

// Current cybernetics configuration
let installedCybernetics = [];
let maxCapacity = 18;
let currentCapacity = 0;
let maxHumanityLoss = 100;
let currentHumanityLoss = 0;

// DOM Elements
const cyberCategories = document.querySelectorAll('.cyber-category');
const cyberOptions = document.querySelector('.cybernetics-options');
const cyberneticsList = document.getElementById('cyberneticsList');
const effectsSummary = document.getElementById('effectsSummary');
const levelValue = document.getElementById('level');
const capacityValue = document.getElementById('capacityValue');
const humanityValue = document.getElementById('humanityValue');
const totalCostElement = document.getElementById('totalCost');

// Initialize Cybernetics Builder
function initCyberneticsBuilder() {
    // Set up category click handlers
    cyberCategories.forEach(category => {
        category.addEventListener('click', function () {
            // Remove active class from all
            cyberCategories.forEach(cat => cat.classList.remove('active'));
            // Add active class to clicked
            this.classList.add('active');
            // Load options for this category
            loadCyberneticsOptions(this.dataset.category);
        });
    });
    level.addEventListener('change', handleLevels);

    // Load initial category
    loadCyberneticsOptions('neural');

    // Update capacity display
    updateCapacityDisplay();
    handleLevels();
}

// Load cybernetics options for a category
function loadCyberneticsOptions(category) {
    cyberOptions.innerHTML = '';

    const cybernetics = cyberneticsData[category] || [];

    cybernetics.forEach(cyber => {
        const isInstalled = installedCybernetics.some(c => c.name === cyber.name);

        const option = document.createElement('div');
        option.className = `cyber-option ${isInstalled ? 'installed' : ''}`;
        option.dataset.name = cyber.name;

        option.innerHTML = `
            <h4>${cyber.name}</h4>
            <div class="cost">${cyber.cost} ₵ | Capacity: ${cyber.capacity} | Humanity: ${cyber.humanity}%</div>
            <div class="cyber-effects">
                <ul>
                    ${cyber.effects.map(effect => `<li>${effect}</li>`).join('')}
                </ul>
            </div>
        `;

        if (!isInstalled) {
            option.addEventListener('click', function () {
                installCybernetics(cyber);
            });
        } else {
            option.classList.add('disabled');
        }

        cyberOptions.appendChild(option);
    });
}

// Install cybernetics
function installCybernetics(cyber) {
    // Check if already installed
    if (installedCybernetics.some(c => c.name === cyber.name)) {
        alert(`${cyber.name} is already installed.`);
        return;
    }
    // Check capacity
    if (currentCapacity + cyber.capacity > maxCapacity) {
        alert(`Not enough cybernetics capacity! You need ${cyber.capacity} but only have ${maxCapacity - currentCapacity} available.`);
        return;
    }
    // Check Humanity
    if (currentHumanityLoss + cyber.humanity > maxHumanityLoss) {
        alert(`Not enough humanity to spare! You are basically a Cyborg already.`);
        return;
    }

    // Add to installed list
    installedCybernetics.push(cyber);

    // Update capacity and humanity
    currentCapacity += cyber.capacity;
    currentHumanityLoss += cyber.humanity;

    // Update UI
    updateCyberneticsList();
    updateEffectsSummary();
    updateCapacityDisplay();

    // Reload options to update installed status
    const activeCategory = document.querySelector('.cyber-category.active');
    if (activeCategory) {
        loadCyberneticsOptions(activeCategory.dataset.category);
    }
}

// Update the installed cybernetics list
function updateCyberneticsList() {
    cyberneticsList.innerHTML = '';

    if (installedCybernetics.length === 0) {
        cyberneticsList.innerHTML = '<div class="cyber-item">No cybernetics installed</div>';
        return;
    }

    installedCybernetics.forEach((cyber, index) => {
        const item = document.createElement('div');
        item.className = 'cyber-item';

        // Find category for this cybernetic
        let category = '';
        for (const [cat, cyberArray] of Object.entries(cyberneticsData)) {
            if (cyberArray.find(c => c.name === cyber.name)) {
                category = cat.charAt(0).toUpperCase() + cat.slice(1);
                break;
            }
        }

        item.innerHTML = `
            <div class="cyber-item-header">
                <div class="cyber-name">${cyber.name}</div>
                <div class="cyber-category-label">${category}</div>
            </div>
            <div class="cyber-effects">
                <ul>
                    ${cyber.effects.map(effect => `<li>${effect}</li>`).join('')}
                </ul>
            </div>
            <button class="cyber-button remove-button" data-index="${index}">Remove</button>
        `;

        cyberneticsList.appendChild(item);
    });

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-button').forEach(button => {
        button.addEventListener('click', function () {
            const index = parseInt(this.dataset.index);
            removeCybernetics(index);
        });
    });
}

// Remove cybernetics
function removeCybernetics(index) {
    const cyber = installedCybernetics[index];

    // Update capacity and humanity
    currentCapacity -= cyber.capacity;
    currentHumanityLoss -= cyber.humanity;

    // Remove from list
    installedCybernetics.splice(index, 1);

    // Update UI
    updateCyberneticsList();
    updateEffectsSummary();
    updateCapacityDisplay();

    // Reload options to update installed status
    const activeCategory = document.querySelector('.cyber-category.active');
    if (activeCategory) {
        loadCyberneticsOptions(activeCategory.dataset.category);
    }
}

// Handle levels
function handleLevels() {
    // get and clamp level
    curLevel = parseInt(level.value) || 3;
    if (curLevel < 1) curLevel = 1;
    level.value = curLevel;
    // update thresholds based on level and clamp
    if (curLevel > 3) maxCapacity = 17 + Math.floor(curLevel / 2);
    if (maxCapacity < 18 || curLevel <= 3) maxCapacity = 18;
    if (curLevel >= 5) maxHumanityLoss = 100 + Math.floor(curLevel / 5) * 5;
    if (maxHumanityLoss < 100) maxHumanityLoss = 100;
    // update visually
    updateCapacityDisplay();
}

// Update capacity display
function updateCapacityDisplay() {
    capacityValue.textContent = `${currentCapacity}/${maxCapacity}`;
    humanityValue.textContent = `${currentHumanityLoss}%/${maxHumanityLoss}%`;

    // Update cost
    const totalCost = installedCybernetics.reduce((sum, cyber) => sum + cyber.cost, 0);
    totalCostElement.textContent = totalCost;
}

function updateEffectsSummary() {
    // Clear existing effects (except capacity/humanity)
    const effectsToKeep = Array.from(effectsSummary.children).slice(0, 2);
    effectsSummary.innerHTML = '';
    effectsToKeep.forEach(effect => effectsSummary.appendChild(effect));

    // Create a map to aggregate effects
    const effectGroups = new Map();

    // Collect all effects from installed cybernetics
    installedCybernetics.forEach(cyber => {
        cyber.effects.forEach(effect => {
            // Skip if effect is empty or undefined
            if (!effect) return;

            // Check if this effect contains a numeric bonus/penalty
            const numericMatch = effect.match(/([+-]\d+)/);
            let value = 0;
            let description = effect;

            if (numericMatch) {
                // This effect has a numeric value we can aggregate
                value = parseInt(numericMatch[1]);
                description = effect.replace(numericMatch[0], '').trim();
            }
            // Initialize group if needed
            if (!effectGroups.has(description)) {
                effectGroups.set(description, { total: value, sources: [cyber.name] });
            } else {
                const existing = effectGroups.get(description);
                existing.total += value;
                existing.sources.push(cyber.name);
            }
        });
    });

    // Convert to array and sort by total value (descending) then by description
    const sortedEffects = Array.from(effectGroups.entries()).sort((a, b) => {
        // Non-numeric effects come after numeric ones
        if (a[1].isNonNumeric && !b[1].isNonNumeric) return 1;
        if (!a[1].isNonNumeric && b[1].isNonNumeric) return -1;

        // Sort numeric effects by total value (higher numbers first)
        if (!a[1].isNonNumeric && !b[1].isNonNumeric) {
            if (b[1].total !== a[1].total) {
                return b[1].total - a[1].total;
            }
        }

        // If totals are equal or both are non-numeric, sort alphabetically by description
        return a[0].localeCompare(b[0]);
    });

    // Create summary items in sorted order
    sortedEffects.forEach(([effectText, data]) => {
        const effectItem = document.createElement('div');
        effectItem.className = 'effect-item';

        let displayText = effectText;
        if (!data.isNonNumeric && data.total !== 0) {
            const sign = data.total > 0 ? '+' : '';
            displayText = `${sign}${data.total} ${effectText}`;
        }

        effectItem.innerHTML = `
            <span class="effect-text">${displayText}</span>
            <div class="effect-sources">From: ${data.sources.join(', ')}</div>
        `;

        effectsSummary.appendChild(effectItem);
    });
}

// Function to generate random cybernetics build
function generateRandomCybernetics() {
    // Clear existing cybernetics
    installedCybernetics = [];
    currentCapacity = 0;
    currentHumanityLoss = 0;

    // Get all cybernetics
    const allCybernetics = [];
    Object.values(cyberneticsData).forEach(category => {
        category.forEach(cyber => allCybernetics.push(cyber));
    });

    // Shuffle cybernetics
    const shuffled = [...allCybernetics].sort(() => 0.5 - Math.random());

    // Add cybernetics until capacity is reached
    shuffled.forEach(cyber => {
        if (currentCapacity + cyber.capacity <= maxCapacity && currentHumanityLoss + cyber.humanity <= maxHumanityLoss) {
            installedCybernetics.push(cyber);
            currentCapacity += cyber.capacity;
            currentHumanityLoss += cyber.humanity;
        }
    });

    // Update UI
    updateCyberneticsList();
    updateEffectsSummary();
    updateCapacityDisplay();

    // Add change
    addChange(`Random cybernetics build created`);
}

// Function to export a cybernetics config as a JSON file
function exportCybernetics() {
    const data = {
        installed: installedCybernetics.map(c => c.name),
        level,
        maxCapacity,
        currentCapacity,
        maxHumanityLoss,
        currentHumanityLoss
    };

    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'cybernetics-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    addChange("Cybernetics configuration exported");
}

// Function to import a cybernetics config from a JSON file
function importCybernetics() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = event => {
            try {
                const data = JSON.parse(event.target.result);

                // Validate the imported data
                if (data.installed && data.maxCapacity !== undefined) {
                    // Reset current state
                    installedCybernetics = [];
                    currentCapacity = 0;
                    currentHumanityLoss = 0;
                    level = data.level;
                    maxCapacity = data.maxCapacity;
                    maxHumanityLoss = data.maxHumanityLoss;

                    // Look up each cybernetic by name
                    data.installed.forEach(name => {
                        for (const category in cyberneticsData) {
                            const cyber = cyberneticsData[category].find(c => c.name === name);
                            if (cyber) {
                                installedCybernetics.push(cyber);
                                currentCapacity += cyber.capacity;
                                currentHumanityLoss += cyber.humanity;
                                break;
                            }
                        }
                    });

                    // Update UI
                    updateCyberneticsList();
                    updateEffectsSummary();
                    updateCapacityDisplay();

                    addChange("Cybernetics configuration imported");
                } else {
                    alert("Invalid cybernetics configuration file");
                }
            } catch (error) {
                alert("Error parsing file: " + error.message);
            }
        };

        reader.readAsText(file);
    };

    input.click();
}

// Function to save cybernetics configuration to MongoDB
async function saveCybernetics() {
    const name = prompt(`Enter a name for this cybernetics configuration:`);
    if (!name) return;

    // Always ensure effects array exists
    const effects = [];
    installedCybernetics.forEach(cyber => {
        if (cyber.effects && Array.isArray(cyber.effects)) {
            effects.push(...cyber.effects);
        }
    });

    // Aggregate effects
    const effectMap = new Map();
    effects.forEach(effect => {
        const numericMatch = effect.match(/([+-]\d+)/);
        let value = 0;
        let description = effect;

        if (numericMatch) {
            value = parseInt(numericMatch[1]);
            description = effect.replace(numericMatch[0], '').trim();
        }

        if (!effectMap.has(description)) {
            effectMap.set(description, { total: value, sources: [name] });
        } else {
            const existing = effectMap.get(description);
            existing.total += value;
            existing.sources.push(name);
        }
    });

    // Format effect summaries
    const effectSummaries = [];
    effectMap.forEach((data, description) => {
        let displayValue = '';
        if (data.total !== 0) {
            displayValue = data.total > 0 ? `+${data.total}` : data.total;
        }
        effectSummaries.push(`${description}: ${displayValue}`);
    });

    const build = {
        type: 'cybernetics',
        name,
        timestamp: new Date().toISOString(),
        config: {
            installed: installedCybernetics.map(c => c.name),
            currentCapacity,
            currentHumanityLoss
        },
        installedCybernetics: installedCybernetics,
        effects: effectSummaries,
    };

    try {
        const response = await fetch('http://192.168.2.201:8000/api/cybernetics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(build)
        });

        if (!response.ok) {
            throw new Error('Failed to save to localStorage');
        }

        const saved = await response.json();
        console.log('Saved to MongoDB:', saved);
        addChange(`Cybernetics configuration as "${name}"`);

    } catch (err) {
        console.error('Error saving cybernetics:', err);
        // Fallback to localStorage
        const savedCybernetics = getFromLocalStorage('savedCybernetics') || [];
        const existingIndex = savedCybernetics.findIndex(c => c.name === name);

        if (existingIndex !== -1) {
            savedCybernetics[existingIndex] = build;
        } else {
            savedCybernetics.push(build);
        }

        if (saveToLocalStorage('savedCybernetics', savedCybernetics)) {
            addChange(`Cybernetics configuration saved as "${name}" (local)`);
        } else {
            throw new Error('Failed to save to localStorage');
        }
    }
}

// Initialize the builder
document.addEventListener('DOMContentLoaded', initCyberneticsBuilder);

// Initialize the app
init();