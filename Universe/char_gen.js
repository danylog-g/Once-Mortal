// Character data
const races = [
    "Human", "Elf", "Dwarf", "Halfling", "Dragonborn",
    "Half-Elf", "Half-Orc", "Aasimar"
];

const classes = [
    "Barbarian", "Bard", "Cleric", "Druid", "Fighter",
    "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer",
    "Warlock", "Wizard"
];

const backgrounds = [
    "Acolyte", "Charlatan", "Criminal", "Entertainer", "Folk Hero",
    "Guild Artisan", "Hermit", "Noble", "Outlander", "Sage",
    "Sailor", "Soldier", "Urchin", "Cyberneticist", "Hacker",
    "Street Samurai", "Corporate Agent", "Mercenary"
];

const alignments = [
    "Lawful Good", "Neutral Good", "Chaotic Good",
    "Lawful Neutral", "True Neutral", "Chaotic Neutral",
    "Lawful Evil", "Neutral Evil", "Chaotic Evil"
];

const firstNames = [
    "Aiden", "Brienne", "Cedric", "Darian", "Elandra",
    "Fenris", "Gwendolyn", "Haldor", "Ilyana", "Jorund",
    "Kaelen", "Lyra", "Morgrim", "Nyssa", "Orin",
    "Piper", "Quinn", "Rorik", "Sariel", "Torben",
    "Neo", "Trinity", "Morpheus", "Tank", "Switch"
];

const lastNames = [
    "Blackwood", "Brightshield", "Coppervein", "Darkscale", "Emberheart",
    "Frostmane", "Goldpetal", "Hollowhill", "Ironfist", "Jadeleaf",
    "Kingsfoil", "Lightfoot", "Moonshadow", "Nightbreeze", "Oakenhelm",
    "Proudmore", "Quickhand", "Ravenwood", "Stormrider", "Truearrow",
    "Anderson", "Kovacs", "Takemura", "Martinez", "Arasaka"
];

// Master equipment list with tags
const masterEquipment = [
    // Pirate/Wild West items
    { name: "Flintlock Pistol", type: "Firearm", details: "Damage: 1d10 piercing", tags: ["pirate", "wild-west"] },
    { name: "Cutlass", type: "Weapon", details: "Damage: 1d6 slashing", tags: ["pirate"] },
    { name: "Powder Horn", type: "Ammunition", details: "Enough for 20 shots", tags: ["pirate", "wild-west"] },
    { name: "Tricorne Hat", type: "Clothing", details: "+1 to Charisma checks with pirates", tags: ["pirate"] },
    { name: "Lasso", type: "Tool", details: "Restrain targets at range", tags: ["wild-west"] },
    { name: "Revolver", type: "Firearm", details: "Damage: 1d8 piercing", tags: ["wild-west"] },
    { name: "Musket", type: "Weapon", details: "Damage: 2d12 piercing", tags: ["pirate"] },

    // Nordic items TODO: REMOVE COLD
    { name: "Frost Giant's Hammer", type: "Weapon", details: "Damage: 2d6 bludgeoning + 1d6 cold", tags: ["nordic"] },
    { name: "Runic Battleaxe", type: "Weapon", details: "Damage: 1d12 slashing", tags: ["nordic"] },
    { name: "Thick Fur Cloak", type: "Clothing", details: "Resistance to cold damage", tags: ["nordic", "cold"] },
    { name: "Horn of Valor", type: "Wondrous Item", details: "Once per day, inspire allies", tags: ["nordic"] },

    // Modern items
    { name: "Assault Rifle", type: "Firearm", details: "Damage: 2d8 piercing", tags: ["modern"] },
    { name: "Grappling Hook Launcher", type: "Gadget", details: "Range 60ft, climbing aid", tags: ["modern"] },
    { name: "Taser", type: "Weapon", details: "1d4 lightning damage, stun DC 13", tags: ["modern"] },

    // Medieval items
    { name: "Shortsword", type: "Weapon", details: "Damage: 1d6 piercing", tags: ["medieval"] },
    { name: "Longsword", type: "Weapon", details: "Damage: 1d8 slashing", tags: ["medieval"] },
    { name: "Battleaxe", type: "Weapon", details: "Damage: 1d8 slashing", tags: ["medieval"] },
    { name: "Handaxe", type: "Weapon", details: "Damage: 1d6 slashing", tags: ["medieval", "primitive"] },
    { name: "Mace", type: "Weapon", details: "Damage: 1d6 slashing", tags: ["medieval"] },
    { name: "Club", type: "Weapon", details: "Damage: 1d4 bludgeoning", tags: ["medieval", "primitive"] },
    { name: "Flail", type: "Weapon", details: "Damage: 1d8 bludgeoning", tags: ["medieval"] },
    { name: "Spear", type: "Weapon", details: "Damage: 1d6 piercing", tags: ["medieval", "primitive"] },
    { name: "Shortbow", type: "Weapon", details: "Damage: 1d6 piercing", tags: ["medieval", "fey"] },
    { name: "Light Crossbow", type: "Weapon", details: "Damage: 1d8 piercing", tags: ["medieval", "fey"] },
    { name: "Heirloom Shield", type: "Shield", details: "AC +2, family crest", tags: ["medieval"] },
    { name: "Healing Potion (3)", type: "Consumable", details: "Heals 2d4+2 HP", tags: ["medieval"] },
    { name: "Dungeoneer's Pack", type: "Adventure Gear", details: "Essential exploration gear", tags: ["medieval"] },
    { name: "Holy Symbol", type: "Religious", details: "Focus for divine magic", tags: ["medieval"] },

    // Knightly items
    { name: "Greatsword", type: "Weapon", details: "Damage: 2d6 slashing", tags: ["knightly"] },
    { name: "Greataxe", type: "Weapon", details: "Damage: 1d12 slashing", tags: ["knightly"] },
    { name: "Greatclub", type: "Weapon", details: "Damage: 1d8 bludgeoning", tags: ["knightly"] },
    { name: "Pike", type: "Weapon", details: "Damage: 1d10 piercing", tags: ["knightly"] },
    { name: "Greathammer", type: "Weapon", details: "Damage: 2d6 bludgeoning", tags: ["knightly"] },
    { name: "Warhammer", type: "Weapon", details: "Damage: 1d8 bludgeoning", tags: ["knightly"] },
    { name: "Heavy Crossbow", type: "Weapon", details: "Damage: 1d10 piercing", tags: ["knightly"] },

    // Feywild items
    { name: "Moonbow", type: "Weapon", details: "Damage: 1d8 radiant", tags: ["fey", "magical"] },
    { name: "Enchanted Rapier", type: "Weapon", details: "Damage: 1d8 piercing + 1d4 psychic", tags: ["fey", "magical"] },
    { name: "Fey Dust (pouch)", type: "Consumable", details: "Creates illusions or causes sleep", tags: ["fey"] },
    { name: "Everbloom", type: "Wondrous Item", details: "Never wilts, glows softly", tags: ["fey"] },

    // Aerial items TODO: REMOVE / REPURPOSE
    { name: "Sky Knight Lance", type: "Weapon", details: "Damage: 1d12 piercing", tags: ["aerial", "knightly"] },
    { name: "Feather Fall Token", type: "Wondrous Item", details: "Activates feather fall once", tags: ["aerial"] },
    { name: "Cloudwalk Boots", type: "Wondrous Item", details: "Walk on clouds and mist", tags: ["aerial"] },

    // Steampunk items
    { name: "Steam-Powered Gauntlet", type: "Weapon", details: "Damage: 1d10 bludgeoning + 1d6 fire", tags: ["steampunk"] },
    { name: "Clockwork Rifle", type: "Firearm", details: "Damage: 2d6 piercing", tags: ["steampunk"] },
    { name: "Goggles of Night", type: "Wondrous Item", details: "See in darkness for an additional 60ft", tags: ["steampunk"] },
    { name: "Tesla Coil", type: "Gadget", details: "Shock nearby enemies once per day", tags: ["steampunk"] },

    // Primitive items
    { name: "Primal Spear", type: "Weapon", details: "Damage: 1d8 piercing", tags: ["primitive"] },
    { name: "Beast Hide Armor", type: "Armor", details: "AC 14, advantage on animal handling", tags: ["primitive"] },
    { name: "Primitive Traps", type: "Adventure Gear", details: "Set snares and pitfalls", tags: ["primitive"] },

    // Space items TODO: REMOVE / REPURPOSE
    { name: "Astral Cutlass", type: "Weapon", details: "Damage: 1d8 slashing + 1d4 force", tags: ["space"] },
    { name: "Star Chart Navigator", type: "Wondrous Item", details: "Never get lost in the Astral Sea", tags: ["space"] },
    { name: "Potion of Spacewalking", type: "Consumable", details: "Breathe in vacuum for 1 hour", tags: ["space"] },

    // Cyberpunk items
    { name: "Laser Pistol", type: "Firearm", details: "Damage: 2d6 radiant", tags: ["cyberpunk"] },
    { name: "Monowire Whip", type: "Weapon", details: "Damage: 1d8 slashing", tags: ["cyberpunk"] },
    { name: "Cyberdeck", type: "Tech", details: "Hack systems and devices", tags: ["cyberpunk"] },
    { name: "Nanite Medkit", type: "Medical", details: "Heals 4d8 HP", tags: ["cyberpunk"] },
    { name: "Grapple Launcher", type: "Gadget", details: "Scale buildings quickly", tags: ["cyberpunk"] },

    // Divine items
    { name: "Flaming Sword", type: "Weapon", details: "Damage: 1d8 slashing + 1d6 fire", tags: ["divine"] },
    { name: "Wings of Light", type: "Wondrous Item", details: "Fly speed 60ft", tags: ["divine"] },
    { name: "Halo of Virtue", type: "Wondrous Item", details: "+2 to Wisdom saving throws", tags: ["divine"] },

    // General items TODO: ADD MORE / REMOVE
    { name: "Backpack", type: "Adventure Gear", details: "Carry essential items", tags: ["general"] },
    { name: "Bedroll", type: "Camping", details: "For comfortable rest", tags: ["general"] },
    { name: "Rations (10 days)", type: "Food", details: "Sustenance for journeys", tags: ["general"] },
    { name: "Waterskin", type: "Container", details: "Holds water for travel", tags: ["general"] },
    { name: "Torch (10)", type: "Light Source", details: "Provides light in darkness", tags: ["general"] },
    { name: "Healer's Kit", type: "Medical", details: "Stabilize dying creatures", tags: ["general"] }
];

// Location tags mapping (each location can have multiple tags)
const locationTags = {
    "Garna": ["wild-west", "medieval", "knightly"],
    "Jotunheim": ["nordic", "knightly"],
    "Endless City": ["modern", "futuristic", "wildwest", "knightly", "medieval"],
    "Felled Realm": ["medieval", "knightly"],
    "Feywild": ["fey", "magical"],
    "Aerialis": ["knightly"],
    "Kyofu": ["wild-west", "steampunk"],
    "Realm of Beasts": ["primitive"],
    "Astral Sea": ["pirate", "medieval", "knightly", "wild-west", "steampunk", "fey", "magical"],
    "Neo-Neprad": ["cyberpunk"], // specifically for neo-neprad (place in astral sea)
    "Divine Realm": ["divine", "magical"]
};

// Location-specific armor
const locationArmors = {
    "Neo-Neprad": [
        { name: "Nanoweave Suit", ac: 15, type: "Light" },
        { name: "Powered Combat Armor", ac: 18, type: "Heavy" },
        { name: "Energy Shield", ac: 3, type: "Shield" }
    ],
    "Endless City": [
        { name: "Bulletproof Vest", ac: 14, type: "Medium" },
        { name: "Tactical Helmet", ac: 1, type: "Head" }
    ],
    "Garna": [
        { name: "Leather Duster", ac: 12, type: "Light" },
        { name: "Reinforced Poncho", ac: 13, type: "Light" }
    ],
    "Divine Realm": [
        { name: "Celestial Plate", ac: 19, type: "Heavy" },
        { name: "Aura of Protection", ac: 2, type: "Shield" }
    ],
    "Kyofu": [
        { name: "Brass Plated Armor", ac: 16, type: "Medium" },
        { name: "Steam-Powered Exoskeleton", ac: 17, type: "Heavy" }
    ],
    "Default": [
        { name: "Leather Armor", ac: 11, type: "Light" },
        { name: "Studded Leather", ac: 12, type: "Light" },
        { name: "Chain Shirt", ac: 13, type: "Medium" },
        { name: "Scale Mail", ac: 14, type: "Medium" },
        { name: "Half Plate", ac: 15, type: "Medium" },
        { name: "Chain Mail", ac: 16, type: "Heavy" },
        { name: "Plate Armor", ac: 18, type: "Heavy" },
        { name: "Shield", ac: 2, type: "Shield" }
    ]
};

const features = {
    "Barbarian": [
        "Rage", "Unarmored Defense", "Reckless Attack", "Danger Sense"
    ],
    "Bard": [
        "Bardic Inspiration", "Jack of All Trades", "Song of Rest", "Expertise"
    ],
    "Cleric": [
        "Divine Domain", "Channel Divinity", "Turn Undead", "Destroy Undead"
    ],
    "Druid": [
        "Wild Shape", "Druid Circle", "Wild Companion", "Timeless Body"
    ],
    "Fighter": [
        "Fighting Style", "Second Wind", "Action Surge", "Extra Attack"
    ],
    "Monk": [
        "Unarmored Defense", "Martial Arts", "Ki", "Unarmored Movement"
    ],
    "Paladin": [
        "Divine Sense", "Lay on Hands", "Fighting Style", "Divine Smite"
    ],
    "Ranger": [
        "Favored Enemy", "Natural Explorer", "Fighting Style", "Primeval Awareness"
    ],
    "Rogue": [
        "Sneak Attack", "Thieves' Cant", "Cunning Action", "Uncanny Dodge"
    ],
    "Sorcerer": [
        "Sorcerous Origin", "Font of Magic", "Metamagic", "Sorcerous Restoration"
    ],
    "Warlock": [
        "Otherworldly Patron", "Pact Magic", "Eldritch Invocations", "Pact Boon"
    ],
    "Wizard": [
        "Arcane Recovery", "Arcane Tradition", "Spell Mastery", "Signature Spells"
    ]
};

// Location-specific race weights (removed Tiefling and Gnome)
const locationRaceWeights = {
    "Garna": { "Human": 5, "Halfling": 3, "Half-Orc": 4, "Dragonborn": 2, "Elf": 1, "Dwarf": 1, "Half-Elf": 1 },
    "Jotunheim": { "Dwarf": 8, "Human": 3, "Half-Orc": 3, "Dragonborn": 2, "Elf": 1, "Halfling": 1, "Half-Elf": 1 },
    "Endless City": { "Human": 5, "Elf": 4, "Half-Elf": 3, "Dragonborn": 2, "Halfling": 2, "Half-Orc": 1, "Dwarf": 1 },
    "Felled Realm": { "Human": 4, "Elf": 4, "Dwarf": 4, "Halfling": 3, "Half-Elf": 3, "Half-Orc": 2, "Dragonborn": 1 },
    "Feywild": { "Elf": 8, "Halfling": 4, "Half-Elf": 3, "Human": 2, "Dragonborn": 1, "Half-Orc": 1, "Dwarf": 1 },
    "Aerialis": { "Human": 6, "Elf": 5, "Half-Elf": 4, "Dwarf": 3, "Dragonborn": 2, "Halfling": 2, "Half-Orc": 1 },
    "Kyofu": { "Human": 6, "Dragonborn": 4, "Half-Elf": 3, "Elf": 2, "Halfling": 2, "Half-Orc": 2, "Dwarf": 1 },
    "Realm of Beasts": { "Half-Orc": 6, "Dragonborn": 5, "Human": 4, "Elf": 2, "Dwarf": 2, "Halfling": 2, "Half-Elf": 1 },
    "Astral Sea": { "Human": 4, "Half-Elf": 4, "Elf": 3, "Dragonborn": 3, "Half-Orc": 2, "Halfling": 2, "Dwarf": 1 },
    "Neo-Neprad": { "Human": 5, "Dragonborn": 3, "Half-Elf": 3, "Elf": 2, "Halfling": 2, "Half-Orc": 2, "Dwarf": 1 },
    "Divine Realm": { "Aasimar": 8, "Human": 4, "Elf": 3, "Dragonborn": 3, "Half-Elf": 2, "Halfling": 1, "Half-Orc": 1, "Dwarf": 1 }
};

// Theme classes for different locations
const locationThemes = {
    "Default": "medieval",
    "Garna": "wild-west",
    "Jotunheim": "nordic",
    "Endless City": "modern",
    "Kyofu": "steampunk",
    "Realm of Beasts": "primitive",
    "Neo-Neprad": "cyberpunk",
    "Astral Sea": "pirate",
    "Divine Realm": "divine",
};

// DOM Elements
const generateBtn = document.getElementById('generateBtn');
const saveBtn = document.getElementById('saveBtn');
const locationSelect = document.getElementById('locationSelect');

// Initialize character
generateCharacter();

// Event Listeners
generateBtn.addEventListener('click', generateCharacter);
saveBtn.addEventListener('click', () => {
    alert('Character saved! (This does nothing, maybe will do something in the future)');
});
locationSelect.addEventListener('change', generateCharacter);

// Generate a new character
function generateCharacter() {
    const location = locationSelect.value;

    // Apply theme based on location
    applyTheme(location);

    // Generate character details with location influence
    const race = getWeightedRace(location);
    const charClass = getRandomItem(classes);
    const background = getLocationBackground(location);
    const alignment = getRandomItem(alignments);
    const level = Math.floor(Math.random() * 10) + 1; // Level 1-10
    const firstName = getRandomItem(firstNames);
    const lastName = getLocationLastName(location);

    // Update character header
    document.getElementById('charName').textContent = `${firstName} ${lastName}`;
    document.getElementById('charRace').textContent = race;
    document.getElementById('charClass').textContent = charClass;
    document.getElementById('charLevel').textContent = level;
    document.getElementById('charBackground').textContent = background;
    document.getElementById('charAlignment').textContent = alignment;
    document.getElementById('charLocation').textContent = location;
    document.getElementById('equipmentLocation').textContent = location;

    // Generate attributes
    const standardArray = shuffleArray([15, 14, 13, 12, 10, 8]);
    const attributes = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
    const attributesData = {};

    attributes.forEach((attr, index) => {
        attributesData[attr] = {
            value: standardArray[index],
            modifier: Math.floor((standardArray[index] - 10) / 2)
        };
    });

    // Update attributes grid
    renderAttributes(attributesData);

    // Generate combat stats
    const dexMod = attributesData['DEX'].modifier;
    const wisMod = attributesData['WIS'].modifier;
    const proficiencyBonus = Math.ceil(level / 4) + 1;

    document.getElementById('initiative').textContent = dexMod >= 0 ? `+${dexMod}` : dexMod;
    document.getElementById('proficiency').textContent = `+${proficiencyBonus}`;
    document.getElementById('passivePerception').textContent = 10 + wisMod + proficiencyBonus;

    // Generate HP (simplified)
    const baseHP = charClass === 'Barbarian' ? 12 : 8;
    const conMod = attributesData['CON'].modifier;
    const maxHP = baseHP + (conMod * level) + Math.floor(level / 2);
    const currentHP = Math.floor(maxHP * 0.75);

    document.getElementById('charHitPoints').textContent = `HP: ${currentHP}/${maxHP}`;
    document.getElementById('hpText').textContent = `${currentHP} / ${maxHP}`;
    document.querySelector('.hp-fill').style.width = `${(currentHP / maxHP) * 100}%`;

    // Generate AC (simplified)
    const armorList = locationArmors[location] || locationArmors["Default"];
    const armor = getRandomItem(armorList);
    const armorAC = armor.ac;
    const ac = armorAC + (armor.type !== 'Heavy' ? dexMod : Math.min(dexMod, 2));
    document.getElementById('charArmorClass').textContent = ac;

    // Generate speed
    const baseSpeed = race === 'Dwarf' ? 25 : 30;
    document.getElementById('charSpeed').textContent = baseSpeed;

    // Generate equipment
    renderEquipment(charClass, race, location);

    // Generate features
    renderFeatures(charClass);
}

// Apply theme based on location
function applyTheme(location) {
    // Get the body element
    const bodyElement = document.body;

    if (!bodyElement) return; // Safety check

    // Remove all theme classes
    bodyElement.classList.remove(
        'cyberpunk', 'steampunk', 'modern',
        'pirate', 'medieval', 'divine', 'wild-west',
        'nordic', 'primitive',
    );

    // Add the appropriate theme class
    const theme = locationThemes[location] || locationThemes["Default"];
    bodyElement.classList.add(theme);
}

// Get location-appropriate background
function getLocationBackground(location) {
    if (location === "Neo-Neprad") {
        return getRandomItem(["Corporate Agent", "Hacker", "Street Samurai", "Cyberneticist"]);
    } else if (location === "Endless City") {
        return getRandomItem(["Corporate Agent", "Detective", "Journalist", "Hacker"]);
    } else if (location === "Garna" || location === "Astral Sea") {
        return getRandomItem(["Sailor", "Pirate", "Smuggler", "Mercenary"]);
    }
    return getRandomItem(backgrounds);
}

// Get location-appropriate last name
function getLocationLastName(location) {
    if (location === "Neo-Neprad" || location === "Endless City") {
        return getRandomItem(["Anderson", "Kovacs", "Takemura", "Martinez", "Arasaka"]);
    }
    return getRandomItem(lastNames);
}

// Get weighted race based on location
function getWeightedRace(location) {
    const weights = locationRaceWeights[location] || locationRaceWeights["Garna"];
    const races = Object.keys(weights);
    const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);

    let random = Math.random() * totalWeight;
    for (const race of races) {
        random -= weights[race];
        if (random <= 0) {
            return race;
        }
    }

    return getRandomItem(Object.keys(weights));
}

// Render attributes to the grid
function renderAttributes(attributesData) {
    const attributesGrid = document.getElementById('attributesGrid');
    attributesGrid.innerHTML = '';

    for (const [attr, data] of Object.entries(attributesData)) {
        const modifier = data.modifier >= 0 ? `+${data.modifier}` : data.modifier;

        const statBox = document.createElement('div');
        statBox.className = 'stat-box';
        statBox.innerHTML = `
                    <div class="stat-value">${data.value}</div>
                    <div class="stat-label">${attr}</div>
                    <div class="stat-modifier">${modifier}</div>
                `;
        attributesGrid.appendChild(statBox);
    }
}

// Get equipment items by tags
function getEquipmentByTags(tags) {
    return masterEquipment.filter(item =>
        item.tags.some(tag => tags.includes(tag))
    );
}

// Render equipment with tag-based filtering
function renderEquipment(charClass, race, location) {
    const equipmentGrid = document.getElementById('equipmentGrid');
    equipmentGrid.innerHTML = '';

    // Get tags for the location
    const tags = locationTags[location] || ["general"];

    // Add "general" tag to all locations
    if (!tags.includes("general")) {
        tags.push("general");
    }

    // Get location-specific equipment
    const locationItems = getEquipmentByTags(tags);

    // Add 4-6 items from location-specific equipment
    const numItems = Math.min(6, Math.max(4, Math.floor(Math.random() * 3) + 4));
    const selectedItems = getRandomItems(locationItems, numItems);

    selectedItems.forEach(item => {
        // Get the first tag that matches the location tags
        const matchingTag = item.tags.find(tag => tags.includes(tag));
        const tagClass = `tag-${matchingTag}`;
        const tagElement = matchingTag ? `<div class="weapon-tag ${tagClass}">${matchingTag.toUpperCase()}</div>` : '';

        addEquipmentItem(item.name, item.type, item.details, tagElement);
    });
}

// Helper to add equipment item
function addEquipmentItem(name, type, details, tag = "") {
    const equipmentGrid = document.getElementById('equipmentGrid');

    const itemEl = document.createElement('div');
    itemEl.className = 'equipment-item';
    itemEl.innerHTML = `
                <div class="equipment-name">${name}</div>
                <div class="equipment-details">${type}</div>
                <div class="equipment-details">${details}</div>
                ${tag}
            `;

    equipmentGrid.appendChild(itemEl);
}

// Render class features
function renderFeatures(charClass) {
    const featuresList = document.getElementById('featuresList');
    featuresList.innerHTML = '';

    const classFeatures = features[charClass] || [];

    classFeatures.forEach(feature => {
        const li = document.createElement('li');
        li.className = 'ability-item';
        li.innerHTML = `
                    <div class="ability-name">${feature}</div>
                    <div class="ability-desc">${getFeatureDescription(feature)}</div>
                `;
        featuresList.appendChild(li);
    });
}
// Get feature description (expanded for all features)
function getFeatureDescription(feature) {
    const descriptions = {
        "Rage": "Enter a rage as a bonus action, gaining advantage on Strength checks and saves, bonus damage, and resistance to bludgeoning, piercing, and slashing damage.",
        "Unarmored Defense": "While not wearing armor, your AC equals 10 + your Dexterity modifier + your Constitution modifier.",
        "Reckless Attack": "Gain advantage on melee weapon attack rolls during this turn, but attack rolls against you have advantage until your next turn.",
        "Danger Sense": "You have advantage on Dexterity saving throws against effects that you can see, such as traps and spells.",
        "Bardic Inspiration": "Inspire others through stirring words or music. Target gains a die to add to one ability check, attack roll, or saving throw.",
        "Jack of All Trades": "Add half your proficiency bonus, rounded down, to any ability check you make that doesn't already include your proficiency bonus.",
        "Song of Rest": "If you or any friendly creatures regain hit points at the end of a short rest, each of those creatures regains extra hit points.",
        "Expertise": "Choose two of your skill proficiencies. Your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies.",
        "Divine Domain": "Choose a domain related to your deity, granting you domain spells and other features.",
        "Channel Divinity": "Gain the ability to channel divine energy to fuel magical effects. Each effect requires you to expend one use of this feature.",
        "Turn Undead": "Present your holy symbol and speak a prayer censuring the undead. Each undead that can see or hear you must make a Wisdom saving throw.",
        "Destroy Undead": "When an undead fails its saving throw against your Turn Undead feature, the creature is instantly destroyed.",
        "Wild Shape": "Use an action to magically assume the shape of a beast that you have seen before.",
        "Druid Circle": "Choose a circle that reflects your connection to nature and grants you features at 2nd level and higher.",
        "Wild Companion": "You gain the ability to summon a spirit that assumes an animal form to aid you.",
        "Timeless Body": "The primal magic that you wield causes you to age more slowly. For every 10 years, your body ages only 1 year.",
        "Fighting Style": "Adopt a particular style of fighting as your specialty. Choose one option from the list of fighting styles.",
        "Second Wind": "On your turn, you can use a bonus action to regain hit points equal to 1d10 + your fighter level.",
        "Action Surge": "Take one additional action on your turn. Regain use after a short or long rest.",
        "Extra Attack": "Attack twice, instead of once, whenever you take the Attack action on your turn.",
        "Martial Arts": "Gain mastery of combat styles that use unarmed strikes and monk weapons.",
        "Ki": "Your training allows you to harness the mystic energy of ki. Your access to this energy is represented by a number of ki points.",
        "Unarmored Movement": "Your speed increases by 10 feet while you are not wearing armor or wielding a shield.",
        "Divine Sense": "Sense celestial, fiendish, or undead creatures within 60 feet of you that are not behind total cover.",
        "Lay on Hands": "Touch a creature and restore hit points, or expend 5 hit points to cure diseases or neutralize poisons.",
        "Divine Smite": "When you hit with a melee weapon attack, expend one spell slot to deal radiant damage to the target.",
        "Favored Enemy": "Choose a type of favored enemy: beasts, fey, humanoids, monstrosities, or undead. Gain advantage on tracking them and recalling information about them.",
        "Natural Explorer": "Choose a type of favored terrain. Gain benefits when traveling or tracking in that terrain.",
        "Primeval Awareness": "Use an action to focus your awareness on the region around you. Learn if certain types of creatures are present.",
        "Sneak Attack": "Deal extra damage when you hit with an attack and have advantage, or when another enemy is within 5 feet of your target.",
        "Thieves' Cant": "Understand a secret mix of dialect, jargon, and code used to convey hidden messages in seemingly normal conversation.",
        "Cunning Action": "Take a bonus action on each of your turns to take the Dash, Disengage, or Hide action.",
        "Uncanny Dodge": "When an attacker that you can see hits you with an attack, you can use your reaction to halve the attack's damage.",
        "Sorcerous Origin": "Choose a source for your innate magical power: Draconic Bloodline, Wild Magic, or another origin.",
        "Font of Magic": "Tap into a deep wellspring of magic within yourself. This wellspring is represented by sorcery points.",
        "Metamagic": "Gain the ability to twist your spells to suit your needs using sorcery points.",
        "Sorcerous Restoration": "Regain expended sorcery points when you finish a short rest.",
        "Otherworldly Patron": "Enter into a pact with an otherworldly being of your choice: the Fiend, the Archfey, or the Great Old One.",
        "Pact Magic": "Learn spells from your patron and cast them using spell slots.",
        "Eldritch Invocations": "Learn invocations that grant you magical abilities.",
        "Pact Boon": "Your patron bestows a gift upon you for your loyal service.",
        "Arcane Recovery": "Regain some of your magical energy by studying your spellbook during a short rest.",
        "Arcane Tradition": "Choose a tradition that shapes the practice of your magic: Abjuration, Conjuration, Divination, Enchantment, Evocation, Illusion, Necromancy, or Transmutation.",
        "Spell Mastery": "Achieve such mastery over certain spells that you can cast them at will.",
        "Signature Spells": "Master powerful spells and can cast them with minimal effort."
    };

    return descriptions[feature] || "A core ability of your class.";
}

// Helper functions
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomItems(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}