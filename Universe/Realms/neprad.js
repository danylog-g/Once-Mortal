// Weapon data - organized by category
const weaponData = {
    pistols: [
        {
            name: "CIP - Standard",
            damage: "1d10",
            range: "10/75",
            ammo: 15,
            weight: 2,
            decibels: 165,
            accuracy: 1
        },
        {
            name: "CIP - Heavy",
            damage: "1d12",
            range: "10/75",
            ammo: 10,
            weight: 2.5,
            decibels: 160,
            accuracy: 0
        },
        {
            name: "CIP - Revolver",
            damage: "2d8",
            range: "20/150",
            ammo: 6,
            weight: 3.75,
            decibels: 175,
            accuracy: -1
        },
        {
            name: "DEW - V3",
            damage: "1d20",
            range: "10/500",
            ammo: 999,
            weight: 5,
            decibels: 190,
            accuracy: 0
        },
    ],
    rifles: [
        {
            name: "CIR - Standard",
            damage: "2d6",
            range: "50/400",
            ammo: 30,
            weight: 7,
            decibels: 175,
            accuracy: 0
        },
        {
            name: "FA - 39",
            damage: "2d8",
            range: "50/300",
            ammo: 30,
            weight: 8,
            decibels: 170,
            accuracy: -1
        },
        {
            name: "FA - 51",
            damage: "3d12",
            range: "80/1000",
            ammo: 20,
            weight: 9,
            decibels: 165,
            accuracy: 3
        },
        {
            name: "DEW - RV-V1",
            damage: "2d20",
            range: "50/1000",
            ammo: 999,
            weight: 12,
            decibels: 210,
            accuracy: 0
        },
    ],
    shotguns: [
        {
            name: "OSG - Pump",
            damage: "4d4",
            range: "10/75",
            ammo: 5,
            weight: 7.0,
            decibels: 170,
            accuracy: -2
        },
        {
            name: "OSG - Semi",
            damage: "3d6",
            range: "5/150",
            ammo: 8,
            weight: 8.0,
            decibels: 165,
            accuracy: -1
        },
        {
            name: "DEW - SV-V4",
            damage: "3d20",
            range: "5/500",
            ammo: 999,
            weight: 14,
            decibels: 250,
            accuracy: 0
        },
    ],
    snipers: [
        {
            name: "NIS - Standard",
            damage: "4d8",
            range: "500/2000/4000",
            ammo: 10,
            weight: 12,
            decibels: 170,
            accuracy: 2
        },
        {
            name: "NIS - Heavy",
            damage: "4d12",
            range: "1000/6600/13000",
            ammo: 5,
            weight: 31.2,
            decibels: 175,
            accuracy: 0
        },
        {
            name: "NIS - Light",
            damage: "4d6",
            range: "250/1000/2000",
            ammo: 10,
            weight: 10.5,
            decibels: 160,
            accuracy: 3
        },
        {
            name: "NIS - Tactical",
            damage: "5d8",
            range: "250/4100/8200",
            ammo: 5,
            weight: 14.2,
            decibels: 165,
            accuracy: 1
        },
        {
            name: "DEW - SnV-V6",
            damage: "4d20",
            range: "100/13000",
            ammo: 999,
            weight: 37.4,
            decibels: 280,
            accuracy: 0
        },
    ],
    lmgs: [
        {
            name: "CIM - Standard",
            damage: "1d6",
            range: "50/1000",
            ammo: 50,
            weight: 27,
            decibels: 175,
            accuracy: -3
        },
        {
            name: "CIM - Light",
            damage: "1d4",
            range: "30/2000",
            ammo: 30,
            weight: 13,
            decibels: 170,
            accuracy: -2
        },
        {
            name: "CIM - Heavy",
            damage: "3d4",
            range: "50/1000",
            ammo: 100,
            weight: 49,
            decibels: 180,
            accuracy: 0
        },
        {
            name: "CIM - SpecOps",
            damage: "1d6",
            range: "30/2000",
            ammo: 50,
            weight: 18,
            decibels: 165,
            accuracy: -1
        },
        {
            name: "DEW - LMG-P1",
            damage: "1d20",
            range: "30/4000",
            ammo: 999,
            weight: 44.82,
            decibels: 300,
            accuracy: -3
        },
    ],
    atws: [
        {
            name: "CIAT - Standard",
            damage: "2d12",
            range: "160/1100",
            ammo: 3,
            weight: 22,
            decibels: 300,
            accuracy: -3
        },
        {
            name: "CIAT - Light",
            damage: "1d20",
            range: "160/8200",
            ammo: 1,
            weight: 14,
            decibels: 275,
            accuracy: -3
        },
        {
            name: "CIAT - Heavy",
            damage: "2d20",
            range: "100/8200",
            ammo: 3,
            weight: 49,
            decibels: 325,
            accuracy: -3
        },
    ],
};

// Attachment data
const attachmentData = {
    silencer: [
        { name: "No Suppressor", damage: "0", decibels: 0, weight: 0 },
        { name: "RC-Su Standard", damage: "-1 die size", decibels: "-30", weight: 0.5 },
        { name: "RC-Su Premium", damage: "-1 die size", decibels: "-40", weight: 1 },
        { name: "RC-Su Tactical", damage: "0", decibels: "-35", weight: 1 },
        { name: "RC-Su Spec-Ops", damage: "0", decibels: "-60", weight: 2 },
        { name: "RC-Su Loudencer", damage: "+1 die size", decibels:"+40", weight:1 },
    ],
    frame: [
        { name: "RC-F Standard", weight: 0, accuracy: 0 },
        { name: "RC-F Light", weight: -1, accuracy: -1 },
        { name: "RC-F Heavy", weight: 2.5, accuracy: 3 },
        { name: "RC-F Alloy", weight: 1.6, accuracy: 2 },
        { name: "RC-F Tungsten", weight: 8, accuracy: 4 },
        { name: "RC-F Spec-Ops", weight: 0.7, accuracy: 1 },
    ],
    stock: [
        { name: "No Stock", weight: 0, accuracy: 0 },
        { name: "RC-St Collapsible", weight: 1.0, accuracy: 1 },
        { name: "RC-St Tactical", weight: 1.5, accuracy: 2 },
        { name: "RC-St Heavy", range: "+10%/+20%/+20%", weight: 5, accuracy: 4 },
        { name: "RC-St Spec-Ops", range: "+10%/+10%/+10%", weight: 3.5, accuracy: 3 },
    ],
    grip: [
        { name: "No Grip", weight: 0, accuracy: 0 },
        { name: "RC-G Collapsible", weight: 1.0, accuracy: 1 },
        { name: "RC-G Tactical", weight: 1.5, accuracy: 2 },
        { name: "RC-G Heavy", range: "+10%/+20%/+20%", weight: 5, accuracy: 4 },
        { name: "RC-G Spec-Ops", range: "+10%/+10%/+10%", weight: 3.5, accuracy: 3 },
    ],
    barrel: [
        { name: "RC-B Standard", damage: "0", range: "0", decibels: "0", weight: 0 },
        { name: "RC-B Light", damage: "0", range: "0", decibels: "-10", weight: -0.25 },
        { name: "RC-B Heavy", damage: "+1 die size", range: "+20/40/10%", decibels: "-10", weight: 0.25 },
        { name: "RC-B Alloy", damage: "0", range: "+20/40/80", decibels: "0", weight: -0.05 },
        { name: "RC-B Tungsten", damage: "+1 die size", range: "+20/40/10%", decibels: "-20", weight: 3 },
        { name: "RC-B Spec-Ops", damage: "0", range: "0", decibels: "-20", weight: -0.05 },
    ],
    magazine: [
        { name: "RC-M Standard", ammo: "0", damage: "0", weight: 0 },
        { name: "RC-M Common", ammo: "+25%", damage: "0", weight: 0.2 },
        { name: "RC-M Tactical", ammo: "+50%", damage: "0", weight: 0.4 },
        { name: "RC-M Spec-Ops", ammo: "+100%", damage: "0", weight: 0.8 },
        { name: "RC-M Drum", ammo: "+200%", damage: "0", weight: 2 },
        { name: "RC-Ab Feed Strip", ammo: "0", damage: "+1 dice", weight: 1.13 },
        { name: "RC-Ab Chain", ammo: "0", damage: "+2 dice", weight: 2.05 },
        { name: "RC-Ab Belt", ammo: "0", damage: "+3 dice", weight: 3.1 },
        { name: "RC-Ab A-Strip", ammo: "+25%", damage: "+1 dice", weight: 1.35 },
        { name: "RC-Ab D-Strip", ammo: "+50%", damage: "+1 dice", weight: 3.1 },
        { name: "RC-Ab D-Belt", ammo: "+25%", damage: "+3 dice", weight: 6.3 },
    ],
    scope: [
        { name: "RC-Sc Standard", range: "0", weight: 0, accuracy: 0 },
        { name: "RC-Sc Premium", range: "+5%/+10%/+5%", weight: 0.75, accuracy: 1 },
        { name: "RC-Sc Halo", range: "0/+100%/+50%", weight: 1.4, accuracy: 0 },
        { name: "RC-Sc Predator", range: "-25%/-50%/-75%", weight: 1.1, accuracy: 4 },
        { name: "RC-Sc S-Tactical", range: "0/+25%/+50%", weight: 0.6, accuracy: 1 },
        { name: "RC-Sc FR-Tactical", range: "0/+50%/+25%", weight: 0.6, accuracy: 2 },
        { name: "RC-Sc S-Spec-Ops", range: "+15%/+50%/+25%", weight: 1, accuracy: 2 },
        { name: "RC-Sc FR-Spec-Ops", range: "-20%/-10%/-10%", weight: 1, accuracy: 3 },
        { name: "RC-Sc Thermal", range: "0", weight: 1, accuracy: 0 },
        { name: "RC-Sc T-Thermal", range: "+5%/+10%/+5%", weight: 1.5, accuracy: 0 },
        { name: "RC-Sc S-Thermal", range: "+15%/+30%/+15%", weight: 1.4, accuracy: 0 },
    ],
    sight: [
        { name: "No Sight", accuracy: 0, range: "0", damage: "0", decibels: 0, weight: 0 },
        { name: "RC-Si Laser", accuracy: 1, range: "-10%/+10%", damage: "0", decibels: 0, weight: 0.2 },
        { name: "RC-Si Int-Laser", accuracy: 1, range: "-10%/0", damage: "0", decibels: 0, weight: 0.1 },
        { name: "RC-Si Predator", accuracy: 2, range: "-5%/-30%", damage: "+1 dice", decibels: 0, weight: 0.33 },
    ],
    bullet: [
        { name: "RC-B Standard", ammo: "0", range: "0", damage: "0", decibels: 0, weight: 0, type: "Piercing" },
        { name: "RC-B-9", ammo: "+33%", range: "-10%/-10%/-50%", damage: "-1 die size", decibels: "10%", weight: -0.05, type: "Piercing" },
        { name: "RC-B-45", ammo: "-10%", range: "-5%/+10%/+10%", damage: "0", decibels: "-5%", weight: 0.0, type: "Piercing" },
        { name: "RC-B-22", ammo: "+50%", range: "+20%/+10%/+20%", damage: "+1 dice -1 die size", decibels: "-5%", weight: 0.05, type: "Piercing" },
        { name: "RC-B-3O8", ammo: "-20%", range: "+0/+75%/+25%", damage: "+1 die size", decibels: "20%", weight: 0.1, type: "Piercing" },
        { name: "RC-B 12-Slug", ammo: "-50%", range: "-10%/-15%/-75%", damage: "+1 dice +1 die size", decibels: "20%", weight: 0.075, type: "Piercing" },
        { name: "RC-B T-Slug", ammo: "0", range: "-10%/-15%/-75%", damage: "+1 die size", decibels: "-15%", weight: 1.8, type: "Piercing" },
        { name: "RC-B-22-Segmented", ammo: "0", range: "-10%/-15%/-30%", damage: "-2 die size", decibels: "-75%", weight: 0.1, type: "Piercing" },
        { name: "RC-E Laser", ammo: "0", range: "0", damage: "0", decibels: 0, weight: 0, type: "Radiant" },
        { name: "RC-E Plasma", ammo: "0", range: "-25%/-50%/-75%", damage: "+1 dice", decibels: "10%", weight: 0.1, type: "Fire" },
        { name: "RC-E Ion", ammo: "0", range: "0/+25%/+50%", damage: "0", decibels: "20%", weight: -0.05, type: "Radiant" },
        { name: "RC-E Particles", ammo: "0", range: "0/-50%/-75%", damage: "+1 dice size", decibels: "-33%", weight: -0.1, type: "Fire" },
        { name: "RC-W Warhead", ammo: "0", range: "0/0/0", damage: "0", decibels: "0", weight: 0.0, type: "Bludgeoning" },
        { name: "RC-W Wasp", ammo: "+50%", range: "0/-50%/-50%", damage: "+2 dice -1 dice size", decibels: "-20%", weight: -3.0, type: "Piercing" },
        { name: "RC-W HEAT", ammo: "0", range: "+15%/0/0", damage: "+1 dice, +1 dice size", decibels: "+20%", weight: 1.0, type: "Force" },
        { name: "RC-W NF", ammo: "-50%", range: "0/0/0", damage: "0", decibels: "0", weight: 3.0, type: "Necrotic" },
        { name: "RC-W NG", ammo: "-25%", range: "0/0/0", damage: "0", decibels: "-33%", weight: -2.0, type: "Poison" },
    ],
    light: [
        { name: "No Light", weight: 0 },
        { name: "RC-L Standard", weight: 0.2 },
        { name: "RC-L 1000L", weight: 0.6 },
        { name: "RC-L A-1KL", weight: 1.2 },
        { name: "RC-L TA-1KL", weight: 1.8 },
    ],
    switch: [
        { name: "Semi-Automatic", accuracy: 0, weight: 0 },
        { name: "Burst Fire", accuracy: -2, weight: -0.5 },
        { name: "Fully Automatic", accuracy: -4, weight: -1 },
    ],
};

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
                    
                    return percentMatch 
                        ? Math.round(baseVal * (1 + parseInt(percentMatch[1])/100))
                        : baseVal;
                }).join('/');
            }
            else if (attachment.range) {
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

            if (attachment.ammo && attachment.ammo !== "0") {
                if (attachment.ammo.includes('%')) {
                    const percent = parseInt(attachment.ammo);
                    if (!isNaN(percent)) {
                        ammo = Math.round(ammo * (1 + percent / 100));
                    }
                }
                else {
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
                }
                else {
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
    statVolume.textContent = getVolumeDescription(decibels);

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
    let volumeDesc = "Quiet";
    if (decibels > 140) volumeDesc = "Deafening";
    else if (decibels > 125) volumeDesc = "Very Loud";
    else if (decibels > 120) volumeDesc = "Loud";
    else if (decibels > 100) volumeDesc = "Noisy";
    else if (decibels > 85) volumeDesc = "City Noise";
    else if (decibels > 70) volumeDesc = "Conversation";
    else if (decibels > 50) volumeDesc = "Quiet Noise";
    else if (decibels >= 25) volumeDesc = "Whispers";
    else if (decibels < 25) volumeDesc = "Silent";
    
    return `${decibels} dB (${volumeDesc})`;
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
function saveGun(share = false) {
    const name = prompt(`Enter a name for this ${share ? 'shared' : ''} gun configuration:`);
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
    let [baseDiceCount, baseDieSize] = weapon.damage.split('d').map(Number);
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
                
                return percentMatch 
                    ? Math.round(baseVal * (1 + parseInt(percentMatch[1])/100))
                    : baseVal;
            }).join('/');
        }
        else if (attachment.range) {
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

        // Other stats
        if (attachment.ammo && attachment.ammo !== "0") {
            if (attachment.ammo.includes('%')) {
                const percent = parseInt(attachment.ammo);
                if (!isNaN(percent)) {
                    ammo = Math.round(ammo * (1 + percent / 100));
                }
            }
            else {
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
            }
            else {
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
        volume: getVolumeDescription(decibels)
    };
    
    const savedData = JSON.parse(localStorage.getItem('savedData') || '{"private":[],"shared":[]}');
    
    const build = {
        type: 'gun',
        name,
        timestamp: new Date().toISOString(),
        config: currentConfig,
        stats: stats,
        shared: share
    };
    
    if (share) {
        savedData.shared.push(build);
    } else {
        savedData.private.push(build);
    }
    
    localStorage.setItem('savedData', JSON.stringify(savedData));
    addChange(`Gun configuration ${share ? 'shared' : 'saved'} as "${name}"`);
}

// Cybernetics Data
const cyberneticsData = {
    neural: [
        {
            name: "NC - Neuron Booster",
            cost: 3500,
            capacity: 2,
            humanity: 5,
            effects: [
                "+2 to Intelligence checks",
                "Advantage on saving throws against mind-altering effects",
                "Learn one additional language"
            ]
        },
        {
            name: "NC - Reflex Booster",
            cost: 4200,
            capacity: 2,
            humanity: 8,
            effects: [
                "+2 to Dexterity saving throws",
                "Can perform an additional action per turn",
                "Advantage on initiative rolls"
            ]
        },
        {
            name: "NC - Memory Booster",
            cost: 2800,
            capacity: 1,
            humanity: 3,
            effects: [
                "Perfect recall of all experiences",
                "Cannot be affected by memory-altering effects",
                "+2 to History and Investigation checks"
            ]
        },
        {
            name: "NC - Threat Assessment",
            cost: 3800,
            capacity: 2,
            humanity: 6,
            effects: [
                "Advantage on Insight checks",
                "Advantage on Perception Checks",
                "Cannot be surprised in combat"
            ]
        },
        {
            name: "NC - Cerebral Uplink",
            cost: 4000,
            capacity: 2,
            humanity: 6,
            effects: [
                "Advantage on Intelligence saving throws",
                "Advantage on Wisdom saving throws",
                "Learn 2 languages or tool proficiencies",
                "Reroll 1 failed knowledge check per hour"
            ]
        },
        {
            name: "NC - Reflex Optimization",
            cost: 4500,
            capacity: 2,
            humanity: 7,
            effects: [
                "+1 reaction per combat",
                "Advantage on Dexterity saves vs area effects",
                "Ignite difficult terrain when moving"
            ]
        },
        {
            name: "NC - Cognitive Accelerator",
            cost: 5800,
            capacity: 3,
            humanity: 7,
            effects: [
                "Double proficiency bonus on Intelligence checks",
                "Cast Detect Thoughts once per long rest",
                "Understand any written language"
            ]
        },
        {
            name: "NC - Zen Focus Processor",
            cost: 4200,
            capacity: 2,
            humanity: 5,
            effects: [
                "Advantage on concentration checks",
                "Immunity to fear effects",
                "Meditate to gain temporary hit points (1d10)"
            ]
        },
    ],
    sensory: [
        {
            name: "NC - Eye Enhancement",
            cost: 3200,
            capacity: 1,
            humanity: 4,
            effects: [
                "Darkvision 60ft or extend existing 30ft.",
                "+2 to Perception checks",
                "Zoom capability (can see details 10x further)"
            ]
        },
        {
            name: "NC - X-Ray Vision Implant",
            cost: 8900,
            capacity: 3,
            humanity: 12,
            effects: [
                "See through up to 1 foot of solid material",
                "Detect structural weaknesses in objects",
                "Advantage on Investigation checks",
                "Detect hidden compartments and traps",
            ]
        },
        {
            name: "NC - Thermal Vision Implant",
            cost: 4100,
            capacity: 2,
            humanity: 5,
            effects: [
                "See heat signatures through obstacles",
                "Detect invisible creatures",
                "Advantage on sight-based Perception in darkness"
            ]
        },
        {
            name: "NC - Oculus System",
            cost: 3500,
            capacity: 1,
            humanity: 4,
            effects: [
                "Darkvision 60ft or extend existing by 30ft",
                "See invisible creatures 1x/combat",
                "Analyze weak points (+1d4 damage 3x/day)"
            ]
        },
        {
            name: "NC - Aural Processor",
            cost: 2800,
            capacity: 1,
            humanity: 3,
            effects: [
                "Hear through soundproofing",
                "Sonic pulse (15ft cone, DC13 CON save or stunned)",
                "Advantage on detecting illusions"
            ]
        },
        {
            name: "NC - Audio Enhancement",
            cost: 2500,
            capacity: 1,
            humanity: 3,
            effects: [
                "Hear frequencies beyond normal range",
                "Advantage on hearing-based Perception checks",
                "Filter out background noise"
            ]
        },
        {
            name: "NC - Olfactory Booster",
            cost: 1800,
            capacity: 1,
            humanity: 2,
            effects: [
                "Identify chemicals and substances by smell",
                "Track by scent with advantage",
                "Advantage on Insight checks relating to people"
            ]
        },
        {
            name: "NC - Chrono-Sense",
            cost: 7500,
            capacity: 3,
            humanity: 9,
            effects: [
                "Always act first in surprise rounds",
                "Predict enemy movements (+2 AC against ranged attacks)",
                "Always know exact time of day"
            ]
        }
    ],
    limbs: [
        {
            name: "NC-MA-III",
            cost: 5500,
            capacity: 3,
            humanity: 10,
            effects: [
                "STR increased to 19",
                "Built-in weapon compartment",
                "Advantage on Strength checks"
            ]
        },
        {
            name: "NC-TA-I",
            cost: 5200,
            capacity: 2,
            humanity: 8,
            effects: [
                "Integrated toolset (lockpick, multitool, etc)",
                "Grapple hook (30ft range)",
                "Magnetic grip (climb metal surfaces)"
            ]
        },
        {
            name: "NC-ML-Ω",
            cost: 6200,
            capacity: 3,
            humanity: 12,
            effects: [
                "Movement speed increased by 10 ft",
                "Jump distance doubled",
                "Land safely from falls up to 50 ft"
            ]
        },
        {
            name: "NC-KL-I",
            cost: 5800,
            capacity: 3,
            humanity: 9,
            effects: [
                "Movement speed increased by 10ft",
                "Wall-running capability on successful DC12 Acrobatics check",
                "Fall damage reduced by 50%"
            ]
        },
        {
            name: "NC - Grip Booster",
            cost: 2900,
            capacity: 1,
            humanity: 4,
            effects: [
                "Advantage on climbing checks",
                "Cannot be disarmed",
                "Crushing grip (1D6 damage)"
            ]
        },
        {
            name: "NC - Retractable Forearm Blades",
            cost: 6800,
            capacity: 2,
            humanity: 15,
            effects: [
                "Deployable blades (2D6 slashing damage)",
                "+2 to attack rolls with blades",
                "Stealth deployment"
            ]
        },
        {
            name: "NC - Wolverine Claws",
            cost: 4700,
            capacity: 2,
            humanity: 6,
            effects: [
                "Deployable blades (3D4 slashing damage)",
                "+2 to attack rolls on unarmed attacks",
                "Stealth deployment"
            ]
        }
    ],
    internal: [
        {
            name: "NC - Subdermal Armor",
            cost: 7200,
            capacity: 4,
            humanity: 18,
            effects: [
                "AC increased by +2",
                "Resistance to piercing damage",
                "Immune to critical hits"
            ]
        },
        {
            name: "NC - Toxin Filtration",
            cost: 3800,
            capacity: 1,
            humanity: 3,
            effects: [
                "Advantage on saving throws against poison and disease",
                "Resistance to poison damage",
                "Filter air contaminants"
            ]
        },
        {
            name: "NC - Adrenal Booster",
            cost: 5100,
            capacity: 2,
            humanity: 12,
            effects: [
                "Once per combat, gain an additional action",
                "Temporary +2 to STR and DEX for 1 minute",
                "Resistance to exhaustion"
            ]
        },
        {
            name: "NC - Nanite Circulatory System",
            cost: 8900,
            capacity: 3,
            humanity: 15,
            effects: [
                "Regenerate 1d6 HP per round",
                "Cure one disease or poison per long rest",
                "Stabilize automatically when dying"
            ]
        },
        {
            name: "NC - Bio-Regulator",
            cost: 7500,
            capacity: 3,
            humanity: 12,
            effects: [
                "Resistance to one damage type (chosen daily)",
                "Stabilize automatically at 0 HP",
                "Advantage on saving throws against disease and poison"
            ]
        },
        {
            name: "NC - Adrenal-Regulator",
            cost: 4800,
            capacity: 2,
            humanity: 10,
            effects: [
                "Bonus action dash/disengage 3x/day",
                "When reduced to 50% HP: +2 AC for two turns",
                "Ignore exhaustion penalties 1x/day"
            ]
        },
        {
            name: "NC - Metabolic Regulator",
            cost: 6800,
            capacity: 3,
            humanity: 15,
            effects: [
                "Require only 4 hours of sleep for long rest",
                "Reduced need for eating and drinking",
                "Advantage on Constitution saving throws",
                "Meditation takes only 1 hour"
            ]
        },
    ],
    dermal: [
        {
            name: "NC - Chameleon Skin",
            cost: 4500,
            capacity: 2,
            humanity: 8,
            effects: [
                "Advantage on Stealth checks",
                "Can change skin color and texture",
                "AC increased by +1"
            ]
        },
        {
            name: "NC - Thermal Dampening",
            cost: 3200,
            capacity: 1,
            humanity: 4,
            effects: [
                "Undetectable to thermal vision",
                "Resistance to fire damage",
                "Advantage on saving throws against extreme heat"
            ]
        },
        {
            name: "NC - Dermal Plating",
            cost: 5400,
            capacity: 3,
            humanity: 10,
            effects: [
                "AC increased by +1",
                "Resistance to slashing and bludgeoning damage",
                "Cannot be grappled"
            ]
        },
        {
            name: "NC - Reactive Plating",
            cost: 6200,
            capacity: 3,
            humanity: 11,
            effects: [
                "AC increased by +1",
                "When hit by a melee attack, you can retaliate with 1d6 lightning damage",
                "Resistance to critical hits"
            ]
        },
        {
            name: "NC - Bio-electric Defense",
            cost: 4100,
            capacity: 2,
            humanity: 7,
            effects: [
                "Resistance to lightning damage",
                "Shock attackers on contact (1D4 lightning damage)",
                "Cannot be paralyzed"
            ]
        },
        {
            name: "NC - Photosynthetic Skin",
            cost: 3800,
            capacity: 2,
            humanity: 5,
            effects: [
                "Regenerate 1 HP per hour in sunlight",
                "Resistance to radiant damage",
                "Glow softly in darkness (5ft radius)"
            ]
        },
    ],
    special: [
        {
            name: "NC - Optical Cloaking Device",
            cost: 12500,
            capacity: 4,
            humanity: 20,
            effects: [
                "Turn invisible for up to 1 minute",
                "Recharge on short rest",
                "Advantage on Stealth checks while active"
            ]
        },
        {
            name: "NC - Neural Hacking Suite",
            cost: 9500,
            capacity: 3,
            humanity: 15,
            effects: [
                "+2 to all puzzle-related checks",
                "Access technological and magical systems remotely up to 30 ft",
                "Advantage on Intelligence checks"
            ]
        },
        {
            name: "NC - Infiltrator Suite",
            cost: 6900,
            capacity: 2,
            humanity: 9,
            effects: [
                "Advantage on Stealth checks",
                "Advantage on Sleight of Hand checks",
                "Crit on surprised targets"
            ]
        },
        {
            name: "NC - Meditech Suite",
            cost: 5300,
            capacity: 2,
            humanity: 4,
            effects: [
                "Stabilize creatures as a bonus action",
                "Heal 1d4 + Intelligence modifier per rest (self or ally)",
                "Advantage on Medicine checks"
            ]
        },
        {
            name: "NC - Assault Suite",
            cost: 7200,
            capacity: 3,
            humanity: 10,
            effects: [
                "Proficiency with all weapons",
                "When you take the Dash action, your Speed increases by 10 feet for that action",
                "You can attack twice instead of once whenever you take the Attack action on your turn"
            ]
        },
        {
            name: "NC - Holographic Projector",
            cost: 6800,
            capacity: 2,
            humanity: 10,
            effects: [
                "Project disguise (Advantage on deception rolls)",
                "Create realistic holographic illusions (Wis save DC 14)",
                "Communicate silently with teammates (30ft range)"
            ]
        },
        {
            name: "NC - Integrated Tesla Coil",
            cost: 11000,
            capacity: 4,
            humanity: 25,
            effects: [
                "Lightning discharge (3D8 damage in 15 ft radius)",
                "Recharge on long rest",
                "Immune to lightning damage"
            ]
        }
    ]
};

// Current cybernetics configuration
let installedCybernetics = [];
let maxCapacity = 18;
let currentCapacity = 0;
let humanityLoss = 0;

// DOM Elements
const cyberCategories = document.querySelectorAll('.cyber-category');
const cyberOptions = document.querySelector('.cybernetics-options');
const cyberneticsList = document.getElementById('cyberneticsList');
const effectsSummary = document.getElementById('effectsSummary');
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

    // Load initial category
    loadCyberneticsOptions('neural');

    // Update capacity display
    updateCapacityDisplay();
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
            option.addEventListener('click', function() {
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
    if (humanityLoss + cyber.humanity > 100) {
        alert(`Not enough humanity to spare! You are basically a Cyborg already.`);
        return;
    }

    // Add to installed list
    installedCybernetics.push(cyber);

    // Update capacity and humanity
    currentCapacity += cyber.capacity;
    humanityLoss += cyber.humanity;

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
        button.addEventListener('click', function() {
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
    humanityLoss -= cyber.humanity;

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

// Update capacity display
function updateCapacityDisplay() {
    capacityValue.textContent = `${currentCapacity}/${maxCapacity}`;
    humanityValue.textContent = `${humanityLoss}%`;

    // Update cost
    const totalCost = installedCybernetics.reduce((sum, cyber) => sum + cyber.cost, 0);
    totalCostElement.textContent = totalCost;
}

// Update effects summary to properly compile cybernetic effects
function updateEffectsSummary() {
    // Clear existing effects (except the first two)
    const effectsToKeep = Array.from(effectsSummary.children).slice(0, 2);
    effectsSummary.innerHTML = '';
    effectsToKeep.forEach(effect => effectsSummary.appendChild(effect));

    // Create a map to aggregate effects
    const effectMap = new Map();

    // Collect all effects from installed cybernetics
    installedCybernetics.forEach(cyber => {
        cyber.effects.forEach(effect => {
            // Try to parse numeric values
            const numericMatch = effect.match(/([+-]\d+)/);
            let value = 0;
            let description = effect;
            
            if (numericMatch) {
                value = parseInt(numericMatch[1]);
                description = effect.replace(numericMatch[0], '').trim();
            }
            
            // Initialize group if needed
            if (!effectMap.has(description)) {
                effectMap.set(description, { total: value, sources: [cyber.name] });
            } else {
                const existing = effectMap.get(description);
                existing.total += value;
                existing.sources.push(cyber.name);
            }
        });
    });

    // Create summary items for each effect
    effectMap.forEach((data, description) => {
        const effectItem = document.createElement('div');
        effectItem.className = 'effect-item';
        
        let displayValue = '';
        if (data.total !== 0) {
            displayValue = data.total > 0 ? `+${data.total}` : data.total;
        }
        
        effectItem.innerHTML = `
            <span class="effect-name">${description}:</span>
            <span class="effect-value">${displayValue}</span>
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
    humanityLoss = 0;

    // Get all cybernetics
    const allCybernetics = [];
    Object.values(cyberneticsData).forEach(category => {
        category.forEach(cyber => allCybernetics.push(cyber));
    });

    // Shuffle cybernetics
    const shuffled = [...allCybernetics].sort(() => 0.5 - Math.random());

    // Add cybernetics until capacity is reached
    shuffled.forEach(cyber => {
        if (currentCapacity + cyber.capacity <= maxCapacity) {
            installedCybernetics.push(cyber);
            currentCapacity += cyber.capacity;
            humanityLoss += cyber.humanity;
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
        maxCapacity,
        currentCapacity,
        humanityLoss
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
                    humanityLoss = 0;
                    
                    // Look up each cybernetic by name
                    data.installed.forEach(name => {
                        for (const category in cyberneticsData) {
                            const cyber = cyberneticsData[category].find(c => c.name === name);
                            if (cyber) {
                                installedCybernetics.push(cyber);
                                currentCapacity += cyber.capacity;
                                humanityLoss += cyber.humanity;
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

// Function to save cybernetics configuration
function saveCybernetics(share = false) {
    const name = prompt(`Enter a name for this ${share ? 'shared' : ''} cybernetics configuration:`);
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
    
    const savedData = JSON.parse(localStorage.getItem('savedData') || '{"private":[],"shared":[]}');
    
    const build = {
        type: 'cybernetics',
        name,
        timestamp: new Date().toISOString(),
        config: {
            installed: installedCybernetics.map(c => c.name),
            currentCapacity,
            humanityLoss
        },
        installedCybernetics: installedCybernetics,
        effects: effectSummaries,
        shared: share
    };
    
    if (share) {
        savedData.shared.push(build);
    } else {
        savedData.private.push(build);
    }
    
    localStorage.setItem('savedData', JSON.stringify(savedData));
    addChange(`Cybernetics configuration ${share ? 'shared' : 'saved'} as "${name}"`);
}

// Initialize the builder
document.addEventListener('DOMContentLoaded', initCyberneticsBuilder);

// Initialize the app
init();