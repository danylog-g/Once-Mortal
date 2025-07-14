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

};

// Attachment data
const attachmentData = {
    silencer: [
        { name: "No Suppressor", damage: "0", decibels: 0, weight: 0 },
        { name: "RC-Su Standard", damage: "-1 die size", decibels: -25, weight: 0.5 },
        { name: "RC-Su Premium", damage: "-1 die size", decibels: -35, weight: 1 },
        { name: "RC-Su Tactical", damage: "0", decibels: -30, weight: 1 },
        { name: "RC-Su Spec-Ops", damage: "0", decibels: -50, weight: 2 },
    ],
    frame: [
        { name: "RC-F Standard", weight: 0, accuracy: 0 },
        { name: "RC-F Light", weight: -0.5, accuracy: 0 },
        { name: "RC-F Heavy", weight: 2.5, accuracy: 3 },
        { name: "RC-F Alloy", weight: 1.6, accuracy: 1 },
        { name: "RC-F Tungsten", weight: 8, accuracy: 7 },
        { name: "RC-F Spec-Ops", weight: 1.4, accuracy: 2 },
    ],
    stock: [
        { name: "No Stock", weight: 0, accuracy: 0 },
        { name: "RC-St Collapsible", weight: 1.0, accuracy: 1 },
        { name: "RC-St Tactical", weight: 1.5, accuracy: 2 },
        { name: "RC-St Heavy", weight: 5, accuracy: 6 },
        { name: "RC-St Spec-Ops", weight: 3.5, accuracy: 3 },
    ],
    barrel: [
        { name: "Standard Barrel", damage: "0", range: "0", decibels: 0, weight: 0 },
        { name: "RC-B Standard", damage: "0", range: "+10/20", decibels: 0, weight: 0.2 },
        { name: "RC-B Heavy", damage: "+1 die size", range: "+20/40", decibels: -10, weight: 0.35 },
        { name: "RC-B Light", damage: "0", range: "0", decibels: -20, weight: 0.05 },
    ],
    magazine: [
        { name: "Standard Mag", ammo: "0", damage: "0", weight: 0 },
        { name: "RC-M Standard", ammo: "+25%", damage: "0", weight: 0.2 },
        { name: "RC-M Tactical", ammo: "+50%", damage: "0", weight: 0.4 },
        { name: "RC-M Spec-Ops", ammo: "+100%", damage: "0", weight: 0.6 },
        { name: "RC-M Drum", ammo: "+200%", damage: "0", weight: 1.8 }
    ],
    scope: [
        { name: "No Scope", range: "0", weight: 0, accuracy: 0 },
        { name: "RC-Sc Standard", range: "+5%/+5%", weight: 0.75, accuracy: 1 },
        { name: "RC-Sc Halo", range: "0/+100%", weight: 1.4, accuracy: 2 },
        { name: "RC-Sc Predator", range: "-5%/-30", weight: 1.1, accuracy: 4 },
        { name: "RC-Sc Spec-Ops", range: "+15/+50%", weight: 1.9, accuracy: 3 },
    ],
    bullet: [
        { name: "RC-B Standard", ammo: "0", range: "0", damage: "0", decibels: 0, weight: 0 },
        { name: "RC-B-9", ammo: "+33%", range: "-10%/-10%", damage: "-1 die size", decibels: 10, weight: -0.05 },
        { name: "RC-B-45", ammo: "-10%", range: "-5%/+10%", damage: "0", decibels: -5, weight: 0.0 },
        { name: "RC-B-22", ammo: "+50%", range: "+20%/+10%", damage: "+1 dice -1 die size", decibels: -5, weight: 0.05 },
        { name: "RC-B-3O8", ammo: "-20%", range: "+0/+75%", damage: "+1 die size", decibels: 20, weight: 0.1 },
        { name: "RC-B 12-Slug", ammo: "-50%", range: "-10%/-15%", damage: "+1 dice +1 die size", decibels: 20, weight: 0.075 },
        { name: "RC-B T-Slug", ammo: "0", range: "-10%/-15%", damage: "+1 die size", decibels: -15, weight: 1.8 },
        { name: "RC-BE Laser", ammo: "0", range: "0", damage: "0", decibels: 0, weight: 0 },
        { name: "RC-BE Plasma", ammo: "0", range: "-25%/-50%", damage: "+1 dice", decibels: 5, weight: 0.1 },
        { name: "RC-BE Ion", ammo: "0", range: "0/+25%", damage: "0", decibels: 10, weight: -0.05 },
    ],
    sight: [
        { name: "No Sight", accuracy: 0, range: "0", damage: "0", decibels: 0, weight: 0 },
        { name: "RC-Si Laser", accuracy: 1, range: "-10%/+10%", damage: "0", decibels: 0, weight: 0.5 },
        { name: "RC-Si T-Laser", accuracy: 1, range: "-10%/0", damage: "0", decibels: 0, weight: 0.2 },
        { name: "RC-Si Predator", accuracy: 2, range: "-5%/-30%", damage: "+1 dice", decibels: 0, weight: 0.75 },
    ],
    light: [
        { name: "No Light", weight: 0 },
        { name: "RC-L Standard", weight: 0.2 },
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
        barrel: "Standard Barrel",
        magazine: "Standard Mag",
        scope: "No Scope",
        bullet: "RC-B Standard",
        sight: "No Sight",
        light: "No Light",
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
        accuracy
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
            // Enhanced damage handling
            if (attachment.damage && attachment.damage !== "0") {
                // Handle die count modifications (+X dice, -X dice)
                const diceCountMatch = attachment.damage.match(/([+-]?\d+)\s*dice?s?/i);
                if (diceCountMatch) {
                    const diceChange = parseInt(diceCountMatch[1]);
                    currentDiceCount += diceChange;
                    currentDiceCount = Math.max(1, currentDiceCount); // Minimum 1 die
                }

                // Handle die size modifications (+X die size, -X die size)
                const dieSizeMatch = attachment.damage.match(/([+-]?\d+)\s*die\s*size/i);
                if (dieSizeMatch) {
                    const sizeSteps = parseInt(dieSizeMatch[1]);
                    currentDieSize = modifyDieSize(currentDieSize, sizeSteps);
                }

                // Handle simple die size changes (backward compatibility)
                if (attachment.damage === "-1 die size") {
                    currentDieSize = modifyDieSize(currentDieSize, -1);
                } else if (attachment.damage === "+1 die size") {
                    currentDieSize = modifyDieSize(currentDieSize, 1);
                }
            }

            if (attachment.range && attachment.range.includes('%')) {
                const [shortMod, longMod] = attachment.range.split('/');
                const [baseShort, baseLong] = range.split('/').map(Number);

                const applyPercentage = (base, mod) => {
                    const percent = parseInt(mod);
                    return Math.round(base * (1 + percent / 100));
                };

                range = `${applyPercentage(baseShort, shortMod)}/${applyPercentage(baseLong, longMod)}`;
            }
            else if (attachment.range) {
                if (attachment.range.startsWith("+") || attachment.range.startsWith("-")) {
                    const [addShort, addLong] = attachment.range.split('/').map(part => {
                        const num = parseInt(part);
                        return isNaN(num) ? 0 : num;
                    });
                    const [baseShort, baseLong] = range.split('/').map(Number);
                    range = `${baseShort + addShort}/${baseLong + addLong}`;
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

            if (attachment.decibels) {
                decibels += attachment.decibels;
            }

            if (attachment.weight) {
                weight += attachment.weight;
            }

            if (attachment.accuracy) {
                accuracy += attachment.accuracy;
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
    const __damage = `${currentDiceCount}d${currentDieSize}`;
    // Update stats display
    statDamage.textContent = __damage;
    statRange.textContent = `${range} ft`;
    statAmmo.textContent = `${ammo} shots`;
    statAccuracy.textContent = `${accuracy >= 0 ? '+' : ''}${accuracy}`;
    statWeight.textContent = `${weight.toFixed(1)} lb`;

    // Get volume description based on decibels
    let volumeDesc = "Quiet";
    if (decibels > 140) volumeDesc = "Deafening"; // Jet Engine
    else if (decibels > 125) volumeDesc = "Very Loud";
    else if (decibels > 120) volumeDesc = "Loud";
    else if (decibels > 100) volumeDesc = "Noisy";
    else if (decibels > 85) volumeDesc = "City Noise";
    else if (decibels > 70) volumeDesc = "Normal Conversation";
    else if (decibels > 50) volumeDesc = "Quiet Noise";
    else if (decibels >= 25) volumeDesc = "Whispers";
    else if (decibels < 25) volumeDesc = "Silent";

    statVolume.textContent = `${decibels} dB (${volumeDesc})`;

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
        }
    ],
    sensory: [
        {
            name: "NC - Eye Enhancement",
            cost: 3200,
            capacity: 1,
            humanity: 4,
            effects: [
                "Darkvision 60 ft",
                "+2 to Perception checks",
                "Zoom capability (can see details 10x further)"
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
            name: "NC - Thermal Vision Implant",
            cost: 4100,
            capacity: 2,
            humanity: 5,
            effects: [
                "See heat signatures through obstacles",
                "Detect invisible creatures",
                "Advantage on sight-based Perception in darkness"
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
        }
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
                "+1 to AC"
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
            name: "NC - Bio-electric Defense",
            cost: 4100,
            capacity: 2,
            humanity: 7,
            effects: [
                "Resistance to lightning damage",
                "Shock attackers on contact (1D4 lightning damage)",
                "Cannot be paralyzed"
            ]
        }
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
            name: "NC - Holographic Projector",
            cost: 6800,
            capacity: 2,
            humanity: 10,
            effects: [
                "Create realistic holographic illusions",
                "Distract enemies (Wis save DC 14)",
                "Communicate silently with teammates"
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
let maxCapacity = 12;
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
        const option = document.createElement('div');
        option.className = 'cyber-option';
        option.dataset.name = cyber.name; // id -> name

        option.innerHTML = `
                    <h4>${cyber.name}</h4>
                    <div class="cost">${cyber.cost} ₵ | Capacity: ${cyber.capacity}</div>
                    <div class="cyber-effects">
                        <ul>
                            ${cyber.effects.map(effect => `<li>${effect}</li>`).join('')}
                        </ul>
                    </div>
                `;

        option.addEventListener('click', function () {
            installCybernetics(cyber);
        });

        cyberOptions.appendChild(option);
    });
}

// Install cybernetics
function installCybernetics(cyber) {
    // Check capacity
    if (currentCapacity + cyber.capacity > maxCapacity) {
        alert(`Not enough cybernetics capacity! You need ${cyber.capacity} but only have ${maxCapacity - currentCapacity} available.`);
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
            if (cyberArray.find(c => c.name === cyber.name)) { // id -> name
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
    humanityLoss -= cyber.humanity;

    // Remove from list
    installedCybernetics.splice(index, 1);

    // Update UI
    updateCyberneticsList();
    updateEffectsSummary();
    updateCapacityDisplay();
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

    // Create a map to group effects by type
    const effectGroups = {};

    // Collect all effects from installed cybernetics
    installedCybernetics.forEach(cyber => {
        cyber.effects.forEach(effect => {
            // Extract effect type (first few words before a colon or verb)
            let effectType = effect.split(':')[0] || effect;
            effectType = effectType.split(' ')[0] + ' ' + effectType.split(' ')[1];

            // Special handling for common effect types
            if (effect.includes('AC')) effectType = 'AC';
            if (effect.includes('damage')) effectType = 'Damage Resistance';
            if (effect.includes('Advantage') || effect.includes('disadvantage')) effectType = 'Advantage';
            if (effect.includes('saving throw')) effectType = 'Saving Throws';

            // Initialize group if needed
            if (!effectGroups[effectType]) {
                effectGroups[effectType] = [];
            }

            // Add effect to group
            effectGroups[effectType].push(effect);
        });
    });

    // Create summary items for each effect group
    for (const [groupName, effects] of Object.entries(effectGroups)) {
        const effectItem = document.createElement('div');
        effectItem.className = 'effect-item';

        // For single effect, show it directly
        if (effects.length === 1) {
            effectItem.innerHTML = `
                        <span class="effect-name">${groupName}:</span>
                        <span class="effect-value">${effects[0].replace(/^.*?:/, '')}</span>
                    `;
        }
        // For multiple effects in same group, show as list
        else {
            const uniqueEffects = [...new Set(effects)]; // Remove duplicates
            effectItem.innerHTML = `
                        <span class="effect-name">${groupName}:</span>
                        <ul class="effect-list">
                            ${uniqueEffects.map(effect =>
                `<li>${effect.replace(/^.*?:/, '')}</li>`
            ).join('')}
                        </ul>
                    `;
        }

        effectsSummary.appendChild(effectItem);
    }
}

// Function to generate a random gun build
function generateRandomGun() {
    // Random weapon category
    const categories = ['pistols', 'rifles', 'shotguns'];
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

// Initialize the builder
document.addEventListener('DOMContentLoaded', initCyberneticsBuilder);

// Initialize the app
init();