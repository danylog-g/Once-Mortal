// Character data
const races = [
    "Human", "Elf", "Dwarf", "Halfling", "Dragonborn",
    "Half-Elf", "Half-Orc", "Aasimar", "Gnome", "Tiefling",
    "Goliath", "Tabaxi", "Triton", "Warforged", "Genasi",
    "Changeling", "Shifter", "Kalashtar", "Orc", "Goblin",
    "Hobgoblin", "Kobold", "Yuan-ti", "Lizardfolk", "Tortle",
    "Kenku", "Aarakocra", "Firbolg", "Bugbear", "Centaur",
    "Minotaur", "Satyr", "Verdan", "Locathah", "Grung"
];

const classes = [
    "Barbarian", "Bard", "Cleric", "Druid", "Fighter",
    "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer",
    "Warlock", "Wizard", "Artificer", "Blood Hunter",
    "Mystic", "Psion", "Warlord", "Alchemist", "Gunslinger",
    "Samurai", "Arcane Archer", "Swashbuckler", "Hexblade",
    "Bladesinger", "War Mage", "Grave Cleric", "Forge Cleric",
    "Oathbreaker", "Conquest Paladin", "Redemption Paladin"
];

const backgrounds = [
    "Acolyte", "Charlatan", "Criminal", "Entertainer", "Folk Hero",
    "Guild Artisan", "Hermit", "Noble", "Outlander", "Sage",
    "Sailor", "Soldier", "Urchin", "Cyberneticist", "Hacker",
    "Street Samurai", "Corporate Agent", "Mercenary", "Archaeologist",
    "Anthropologist", "Courtier", "Far Traveler", "Inheritor",
    "Knight", "Mercenary Veteran", "Urban Bounty Hunter",
    "Uthgardt Tribe Member", "Waterdhavian Noble", "Clan Crafter",
    "Cloistered Scholar", "Failed Merchant", "Fisher", "Gambler",
    "Gladiator", "Knight of the Order", "Marine", "Physician",
    "Pirate", "Sage", "Shipwright", "Smuggler", "Soldier",
    "Spy", "Stablehand", "Urchin", "Detective", "Journalist",
    "Astronaut", "Pilot", "Engineer", "Scientist", "Diplomat"
];

const alignments = [
    "Lawful Good", "Neutral Good", "Chaotic Good",
    "Lawful Neutral", "True Neutral", "Chaotic Neutral",
    "Lawful Evil", "Neutral Evil", "Chaotic Evil",
    "Unaligned", "Any Alignment", "Lawful Impure",
    "Neutral Moral", "Chaotic Impure", "Rebel Neutral",
    "Social Good", "Moral Neutral", "Impure Neutral"
];

const firstNames = [
    "Aiden", "Brienne", "Cedric", "Darian", "Elandra",
    "Fenris", "Gwendolyn", "Haldor", "Ilyana", "Jorund",
    "Kaelen", "Lyra", "Morgrim", "Nyssa", "Orin",
    "Piper", "Quinn", "Rorik", "Sariel", "Torben",
    "Neo", "Trinity", "Morpheus", "Tank", "Switch",
    "Valerius", "Xanthe", "Yara", "Zephyr", "Kael",
    "Liora", "Thorne", "Elara", "Orion", "Seraphina",
    "Valkyrie", "Draven", "Isolde", "Gideon", "Lysandra",
    "Cassian", "Evangeline", "Malakai", "Persephone",
    "Theron", "Valeria", "Lucian", "Morgana", "Silas",
    "Rowan", "Freya", "Magnus", "Astrid", "Leif",
    "Sigrid", "Bjorn", "Ingrid", "Ragnar", "Sven",
    "Anya", "Ivan", "Katya", "Dmitri", "Natasha",
    "Hiroshi", "Sakura", "Kenji", "Yuki", "Takeo",
    "Mei", "Jin", "Ling", "Wei", "Xiu",
    "Raj", "Priya", "Arjun", "Maya", "Dev",
    "Lila", "Kiran", "Chandra", "Rohan", "Sita"
];

const lastNames = [
    "Blackwood", "Brightshield", "Coppervein", "Darkscale", "Emberheart",
    "Frostmane", "Goldpetal", "Hollowhill", "Ironfist", "Jadeleaf",
    "Kingsfoil", "Lightfoot", "Moonshadow", "Nightbreeze", "Oakenhelm",
    "Proudmore", "Quickhand", "Ravenwood", "Stormrider", "Truearrow",
    "Anderson", "Kovacs", "Takemura", "Martinez", "Arasaka",
    "Silverhand", "Dragonsbane", "Stormborn", "Fireforge", "Shadowwalker",
    "Windrider", "Stoneheart", "Frostbeard", "Sunstrider", "Moonwhisper",
    "Starweaver", "Dawnbringer", "Nightshade", "Winterbourne", "Summerfield",
    "Thunderhammer", "Swiftarrow", "Deepstone", "Highwater", "Longstride",
    "Steelwind", "Oakenshield", "Bronzebeard", "Grimshaw", "Fairweather",
    "Cinderfall", "Ashwood", "Briarwood", "Clearwater", "Darkwater",
    "Eaglecrest", "Falconwing", "Goldenleaf", "Hawthorne", "Ironwood",
    "Jasperstone", "Keensight", "Lionheart", "Mistwalker", "Northwind",
    "Onyxheart", "Paleblood", "Quickblade", "Redwood", "Silvershade"
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
    { name: "Bowie Knife", type: "Weapon", details: "Damage: 1d4 piercing", tags: ["wild-west"] },
    { name: "Duster Coat", type: "Armor", details: "AC 12 + Dex modifier", tags: ["wild-west"] },
    { name: "Bandolier", type: "Adventure Gear", details: "Holds 12 bullets or small items", tags: ["wild-west", "pirate"] },
    { name: "Peg Leg", type: "Clothing", details: "Replaces missing limb", tags: ["pirate"] },
    { name: "Eye Patch", type: "Clothing", details: "Grants darkvision 30ft", tags: ["pirate"] },
    { name: "Whiskey Flask", type: "Consumable", details: "Grants courage or heals 1d4 HP", tags: ["wild-west"] },

    // Nordic items
    { name: "Frost Giant's Hammer", type: "Weapon", details: "Damage: 2d6 bludgeoning + 1d6 cold", tags: ["nordic"] },
    { name: "Runic Battleaxe", type: "Weapon", details: "Damage: 1d12 slashing", tags: ["nordic"] },
    { name: "Thick Fur Cloak", type: "Clothing", details: "Resistance to cold damage", tags: ["nordic"] },
    { name: "Horn of Valor", type: "Wondrous Item", details: "Once per day, inspire allies", tags: ["nordic"] },
    { name: "Ulfberht Sword", type: "Weapon", details: "Damage: 1d8 slashing +1", tags: ["nordic"] },
    { name: "Round Shield", type: "Shield", details: "AC +2, can be used for shield bash", tags: ["nordic"] },
    { name: "Seax", type: "Weapon", details: "Damage: 1d6 slashing", tags: ["nordic"] },
    { name: "Drinking Horn", type: "Container", details: "Holds ale, grants temporary HP when full", tags: ["nordic"] },
    { name: "Bearskin Armor", type: "Armor", details: "AC 14, intimidating presence", tags: ["nordic"] },
    { name: "Rune Stone", type: "Wondrous Item", details: "Casts Augury once per day", tags: ["nordic"] },

    // Modern items
    { name: "Assault Rifle", type: "Firearm", details: "Damage: 2d8 piercing", tags: ["modern"] },
    { name: "Grappling Hook Launcher", type: "Gadget", details: "Range 60ft, climbing aid", tags: ["modern"] },
    { name: "Taser", type: "Weapon", details: "1d4 lightning damage, stun DC 13", tags: ["modern"] },
    { name: "Smartphone", type: "Tech", details: "Communicate, access information", tags: ["modern"] },
    { name: "Tactical Vest", type: "Armor", details: "AC 14, multiple pockets", tags: ["modern"] },
    { name: "Flashbang Grenade", type: "Consumable", details: "Blinds and deafens in 20ft radius", tags: ["modern"] },
    { name: "Lockpick Set", type: "Tool", details: "Advantage on picking locks", tags: ["modern"] },
    { name: "Night Vision Goggles", type: "Wondrous Item", details: "See in darkness 60ft", tags: ["modern"] },
    { name: "First Aid Kit", type: "Medical", details: "Stabilize or heal 2d4+2 HP", tags: ["modern"] },
    { name: "GPS Device", type: "Tech", details: "Never get lost", tags: ["modern"] },

    // Medieval items
    { name: "Shortsword", type: "Weapon", details: "Damage: 1d6 piercing", tags: ["medieval"] },
    { name: "Longsword", type: "Weapon", details: "Damage: 1d8 slashing", tags: ["medieval"] },
    { name: "Battleaxe", type: "Weapon", details: "Damage: 1d8 slashing", tags: ["medieval"] },
    { name: "Handaxe", type: "Weapon", details: "Damage: 1d6 slashing", tags: ["medieval", "primitive"] },
    { name: "Mace", type: "Weapon", details: "Damage: 1d6 bludgeoning", tags: ["medieval"] },
    { name: "Club", type: "Weapon", details: "Damage: 1d4 bludgeoning", tags: ["medieval", "primitive"] },
    { name: "Flail", type: "Weapon", details: "Damage: 1d8 bludgeoning", tags: ["medieval"] },
    { name: "Spear", type: "Weapon", details: "Damage: 1d6 piercing", tags: ["medieval", "primitive"] },
    { name: "Shortbow", type: "Weapon", details: "Damage: 1d6 piercing", tags: ["medieval", "fey"] },
    { name: "Light Crossbow", type: "Weapon", details: "Damage: 1d8 piercing", tags: ["medieval", "fey"] },
    { name: "Heirloom Shield", type: "Shield", details: "AC +2, family crest", tags: ["medieval"] },
    { name: "Healing Potion (3)", type: "Consumable", details: "Heals 2d4+2 HP", tags: ["medieval"] },
    { name: "Dungeoneer's Pack", type: "Adventure Gear", details: "Essential exploration gear", tags: ["medieval"] },
    { name: "Holy Symbol", type: "Religious", details: "Focus for divine magic", tags: ["medieval"] },
    { name: "Dagger", type: "Weapon", details: "Damage: 1d4 piercing", tags: ["medieval"] },
    { name: "Quarterstaff", type: "Weapon", details: "Damage: 1d6 bludgeoning", tags: ["medieval"] },
    { name: "Sling", type: "Weapon", details: "Damage: 1d4 bludgeoning", tags: ["medieval"] },
    { name: "Chainmail", type: "Armor", details: "AC 16", tags: ["medieval"] },
    { name: "Plate Armor", type: "Armor", details: "AC 18", tags: ["medieval"] },
    { name: "Spellbook", type: "Wondrous Item", details: "Holds wizard spells", tags: ["medieval"] },

    // Knightly items
    { name: "Greatsword", type: "Weapon", details: "Damage: 2d6 slashing", tags: ["knightly"] },
    { name: "Greataxe", type: "Weapon", details: "Damage: 1d12 slashing", tags: ["knightly"] },
    { name: "Greatclub", type: "Weapon", details: "Damage: 1d8 bludgeoning", tags: ["knightly"] },
    { name: "Pike", type: "Weapon", details: "Damage: 1d10 piercing", tags: ["knightly"] },
    { name: "Greathammer", type: "Weapon", details: "Damage: 2d6 bludgeoning", tags: ["knightly"] },
    { name: "Warhammer", type: "Weapon", details: "Damage: 1d8 bludgeoning", tags: ["knightly"] },
    { name: "Heavy Crossbow", type: "Weapon", details: "Damage: 1d10 piercing", tags: ["knightly"] },
    { name: "Lance", type: "Weapon", details: "Damage: 1d12 piercing", tags: ["knightly"] },
    { name: "Full Plate Armor", type: "Armor", details: "AC 18, disadvantage on stealth", tags: ["knightly"] },
    { name: "Kite Shield", type: "Shield", details: "AC +2, can be used as cover", tags: ["knightly"] },
    { name: "Warhorse", type: "Mount", details: "Speed 60ft, can attack", tags: ["knightly"] },
    { name: "Banner of Courage", type: "Wondrous Item", details: "Allies within 30ft gain +1 to saves", tags: ["knightly"] },

    // Feywild items
    { name: "Moonbow", type: "Weapon", details: "Damage: 1d8 radiant", tags: ["fey", "magical"] },
    { name: "Enchanted Rapier", type: "Weapon", details: "Damage: 1d8 piercing + 1d4 psychic", tags: ["fey", "magical"] },
    { name: "Fey Dust (pouch)", type: "Consumable", details: "Creates illusions or causes sleep", tags: ["fey"] },
    { name: "Everbloom", type: "Wondrous Item", details: "Never wilts, glows softly", tags: ["fey"] },
    { name: "Glamoured Leather", type: "Armor", details: "AC 13, can change appearance", tags: ["fey"] },
    { name: "Pipes of the Sewers", type: "Wondrous Item", details: "Summon rats once per day", tags: ["fey"] },
    { name: "Faerie Fire Flask", type: "Consumable", details: "Casts Faerie Fire when thrown", tags: ["fey"] },
    { name: "Dreamcatcher", type: "Wondrous Item", details: "Protects against nightmares", tags: ["fey"] },
    { name: "Will-o'-Wisp Lantern", type: "Light Source", details: "Provides daylight in 30ft radius", tags: ["fey"] },
    { name: "Fey Step Shoes", type: "Wondrous Item", details: "Teleport 30ft once per short rest", tags: ["fey"] },

    // Steampunk items
    { name: "Steam-Powered Gauntlet", type: "Weapon", details: "Damage: 1d10 bludgeoning + 1d6 fire", tags: ["steampunk"] },
    { name: "Clockwork Rifle", type: "Firearm", details: "Damage: 2d6 piercing", tags: ["steampunk"] },
    { name: "Goggles of Night", type: "Wondrous Item", details: "See in darkness for an additional 60ft", tags: ["steampunk"] },
    { name: "Tesla Coil", type: "Gadget", details: "Shock nearby enemies once per day", tags: ["steampunk"] },
    { name: "Brass Monocle", type: "Wondrous Item", details: "See invisible creatures", tags: ["steampunk"] },
    { name: "Steam Backpack", type: "Gadget", details: "Power steam devices for 1 hour", tags: ["steampunk"] },
    { name: "Gyrocopter", type: "Vehicle", details: "Fly speed 40ft", tags: ["steampunk"] },
    { name: "Clockwork Spider", type: "Familiar", details: "Can deliver touch spells", tags: ["steampunk"] },
    { name: "Pressure Bomb", type: "Consumable", details: "3d6 force damage in 10ft radius", tags: ["steampunk"] },
    { name: "Aether Compass", type: "Wondrous Item", details: "Points to nearest magic source", tags: ["steampunk"] },

    // Primitive items
    { name: "Primal Spear", type: "Weapon", details: "Damage: 1d8 piercing", tags: ["primitive"] },
    { name: "Beast Hide Armor", type: "Armor", details: "AC 14, advantage on animal handling", tags: ["primitive"] },
    { name: "Primitive Traps", type: "Adventure Gear", details: "Set snares and pitfalls", tags: ["primitive"] },
    { name: "Totem of the Bear", type: "Wondrous Item", details: "+2 to Strength checks", tags: ["primitive"] },
    { name: "Stone Axe", type: "Weapon", details: "Damage: 1d6 slashing", tags: ["primitive"] },
    { name: "Bone Dagger", type: "Weapon", details: "Damage: 1d4 piercing", tags: ["primitive"] },
    { name: "Herbal Poultice", type: "Consumable", details: "Heals 1d8 HP", tags: ["primitive"] },
    { name: "Fire Starter Kit", type: "Tool", details: "Start fires even in rain", tags: ["primitive"] },
    { name: "Trophy Necklace", type: "Clothing", details: "+1 to intimidation checks", tags: ["primitive"] },
    { name: "Drum of Summoning", type: "Wondrous Item", details: "Summon animal allies once per day", tags: ["primitive"] },

    // Cyberpunk items
    { name: "Laser Pistol", type: "Firearm", details: "Damage: 2d6 radiant", tags: ["cyberpunk"] },
    { name: "Monowire Whip", type: "Weapon", details: "Damage: 1d8 slashing", tags: ["cyberpunk"] },
    { name: "Cyberdeck", type: "Tech", details: "Hack systems and devices", tags: ["cyberpunk"] },
    { name: "Nanite Medkit", type: "Medical", details: "Heals 4d8 HP", tags: ["cyberpunk"] },
    { name: "Grapple Launcher", type: "Gadget", details: "Scale buildings quickly", tags: ["cyberpunk"] },
    { name: "Subdermal Armor", type: "Armor", details: "AC 15, always active", tags: ["cyberpunk"] },
    { name: "Neural Interface", type: "Tech", details: "+2 to Intelligence checks", tags: ["cyberpunk"] },
    { name: "Thermal Goggles", type: "Wondrous Item", details: "See heat signatures", tags: ["cyberpunk"] },
    { name: "Stim Pack", type: "Consumable", details: "+10ft movement for 1 minute", tags: ["cyberpunk"] },
    { name: "Data Chip", type: "Tech", details: "Contains valuable information", tags: ["cyberpunk"] },

    // Divine items
    { name: "Flaming Sword", type: "Weapon", details: "Damage: 1d8 slashing + 1d6 fire", tags: ["divine"] },
    { name: "Wings of Light", type: "Wondrous Item", details: "Fly speed 60ft", tags: ["divine"] },
    { name: "Halo of Virtue", type: "Wondrous Item", details: "+2 to Wisdom saving throws", tags: ["divine"] },
    { name: "Ankh of Life", type: "Wondrous Item", details: "Revivify once per week", tags: ["divine"] },
    { name: "Celestial Plate", type: "Armor", details: "AC 19, resistance to radiant damage", tags: ["divine"] },
    { name: "Prayer Beads", type: "Wondrous Item", details: "Cast Bless once per day", tags: ["divine"] },
    { name: "Sacred Tome", type: "Wondrous Item", details: "+2 to Religion checks", tags: ["divine"] },
    { name: "Angel Feather", type: "Consumable", details: "Cure any disease", tags: ["divine"] },
    { name: "Divine Focus", type: "Religious", details: "+1 to spell attack rolls", tags: ["divine"] },
    { name: "Mantle of Divinity", type: "Clothing", details: "Advantage on persuasion with faithful", tags: ["divine"] },

    // General items
    { name: "Backpack", type: "Adventure Gear", details: "Carry essential items", tags: ["general"] },
    { name: "Bedroll", type: "Camping", details: "For comfortable rest", tags: ["general"] },
    { name: "Rations (10 days)", type: "Food", details: "Sustenance for journeys", tags: ["general"] },
    { name: "Waterskin", type: "Container", details: "Holds water for travel", tags: ["general"] },
    { name: "Torch (10)", type: "Light Source", details: "Provides light in darkness", tags: ["general"] },
    { name: "Healer's Kit", type: "Medical", details: "Stabilize dying creatures", tags: ["general"] },
    { name: "Rope (50ft)", type: "Adventure Gear", details: "Silk rope, holds 500lbs", tags: ["general"] },
    { name: "Crowbar", type: "Tool", details: "Advantage on Strength checks to open", tags: ["general"] },
    { name: "Hammer", type: "Tool", details: "For construction and repairs", tags: ["general"] },
    { name: "Pitons (10)", type: "Adventure Gear", details: "For climbing and securing", tags: ["general"] },
    { name: "Ink and Quill", type: "Tool", details: "For writing and drawing", tags: ["general"] },
    { name: "Soap", type: "Adventure Gear", details: "For hygiene", tags: ["general"] },
    { name: "Tinderbox", type: "Tool", details: "Start fires", tags: ["general"] },
    { name: "Mirror", type: "Tool", details: "Small steel mirror", tags: ["general"] }
];

// Location tags mapping (each location can have multiple tags)
const locationTags = {
    "Garna": ["wild-west", "medieval", "knightly", "pirate", "general"],
    "Jotunheim": ["nordic", "knightly", "primitive", "general"],
    "Endless City": ["modern", "futuristic", "wildwest", "knightly", "medieval", "cyberpunk", "general"],
    "Felled Realm": ["medieval", "knightly", "primitive", "general"],
    "Feywild": ["fey", "magical", "general"],
    "Aerialis": ["knightly", "divine", "general"],
    "Kyofu": ["wild-west", "steampunk", "general"],
    "Realm of Beasts": ["primitive", "general"],
    "Astral Sea": ["pirate", "medieval", "knightly", "wild-west", "steampunk", "fey", "magical", "divine", "general"],
    "Neo-Neprad": ["cyberpunk", "futuristic", "modern", "general"],
    "Divine Realm": ["divine", "magical", "knightly", "general"]
};

// Location-specific armor
const locationArmors = {
    "Neo-Neprad": [
        { name: "Nanoweave Suit", ac: 15, type: "Light" },
        { name: "Powered Combat Armor", ac: 18, type: "Heavy" },
        { name: "Energy Shield", ac: 3, type: "Shield" },
        { name: "Synth-Leather Jacket", ac: 12, type: "Light" },
        { name: "Riot Gear", ac: 16, type: "Medium" },
        { name: "Optical Camouflage", ac: 13, type: "Light" }
    ],
    "Endless City": [
        { name: "Bulletproof Vest", ac: 14, type: "Medium" },
        { name: "Tactical Helmet", ac: 1, type: "Head" },
        { name: "Kevlar Suit", ac: 15, type: "Medium" },
        { name: "Riot Shield", ac: 3, type: "Shield" },
        { name: "Concealable Vest", ac: 13, type: "Light" },
        { name: "Full Body Armor", ac: 17, type: "Heavy" }
    ],
    "Garna": [
        { name: "Leather Duster", ac: 12, type: "Light" },
        { name: "Reinforced Poncho", ac: 13, type: "Light" },
        { name: "Bandit Leathers", ac: 11, type: "Light" },
        { name: "Saloon Gambler's Vest", ac: 10, type: "Light" },
        { name: "Miner's Helmet", ac: 1, type: "Head" },
        { name: "Rusty Breastplate", ac: 14, type: "Medium" }
    ],
    "Divine Realm": [
        { name: "Celestial Plate", ac: 19, type: "Heavy" },
        { name: "Aura of Protection", ac: 2, type: "Shield" },
        { name: "Radiant Robes", ac: 13, type: "Light" },
        { name: "Angelic Mail", ac: 16, type: "Medium" },
        { name: "Divine Aegis", ac: 4, type: "Shield" },
        { name: "Hallowed Helm", ac: 2, type: "Head" }
    ],
    "Kyofu": [
        { name: "Brass Plated Armor", ac: 16, type: "Medium" },
        { name: "Steam-Powered Exoskeleton", ac: 17, type: "Heavy" },
        { name: "Goggles and Respirator", ac: 0, type: "Head" },
        { name: "Cogwork Shield", ac: 2, type: "Shield" },
        { name: "Leather Apron", ac: 11, type: "Light" },
        { name: "Pressure Suit", ac: 14, type: "Medium" }
    ],
    "Jotunheim": [
        { name: "Bearskin Armor", ac: 14, type: "Medium" },
        { name: "Wolf Pelt Cloak", ac: 12, type: "Light" },
        { name: "Frost-Forged Plate", ac: 18, type: "Heavy" },
        { name: "Bone Shield", ac: 2, type: "Shield" },
        { name: "Horned Helm", ac: 1, type: "Head" },
        { name: "Mammoth Hide", ac: 15, type: "Medium" }
    ],
    "Feywild": [
        { name: "Glamoured Leather", ac: 13, type: "Light" },
        { name: "Bark Armor", ac: 14, type: "Medium" },
        { name: "Willow Shield", ac: 2, type: "Shield" },
        { name: "Moonlight Cloak", ac: 11, type: "Light" },
        { name: "Ivy Wraps", ac: 12, type: "Light" },
        { name: "Dreamspun Robes", ac: 10, type: "Light" }
    ],
    "Realm of Beasts": [
        { name: "Hide Armor", ac: 12, type: "Light" },
        { name: "Bone Armor", ac: 13, type: "Medium" },
        { name: "Turtle Shell Shield", ac: 3, type: "Shield" },
        { name: "Feather Cloak", ac: 11, type: "Light" },
        { name: "Scale Hide", ac: 14, type: "Medium" },
        { name: "Thorn Bracers", ac: 1, type: "Arms" }
    ],
    "Astral Sea": [
        { name: "Star-Forged Plate", ac: 18, type: "Heavy" },
        { name: "Ethereal Cloak", ac: 13, type: "Light" },
        { name: "Astral Shield", ac: 2, type: "Shield" },
        { name: "Void Leather", ac: 12, type: "Light" },
        { name: "Gravity Harness", ac: 14, type: "Medium" },
        { name: "Compass Rose", ac: 0, type: "Wondrous" }
    ],
    "Default": [
        { name: "Leather Armor", ac: 11, type: "Light" },
        { name: "Studded Leather", ac: 12, type: "Light" },
        { name: "Chain Shirt", ac: 13, type: "Medium" },
        { name: "Scale Mail", ac: 14, type: "Medium" },
        { name: "Half Plate", ac: 15, type: "Medium" },
        { name: "Chain Mail", ac: 16, type: "Heavy" },
        { name: "Plate Armor", ac: 18, type: "Heavy" },
        { name: "Shield", ac: 2, type: "Shield" },
        { name: "Padded Armor", ac: 11, type: "Light" },
        { name: "Hide Armor", ac: 12, type: "Medium" },
        { name: "Ring Mail", ac: 14, type: "Heavy" },
        { name: "Splint Armor", ac: 17, type: "Heavy" }
    ]
};

const features = {
    "Barbarian": [
        "Rage", "Unarmored Defense", "Reckless Attack", "Danger Sense", "Extra Attack",
        "Fast Movement", "Feral Instinct", "Brutal Critical", "Persistent Rage", "Indomitable Might"
    ],
    "Bard": [
        "Bardic Inspiration", "Jack of All Trades", "Song of Rest", "Expertise",
        "Font of Inspiration", "Countercharm", "Magical Secrets", "Superior Inspiration"
    ],
    "Cleric": [
        "Divine Domain", "Channel Divinity", "Turn Undead", "Destroy Undead",
        "Divine Intervention", "Potent Spellcasting", "Blessed Strikes", "Supreme Healing"
    ],
    "Druid": [
        "Wild Shape", "Druid Circle", "Wild Companion", "Timeless Body",
        "Beast Spells", "Archdruid", "Natural Recovery", "Circle Forms"
    ],
    "Fighter": [
        "Fighting Style", "Second Wind", "Action Surge", "Extra Attack",
        "Indomitable", "Martial Archetype", "Improved Critical", "Remarkable Athlete"
    ],
    "Monk": [
        "Unarmored Defense", "Martial Arts", "Ki", "Unarmored Movement",
        "Stunning Strike", "Ki-Empowered Strikes", "Evasion", "Stillness of Mind"
    ],
    "Paladin": [
        "Divine Sense", "Lay on Hands", "Fighting Style", "Divine Smite",
        "Aura of Protection", "Improved Divine Smite", "Cleansing Touch", "Sacred Oath"
    ],
    "Ranger": [
        "Favored Enemy", "Natural Explorer", "Fighting Style", "Primeval Awareness",
        "Land's Stride", "Hide in Plain Sight", "Vanish", "Foe Slayer"
    ],
    "Rogue": [
        "Sneak Attack", "Thieves' Cant", "Cunning Action", "Uncanny Dodge",
        "Evasion", "Reliable Talent", "Blindsense", "Slippery Mind"
    ],
    "Sorcerer": [
        "Sorcerous Origin", "Font of Magic", "Metamagic", "Sorcerous Restoration",
        "Sorcery Points", "Magical Guidance", "Metamagic Options", "Sorcerous Fortitude"
    ],
    "Warlock": [
        "Otherworldly Patron", "Pact Magic", "Eldritch Invocations", "Pact Boon",
        "Mystic Arcanum", "Eldritch Master", "Pact Magic Slots", "Invocations Known"
    ],
    "Wizard": [
        "Arcane Recovery", "Arcane Tradition", "Spell Mastery", "Signature Spells",
        "Spellbook", "Ritual Casting", "Sculpt Spells", "Overchannel"
    ],
    "Artificer": [
        "Magical Tinkering", "Infuse Item", "The Right Tool for the Job", "Flash of Genius",
        "Spell-Storing Item", "Magic Item Adept", "Soul of Artifice"
    ],
    "Blood Hunter": [
        "Hunter's Bane", "Blood Maledict", "Crimson Rite", "Grim Psychometry",
        "Blood Curse Mastery", "Brand of Castigation", "Sanguine Mastery"
    ],
    "Gunslinger": [
        "Gunsmith", "Grit", "Quick Draw", "Violent Shot",
        "Trickshot", "Lightning Reload", "Hemorrhaging Critical", "Pistol Whip"
    ],
    "Samurai": [
        "Fighting Spirit", "Elegant Courtier", "Tireless Spirit", "Rapid Strike",
        "Strength Before Death", "Unbreakable Will", "Iaijutsu"
    ],
    "Hexblade": [
        "Hex Warrior", "Hexblade's Curse", "Accursed Specter", "Armor of Hexes",
        "Master of Hexes", "Shadow Hound", "Eldritch Smite"
    ]
};

// Location-specific race weights (removed Tiefling and Gnome)
const locationRaceWeights = {
    "Garna": { 
        "Human": 5, "Halfling": 3, "Half-Orc": 4, "Dragonborn": 2, "Elf": 1, 
        "Dwarf": 1, "Half-Elf": 1, "Gnome": 2, "Tiefling": 1, "Goliath": 2,
        "Tabaxi": 1, "Triton": 0, "Warforged": 0, "Genasi": 1, "Changeling": 1,
        "Shifter": 2, "Kalashtar": 0, "Orc": 3, "Goblin": 2, "Hobgoblin": 1,
        "Kobold": 1, "Yuan-ti": 0, "Lizardfolk": 1, "Tortle": 0, "Kenku": 1,
        "Aarakocra": 0, "Firbolg": 1, "Bugbear": 2, "Centaur": 1, "Minotaur": 2,
        "Satyr": 0, "Verdan": 0, "Locathah": 0, "Grung": 0, "Aasimar": 0
    },
    "Jotunheim": { 
        "Dwarf": 8, "Human": 3, "Half-Orc": 3, "Dragonborn": 2, "Elf": 1, 
        "Halfling": 1, "Half-Elf": 1, "Gnome": 1, "Tiefling": 0, "Goliath": 6,
        "Tabaxi": 0, "Triton": 0, "Warforged": 0, "Genasi": 1, "Changeling": 0,
        "Shifter": 2, "Kalashtar": 0, "Orc": 4, "Goblin": 1, "Hobgoblin": 2,
        "Kobold": 1, "Yuan-ti": 0, "Lizardfolk": 0, "Tortle": 0, "Kenku": 0,
        "Aarakocra": 0, "Firbolg": 3, "Bugbear": 2, "Centaur": 1, "Minotaur": 3,
        "Satyr": 0, "Verdan": 0, "Locathah": 0, "Grung": 0, "Aasimar": 0
    },
    "Endless City": { 
        "Human": 5, "Elf": 4, "Half-Elf": 3, "Dragonborn": 2, "Halfling": 2, 
        "Half-Orc": 1, "Dwarf": 1, "Gnome": 3, "Tiefling": 2, "Goliath": 1,
        "Tabaxi": 2, "Triton": 0, "Warforged": 3, "Genasi": 2, "Changeling": 2,
        "Shifter": 1, "Kalashtar": 1, "Orc": 1, "Goblin": 1, "Hobgoblin": 1,
        "Kobold": 1, "Yuan-ti": 1, "Lizardfolk": 0, "Tortle": 0, "Kenku": 1,
        "Aarakocra": 0, "Firbolg": 0, "Bugbear": 0, "Centaur": 0, "Minotaur": 0,
        "Satyr": 1, "Verdan": 1, "Locathah": 0, "Grung": 0, "Aasimar": 1
    },
    "Felled Realm": { 
        "Human": 4, "Elf": 4, "Dwarf": 4, "Halfling": 3, "Half-Elf": 3, 
        "Half-Orc": 2, "Dragonborn": 1, "Gnome": 2, "Tiefling": 1, "Goliath": 1,
        "Tabaxi": 1, "Triton": 0, "Warforged": 0, "Genasi": 1, "Changeling": 1,
        "Shifter": 1, "Kalashtar": 0, "Orc": 2, "Goblin": 1, "Hobgoblin": 2,
        "Kobold": 1, "Yuan-ti": 0, "Lizardfolk": 0, "Tortle": 0, "Kenku": 0,
        "Aarakocra": 0, "Firbolg": 1, "Bugbear": 1, "Centaur": 0, "Minotaur": 1,
        "Satyr": 0, "Verdan": 0, "Locathah": 0, "Grung": 0, "Aasimar": 0
    },
    "Feywild": { 
        "Elf": 8, "Halfling": 4, "Half-Elf": 3, "Human": 2, "Dragonborn": 1, 
        "Half-Orc": 1, "Dwarf": 1, "Gnome": 5, "Tiefling": 1, "Goliath": 0,
        "Tabaxi": 2, "Triton": 0, "Warforged": 0, "Genasi": 2, "Changeling": 3,
        "Shifter": 2, "Kalashtar": 0, "Orc": 0, "Goblin": 1, "Hobgoblin": 0,
        "Kobold": 0, "Yuan-ti": 1, "Lizardfolk": 0, "Tortle": 0, "Kenku": 2,
        "Aarakocra": 1, "Firbolg": 3, "Bugbear": 0, "Centaur": 2, "Minotaur": 0,
        "Satyr": 6, "Verdan": 1, "Locathah": 0, "Grung": 0, "Aasimar": 1
    },
    "Aerialis": { 
        "Human": 6, "Elf": 5, "Half-Elf": 4, "Dwarf": 3, "Dragonborn": 2, 
        "Halfling": 2, "Half-Orc": 1, "Gnome": 2, "Tiefling": 1, "Goliath": 1,
        "Tabaxi": 1, "Triton": 0, "Warforged": 0, "Genasi": 2, "Changeling": 1,
        "Shifter": 1, "Kalashtar": 0, "Orc": 0, "Goblin": 0, "Hobgoblin": 0,
        "Kobold": 0, "Yuan-ti": 0, "Lizardfolk": 0, "Tortle": 0, "Kenku": 0,
        "Aarakocra": 8, "Firbolg": 0, "Bugbear": 0, "Centaur": 0, "Minotaur": 0,
        "Satyr": 0, "Verdan": 0, "Locathah": 0, "Grung": 0, "Aasimar": 4
    },
    "Kyofu": { 
        "Human": 6, "Dragonborn": 4, "Half-Elf": 3, "Elf": 2, "Halfling": 2, 
        "Half-Orc": 2, "Dwarf": 1, "Gnome": 3, "Tiefling": 2, "Goliath": 1,
        "Tabaxi": 1, "Triton": 0, "Warforged": 2, "Genasi": 3, "Changeling": 1,
        "Shifter": 1, "Kalashtar": 0, "Orc": 1, "Goblin": 1, "Hobgoblin": 1,
        "Kobold": 1, "Yuan-ti": 1, "Lizardfolk": 0, "Tortle": 0, "Kenku": 1,
        "Aarakocra": 0, "Firbolg": 0, "Bugbear": 0, "Centaur": 0, "Minotaur": 1,
        "Satyr": 0, "Verdan": 0, "Locathah": 0, "Grung": 0, "Aasimar": 0
    },
    "Realm of Beasts": { 
        "Half-Orc": 6, "Dragonborn": 5, "Human": 4, "Elf": 2, "Dwarf": 2, 
        "Halfling": 2, "Half-Elf": 1, "Gnome": 1, "Tiefling": 0, "Goliath": 3,
        "Tabaxi": 5, "Triton": 0, "Warforged": 0, "Genasi": 1, "Changeling": 1,
        "Shifter": 8, "Kalashtar": 0, "Orc": 4, "Goblin": 3, "Hobgoblin": 2,
        "Kobold": 2, "Yuan-ti": 1, "Lizardfolk": 6, "Tortle": 3, "Kenku": 2,
        "Aarakocra": 1, "Firbolg": 2, "Bugbear": 3, "Centaur": 4, "Minotaur": 5,
        "Satyr": 0, "Verdan": 0, "Locathah": 1, "Grung": 2, "Aasimar": 0
    },
    "Astral Sea": { 
        "Human": 4, "Half-Elf": 4, "Elf": 3, "Dragonborn": 3, "Half-Orc": 2, 
        "Halfling": 2, "Dwarf": 1, "Gnome": 2, "Tiefling": 2, "Goliath": 1,
        "Tabaxi": 1, "Triton": 3, "Warforged": 1, "Genasi": 3, "Changeling": 2,
        "Shifter": 1, "Kalashtar": 2, "Orc": 1, "Goblin": 1, "Hobgoblin": 1,
        "Kobold": 1, "Yuan-ti": 2, "Lizardfolk": 1, "Tortle": 1, "Kenku": 1,
        "Aarakocra": 2, "Firbolg": 1, "Bugbear": 1, "Centaur": 1, "Minotaur": 1,
        "Satyr": 1, "Verdan": 1, "Locathah": 2, "Grung": 1, "Aasimar": 3
    },
    "Neo-Neprad": { 
        "Human": 5, "Dragonborn": 3, "Half-Elf": 3, "Elf": 2, "Halfling": 2, 
        "Half-Orc": 2, "Dwarf": 1, "Gnome": 4, "Tiefling": 3, "Goliath": 1,
        "Tabaxi": 2, "Triton": 0, "Warforged": 6, "Genasi": 3, "Changeling": 4,
        "Shifter": 2, "Kalashtar": 2, "Orc": 1, "Goblin": 1, "Hobgoblin": 1,
        "Kobold": 1, "Yuan-ti": 2, "Lizardfolk": 0, "Tortle": 0, "Kenku": 1,
        "Aarakocra": 0, "Firbolg": 0, "Bugbear": 0, "Centaur": 0, "Minotaur": 0,
        "Satyr": 0, "Verdan": 1, "Locathah": 0, "Grung": 0, "Aasimar": 0
    },
    "Divine Realm": { 
        "Aasimar": 8, "Human": 4, "Elf": 3, "Dragonborn": 3, "Half-Elf": 2, 
        "Halfling": 1, "Half-Orc": 1, "Dwarf": 1, "Gnome": 1, "Tiefling": 0,
        "Goliath": 1, "Tabaxi": 0, "Triton": 1, "Warforged": 0, "Genasi": 2,
        "Changeling": 0, "Shifter": 0, "Kalashtar": 1, "Orc": 0, "Goblin": 0,
        "Hobgoblin": 0, "Kobold": 0, "Yuan-ti": 0, "Lizardfolk": 0, "Tortle": 0,
        "Kenku": 0, "Aarakocra": 2, "Firbolg": 0, "Bugbear": 0, "Centaur": 0,
        "Satyr": 0, "Verdan": 0, "Locathah": 0, "Grung": 0
    }
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
    "Feywild": "fey",
    "Felled Realm": "medieval",
    "Aerialis": "divine"
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
    const level = Math.floor(Math.random() * 15) + 1; // Level 1-10
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
// Get feature description
function getFeatureDescription(feature) {
    const descriptions = {
        // Barbarian features
        "Rage": "Enter a rage as a bonus action, gaining advantage on Strength checks and saves, bonus damage, and resistance to bludgeoning, piercing, and slashing damage.",
        "Unarmored Defense": "While not wearing armor, your AC equals 10 + your Dexterity modifier + your Constitution modifier.",
        "Reckless Attack": "Gain advantage on melee weapon attack rolls during this turn, but attack rolls against you have advantage until your next turn.",
        "Danger Sense": "You have advantage on Dexterity saving throws against effects that you can see, such as traps and spells.",
        "Extra Attack": "Attack twice, instead of once, whenever you take the Attack action on your turn.",
        "Fast Movement": "Your speed increases by 10 feet while you are not wearing heavy armor.",
        "Feral Instinct": "You gain advantage on initiative rolls. Additionally, if you are surprised at the beginning of combat, you can act normally on your first turn if you enter rage before doing anything else.",
        "Brutal Critical": "You can roll one additional weapon damage die when determining the extra damage for a critical hit.",
        "Persistent Rage": "Your rage ends early only if you fall unconscious or if you choose to end it.",
        "Indomitable Might": "If your total for a Strength check is less than your Strength score, you can use that score in place of the total.",

        // Bard features
        "Bardic Inspiration": "Inspire others through stirring words or music. Target gains a die to add to one ability check, attack roll, or saving throw.",
        "Jack of All Trades": "Add half your proficiency bonus, rounded down, to any ability check you make that doesn't already include your proficiency bonus.",
        "Song of Rest": "If you or any friendly creatures regain hit points at the end of a short rest, each of those creatures regains extra hit points.",
        "Expertise": "Choose two of your skill proficiencies. Your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies.",
        "Font of Inspiration": "Regain all expended uses of Bardic Inspiration when you finish a short or long rest.",
        "Countercharm": "Use your action to start a performance that protects your allies from fear and charm effects.",
        "Magical Secrets": "Learn spells from any class's spell list when you gain certain bard levels.",
        "Superior Inspiration": "When you roll initiative and have no uses of Bardic Inspiration left, you regain one use.",

        // Cleric features
        "Divine Domain": "Choose a domain related to your deity, granting you domain spells and other features.",
        "Channel Divinity": "Gain the ability to channel divine energy to fuel magical effects. Each effect requires you to expend one use of this feature.",
        "Turn Undead": "Present your holy symbol and speak a prayer censuring the undead. Each undead that can see or hear you must make a Wisdom saving throw.",
        "Destroy Undead": "When an undead fails its saving throw against your Turn Undead feature, the creature is instantly destroyed.",
        "Divine Intervention": "Call on your deity to intervene on your behalf when your need is great.",
        "Potent Spellcasting": "Add your Wisdom modifier to the damage you deal with any cleric cantrip.",
        "Blessed Strikes": "Once on each of your turns when you hit a creature with a weapon attack, you can deal extra radiant damage.",
        "Supreme Healing": "When you would normally roll one or more dice to restore hit points with a spell, you instead use the highest number possible for each die.",

        // Druid features
        "Wild Shape": "Use an action to magically assume the shape of a beast that you have seen before.",
        "Druid Circle": "Choose a circle that reflects your connection to nature and grants you features at 2nd level and higher.",
        "Wild Companion": "You gain the ability to summon a spirit that assumes an animal form to aid you.",
        "Timeless Body": "The primal magic that you wield causes you to age more slowly. For every 10 years, your body ages only 1 year.",
        "Beast Spells": "You can cast many of your druid spells in any shape you assume using Wild Shape.",
        "Archdruid": "You can use your Wild Shape an unlimited number of times and ignore verbal and somatic components of your druid spells.",
        "Natural Recovery": "Regain some expended spell slots when you finish a short rest.",
        "Circle Forms": "You can transform into beasts with a higher challenge rating using Wild Shape.",

        // Fighter features
        "Fighting Style": "Adopt a particular style of fighting as your specialty. Choose one option from the list of fighting styles.",
        "Second Wind": "On your turn, you can use a bonus action to regain hit points equal to 1d10 + your fighter level.",
        "Action Surge": "Take one additional action on your turn. Regain use after a short or long rest.",
        "Extra Attack": "Attack twice, instead of once, whenever you take the Attack action on your turn.",
        "Indomitable": "Reroll a saving throw that you fail. You must use the new roll.",
        "Martial Archetype": "Choose a martial archetype that you strive to emulate in your combat styles and techniques.",
        "Improved Critical": "Your weapon attacks score a critical hit on a roll of 19 or 20.",
        "Remarkable Athlete": "Add half your proficiency bonus to any Strength, Dexterity, or Constitution check you make that doesn't already use your proficiency bonus.",

        // Monk features
        "Unarmored Defense": "While not wearing armor, your AC equals 10 + your Dexterity modifier + your Wisdom modifier.",
        "Martial Arts": "Gain mastery of combat styles that use unarmed strikes and monk weapons.",
        "Ki": "Your training allows you to harness the mystic energy of ki. Your access to this energy is represented by a number of ki points.",
        "Unarmored Movement": "Your speed increases by 10 feet while you are not wearing armor or wielding a shield.",
        "Stunning Strike": "When you hit another creature with a melee weapon attack, you can spend 1 ki point to attempt a stunning strike.",
        "Ki-Empowered Strikes": "Your unarmed strikes count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage.",
        "Evasion": "When you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you instead take no damage if you succeed.",
        "Stillness of Mind": "Use your action to end one effect on yourself that is causing you to be charmed or frightened.",

        // Paladin features
        "Divine Sense": "Sense celestial, fiendish, or undead creatures within 60 feet of you that are not behind total cover.",
        "Lay on Hands": "Touch a creature and restore hit points, or expend 5 hit points to cure diseases or neutralize poisons.",
        "Fighting Style": "Adopt a particular style of fighting as your specialty. Choose one option from the list of fighting styles.",
        "Divine Smite": "When you hit with a melee weapon attack, expend one spell slot to deal radiant damage to the target.",
        "Aura of Protection": "You and friendly creatures within 10 feet of you gain a bonus to saving throws equal to your Charisma modifier.",
        "Improved Divine Smite": "Whenever you hit a creature with a melee weapon, the creature takes an extra 1d8 radiant damage.",
        "Cleansing Touch": "Use your action to end one spell on yourself or on one willing creature that you touch.",
        "Sacred Oath": "Swear the oath that binds you as a paladin forever.",

        // Ranger features
        "Favored Enemy": "Choose a type of favored enemy: beasts, fey, humanoids, monstrosities, or undead. Gain advantage on tracking them and recalling information about them.",
        "Natural Explorer": "Choose a type of favored terrain. Gain benefits when traveling or tracking in that terrain.",
        "Fighting Style": "Adopt a particular style of fighting as your specialty. Choose one option from the list of fighting styles.",
        "Primeval Awareness": "Use an action to focus your awareness on the region around you. Learn if certain types of creatures are present.",
        "Land's Stride": "Moving through nonmagical difficult terrain costs you no extra movement and you have advantage on saving throws against plants that are magically created.",
        "Hide in Plain Sight": "You can spend 1 minute creating camouflage for yourself, making you nearly invisible in natural surroundings.",
        "Vanish": "You can use the Hide action as a bonus action on your turn and cannot be tracked by nonmagical means.",
        "Foe Slayer": "Once on each of your turns, you can add your Wisdom modifier to the attack roll or the damage roll of an attack you make against one of your favored enemies.",

        // Rogue features
        "Sneak Attack": "Deal extra damage when you hit with an attack and have advantage, or when another enemy is within 5 feet of your target.",
        "Thieves' Cant": "Understand a secret mix of dialect, jargon, and code used to convey hidden messages in seemingly normal conversation.",
        "Cunning Action": "Take a bonus action on each of your turns to take the Dash, Disengage, or Hide action.",
        "Uncanny Dodge": "When an attacker that you can see hits you with an attack, you can use your reaction to halve the attack's damage.",
        "Evasion": "When you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you instead take no damage if you succeed.",
        "Reliable Talent": "Whenever you make an ability check that lets you add your proficiency bonus, you can treat a d20 roll of 9 or lower as a 10.",
        "Blindsense": "If you are able to hear, you are aware of the location of any hidden or invisible creature within 10 feet of you.",
        "Slippery Mind": "You gain proficiency in Wisdom saving throws.",

        // Sorcerer features
        "Sorcerous Origin": "Choose a source for your innate magical power: Draconic Bloodline, Wild Magic, or another origin.",
        "Font of Magic": "Tap into a deep wellspring of magic within yourself. This wellspring is represented by sorcery points.",
        "Metamagic": "Gain the ability to twist your spells to suit your needs using sorcery points.",
        "Sorcerous Restoration": "Regain expended sorcery points when you finish a short rest.",
        "Sorcery Points": "Points that can be used to fuel your metamagic abilities or create additional spell slots.",
        "Magical Guidance": "When you fail an ability check, you can spend 1 sorcery point to reroll the d20.",
        "Metamagic Options": "Choose additional metamagic options to further customize your spellcasting.",
        "Sorcerous Fortitude": "Gain proficiency in Constitution saving throws if you don't already have it.",

        // Warlock features
        "Otherworldly Patron": "Enter into a pact with an otherworldly being of your choice: the Fiend, the Archfey, or the Great Old One.",
        "Pact Magic": "Learn spells from your patron and cast them using spell slots.",
        "Eldritch Invocations": "Learn invocations that grant you magical abilities.",
        "Pact Boon": "Your patron bestows a gift upon you for your loyal service.",
        "Mystic Arcanum": "Gain the ability to cast powerful spells once per long rest without using a spell slot.",
        "Eldritch Master": "Regain all expended spell slots from your Pact Magic feature by spending 1 minute in communion with your patron.",
        "Pact Magic Slots": "Your spell slots are always cast at the highest level available to you.",
        "Invocations Known": "Learn additional eldritch invocations as you gain levels.",

        // Wizard features
        "Arcane Recovery": "Regain some of your magical energy by studying your spellbook during a short rest.",
        "Arcane Tradition": "Choose a tradition that shapes the practice of your magic: Abjuration, Conjuration, Divination, Enchantment, Evocation, Illusion, Necromancy, or Transmutation.",
        "Spell Mastery": "Achieve such mastery over certain spells that you can cast them at will.",
        "Signature Spells": "Master powerful spells and can cast them with minimal effort.",
        "Spellbook": "A book containing spells that you can prepare each day.",
        "Ritual Casting": "You can cast a wizard spell as a ritual if that spell has the ritual tag.",
        "Sculpt Spells": "When you cast an evocation spell that affects other creatures, you can choose a number of them to automatically succeed on their saving throws.",
        "Overchannel": "You can increase the power of your simpler spells, dealing maximum damage with them.",

        // Artificer features
        "Magical Tinkering": "You've learned how to invest a spark of magic into mundane objects, granting them minor magical properties.",
        "Infuse Item": "You've gained the ability to imbue mundane items with certain magical infusions.",
        "The Right Tool for the Job": "You've learned how to produce exactly the right tool for a job, creating artisan's tools with tinker's tools.",
        "Flash of Genius": "You've gained the ability to come up with solutions under pressure, adding your Intelligence modifier to ability checks and saving throws.",
        "Spell-Storing Item": "You can now store a spell in an object, allowing you or someone else to cast it later.",
        "Magic Item Adept": "You've achieved a deep understanding of how to use and make magic items.",
        "Soul of Artifice": "You've developed a mystical connection to your magic items, which can absorb damage meant for you.",

        // Blood Hunter features
        "Hunter's Bane": "You gain the ability to sense the presence of creatures within 60 feet that are not native to the material plane.",
        "Blood Maledict": "You learn to inflict curses upon your foes as you draw upon your own vitality.",
        "Crimson Rite": "You learn to invoke a rite of hemocraft that sacrifices a portion of your own vitality to empower your weapon attacks.",
        "Grim Psychometry": "You gain the ability to read the psychic imprint left on objects, learning details about their previous owners.",
        "Blood Curse Mastery": "You've mastered additional blood curses and can use them more frequently.",
        "Brand of Castigation": "You can mark a foe with a magical brand that deals additional damage and reveals their location.",
        "Sanguine Mastery": "Your command over hemocraft has reached its peak, allowing you to perform more powerful rites and curses.",

        // Gunslinger features
        "Gunsmith": "You gain proficiency with firearms and learn how to maintain and repair them.",
        "Grit": "You gain a pool of grit points based on your Wisdom modifier, which you can spend to perform special tricks.",
        "Quick Draw": "You can draw or stow a firearm as a free action.",
        "Violent Shot": "You can choose to take a penalty to your attack roll to deal additional damage with a firearm.",
        "Trickshot": "You learn special shots that can disarm, trip, or otherwise hinder your foes.",
        "Lightning Reload": "You can reload a firearm as a bonus action.",
        "Hemorrhaging Critical": "Your firearm critical hits cause the target to bleed, taking additional damage over time.",
        "Pistol Whip": "You can use your firearm as an improvised melee weapon, dealing bludgeoning damage and potentially stunning your target.",

        // Samurai features
        "Fighting Spirit": "As a bonus action, you can give yourself advantage on all weapon attack rolls until the end of the current turn.",
        "Elegant Courtier": "You gain proficiency in Wisdom saving throws and add your Wisdom modifier to your Persuasion checks.",
        "Tireless Spirit": "When you roll initiative and have no uses of Fighting Spirit remaining, you regain one use.",
        "Rapid Strike": "When you take the Attack action on your turn and have advantage on an attack roll, you can forgo the advantage to make an additional weapon attack.",
        "Strength Before Death": "When you are reduced to 0 hit points, you can use your reaction to delay falling unconscious.",
        "Unbreakable Will": "You have advantage on saving throws against being charmed or frightened.",
        "Iaijutsu": "You can make a single, incredibly fast draw attack that deals massive damage if it catches your opponent unprepared.",

        // Hexblade features
        "Hex Warrior": "You can use your Charisma modifier for attack and damage rolls with your pact weapon.",
        "Hexblade's Curse": "As a bonus action, curse a creature for 1 minute, gaining bonus damage and critical hit chance against it.",
        "Accursed Specter": "When you slay a humanoid enemy, you can cause its spirit to rise as a specter that serves you.",
        "Armor of Hexes": "Your cursed target has disadvantage on attack rolls against you.",
        "Master of Hexes": "You can move your Hexblade's Curse to a new target when the cursed target dies.",
        "Shadow Hound": "You can summon a shadowy hound to track and harass your cursed target.",
        "Eldritch Smite": "When you hit with your pact weapon, you can expend a warlock spell slot to deal additional force damage and potentially knock the target prone."
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