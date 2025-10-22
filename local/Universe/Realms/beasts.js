// Define naming
const names = {
    first: {
        name: [
            "Arne", "Astrid", "Age", "Ase", "Adel", "Adalgisa",
            "Aelfgar", "Aldred", "Alduin", "Aldwin", "Arnhild",
            "Alvar", "Ansaldo", "Ansgar", "Atenulf", "Alruna",
            "Birger", "Bjorn", "Bodil", "Bo", "Bardil",
            "Cuthwulf",
            "Erik", "Estrid", "Eadberht", "Ealdgyth",
            "Eldred", "Elgar", "Erluin", "Eardwulf",
            "Frida", "Frode", "Fulcoald",
            "Gertrude", "Gorm", "Gro", "Gudrun", "Gunhild",
            "Gandulf", "Garrett", "Goswin", "Gundulf", "Gyrd",
            "Geneva",
            "Halfdan", "Harald", "Hilda", "Helga", "Hilbert",
            "Knud", "Kare", "Keno",
            "Leif", "Liv",
            "Inga",
            "Mainard", "Maynard", "Meinhardt", "Maren",
            "Njal",
            "Odger", "Osborne", "Oslac", "Osred",
            "Pandulf", "Purchart",
            "Quendrida",
            "Roar", "Rune", "Randi", "Revna", "Rafe",
            "Richardis", "Roberta",
            "Sten", "Skarde", "Sune", "Svend", "Signe", "Sigrid",
            "Sigered", "Sigfried",
            "Troels", "Toke", "Torsten", "Trygve", "Tora",
            "Tove", "Thyra", "Thurid",
            "Ulf", "Ulfhild",
            "Wulfhelm",
            "Yrsa",
        ],
        prefix: [
            // First Part of Name
            "Aam", "Am", "Apol", "Abad", "Abez", "Abyz", "Achyl", "Adram",
            "Adrammel", "Aeshm", "Agal", "Agar", "Ahrin", "Anrin", "Akom",
            "Akum", "Amdus", "Anath", "Ankt", "Anz", "Ap", "Arch", "Ast",
            "Ancal", "Acnol", "Alb", "Alf", "Aith", "Ald",
            "Bab", "Bak", "Bal", "Baph", "Barb", "Bath", "Beel", "Belph",
            "Bael", "Bal", "Baler",
            "Camb", "Char", "Cha", "Cho", "Cim", "Cor", "Car", "Chrys", "Chrysoph",
            "Daev", "Dev", "Dag", "Dajj", "Dec", "Dem", "Drek",
            "Drac", "Drack", "Drag", "Droc", "Drock", "Drog",
            "Drakn", "Drav", "Drox", "Drakth", "Dravok",
            "Dyrn", "Dral", "Droxth", "Dov", "Drakthar",
            "Ebl", "El", "Eish", "Erl", "Em", "Emb", "Err", "Eld", "Eldr", "Eep",
            "Foc", "For", "Fur", "Furk", "Forn", "Faf", "Fin",
            "Gad", "Gaf", "Gam", "Grig", "Gus", "Gun",
            "Haag", "Hag", "Hal", "Hel", "Hin", "Han",
            "If", "Ifr", "Inc", "Ip", "Imp", "It",
            "Jin", "Jik", "Jikin",
            "Kab", "Kal", "Kar", "Kas", "Kron", "Kram", "Kil", "Kulsh", "Kumb",
            "Kaz", "Kai", "Kaid",
            "Lam", "Lat", "Leg", "Lech", "Leon", "Le", "Lem", "Lev", "Lil",
            "Lj", "Luc",
            "Mag", "Mah", "Man", "Mal", "Mar", "Mas", "Mast", "Maz", "Meph",
            "Mer", "Mol", "Munk", "Mur", "Mel", "Mer",
            "Naam", "Nab", "Nal", "Nar", "Nin",
            "On", "Orc", "Ori", "Oro", "Os", "Oka",
            "Paim", "Paz", "Pel", "Phen", "Pen", "Poc", "Pon", "Pret",
            "Prin", "Pulom",
            "Qin", "Qem", "Qel",
            "Rah", "Rak", "Ran", "Rav", "Ron", "Rev",
            "Sab", "Sal", "Sam", "Saph", "Sem", "Shed", "Stol", "Shin",
            "Saph", "Sel", "Slath", "Shur", "Syr", "Shen", "Siv", "Seth", "Synn",
            "Tan", "Ten", "Tit", "Toy", "Tuch",
            "Unc", "Ur",
            "Val", "Van", "Vap", "Vass", "Vep", "Vin", "Vis", "Vorg", "Vryth",
            "Vexx", "Vossk", "Vynth", "Vryx", "Vork", "Vyn", "Vosk", "Vyrn",
            "Wech", "Wang",
            "Xaph", "Xez", "Xyrn", "Xanv", "Xulg", "Xyph", "Xyndr",
            "Xax", "Xir", "Xolth", "Xyr", "Xyndor",
            "Yan", "Yeq", "Ylth", "Yggd", "Yrth", "Yxal", "Yvrak",
            "Ysst", "Ythra", "Yxen", "Ynvar", "Yggth",
            "Zab", "Zag", "Zah", "Zar", "Zep", "Zim",
            "Zorv", "Zynx", "Zalk", "Zryth", "Zhaan",
            "Zov", "Zyr", "Zyth", "Zulgr", "Zynvok",
            "Aurel", "Aether", "Ael", "Aev", "Aur", "Aurum", "Auryn", "Aetheri",
            "Aion", "Astr", "Aeg", "Auror", "Aevum", "Auriel", "Aurath",
            "Cael", "Celest", "Cerul", "Cyne", "Caelum", "Cyr", "Caeli", "Cor",
            "Caelest", "Cryph", "Cynar", "Caelor",
            "Elyon", "Eosph", "Etern", "Elys", "Eman", "Ethere", "Evo", "Exous",
            "Eiren", "Eldri", "Eul", "Eon", "Ephra",
            "Iolar", "Ithir", "Israf", "Irid", "Ion", "Ignis", "Ivo", "Ilios",
            "Izar", "Ithiel", "Irath", "Isht",
            "Orael", "Ori", "Oph", "Olam", "Oner", "Oth", "Ozym", "Oriel",
            "Oblat", "Oran", "Ophir", "Orael",
            "Uriel", "Uthar", "Umbri", "Ur", "Uriel", "Uran", "Unyel", "Ustr",
            "Ulth", "Umbr",
            "Ysrael", "Yphen", "Ygg", "Ynar", "Ylir", "Ythir", "Ysol", "Yph",
            "Yss", "Yner",
        ],
        suffix: [
            // Last Part of Name
            "as", "at", "ah", "an", "al", "aka", "ai", "ang", "azel", "ael",
            "aku", "am", "ali", "atos", "ac", "abia", "ap", "aki", "ard",
            "ami",
            "bub", "bul", "buth",
            "ept", "es", "em", "ep", "el", "eus", "eva", "eth",
            "iel", "im", "ias", "ius", "if", "in", "is", "io", "ion", "ies",
            "its", "ik", "iu",
            "la", "lu", "lar", "lis", "las",
            "ma", "my",
            "na",
            "on", "ou", "or", "os", "och", "oth", "ong", "ons", "osh", "ort",
            "oul", "oin",
            "ra", "rym", "rith", "rit", "run",
            "us", "ura", "uer", "uta", "une", "un", "ur",
            "ys", "yu", "ym", "ya", "yo", "yn",
            "aedr", "axes", "akai", "aug", "aire",
            "al", "anth", "ara", "ar", "ax", "axis",
            "es", "en", "edr", "eep", "ep", "eys",
            "enth", "er", "ezi", "erth", "ed",
            "gon", "gar", "gia",
            "ion", "in", "ira", "ile", "ia", "ike",
            "kai",
            "la", "lax", "lia",
            "nen", "ner", "nir", "ney",
            "on", "oon", "ol", "oth", "orn",
            "ogia",
            "rax", "rex", "ron", "rah",
            "tur", "ta",
            "ul", "ung", "urung", "uth", "ug",
            "uke",
            "xes",
            "ys", "yre", "yn",
            "zi", "zer", "za",
            "as", "at", "ah", "an", "al", "aka", "ai", "ang", "ael",
            "aku", "am", "ali", "ac", "abia", "ap", "aki", "ard",
            "ami", "aedr", "akai", "aug", "aire", "al", "anth", "ara",
            "ar", "ax", "adriel", "aion", "alim", "amiel", "aniel",
            "aphiel", "ariel", "ari", "asiel", "ath", "athiel", "azra",
            "ept", "es", "em", "ep", "el", "eus", "eva", "eth", "es", "en",
            "edr", "eep", "ep", "eys", "enth", "er", "ezi", "erth", "ed",
            "erion", "eros", "estiel", "ethel",
            "iel", "im", "ias", "ius", "if", "in", "is", "io", "ion", "ies",
            "its", "ik", "iu", "ira", "ile", "ia", "ike", "il", "ios", "ir",
            "ith", "ithiel",
            "on", "ou", "or", "os", "och", "oth", "ong", "ons", "osh", "ort",
            "oul", "oin", "oon", "ol", "orn", "ogia", "om", "oriel",
            "rael", "riel", "riel",
            "us", "ura", "uer", "uta", "une", "un", "ur", "ul", "ung",
            "urung", "uth", "ug", "uke", "uel", "uriel",
            "ys", "yu", "ym", "ya", "yo", "yn", "yre", "yth", "yon",
        ],
    },
    last: {
        prefix: [
            "Amber", "Ash", "Autumn",
            "Battle", "Bear", "Black", "Blood", "Blue", "Boulder", "Bright", "Bronze", "Burning",
            "Cinder", "Cloud", "Copper", "Crimson", "Crystal", "Curse",
            "Dark", "Dawn", "Dead", "Deep", "Demon", "Dragon", "Dread", "Dusk", "Dust",
            "Earth", "Ebon", "Elder", "Ember", "Evening",
            "Fallen", "Far", "Fern", "Fiery", "Fire", "Flame", "Flint", "Frost", "Frozen",
            "Ghost", "Giant", "Glacier", "Glimmer", "Glorious", "Gold", "Grand", "Gray", "Great", "Green", "Grim",
            "Hallowed", "Hallow", "Hard", "Hawthorn", "High", "Hollow", "Holy", "Honour", "Howling", "Hunter",
            "Ice", "Iron",
            "Jade", "Jagged",
            "Keen", "Kings",
            "Lake", "Last", "Light", "Lightning", "Lion", "Lone", "Long", "Lost",
            "Magma", "Mighty", "Mist", "Moon", "Moss", "Mountain", "Mourning",
            "Nether", "Nettle", "Night", "Noble", "North",
            "Oak", "Oaken", "Ocean", "Old", "Pale", "Phoenix", "Proud", "Pure",
            "Raging", "Rain", "Raven", "Red", "Rune", "Rust",
            "Sea", "Shadow", "Sharp", "Shattered", "Shifting", "Shining", "Silent", "Silver", "Sky", "Smoke", "Snow", "Solar", "Sorrow", "South", "Spirit", "Spring", "Star", "Steel", "Stern", "Stone", "Storm", "Summer", "Sun", "Swift",
            "Thunder", "Titan", "Tree", "True",
            "Umber", "Under",
            "Valiant", "Void",
            "War", "Whispering", "White", "Wild", "Wind", "Winter", "Wise", "Wolf", "Wood", "Wraith",
            "Yellow"
        ],
        suffix: [
            "axe", "band", "bane", "bash", "beam", "beard", "belly", "blade", "blood", "bloom", "blossom", "bone", "born", "bow", "brace", "branch", "brand", "breaker", "breath", "brew", "bridge", "brook", "brow", "burn",
            "caller", "chaser", "cleaver", "cloud", "coat", "crest", "cry", "cutter",
            "dane", "dancer", "dream", "drinker",
            "eye", "eyes",
            "fall", "fang", "feather", "field", "fire", "fist", "flame", "flare", "flaw", "fletcher", "flight", "flame", "flower", "force", "forge", "fury",
            "gaze", "grain", "grass", "guard", "grip", "grove", "guardian",
            "hair", "hall", "hammer", "hand", "hart", "hunter", "heart", "helm", "hide", "hill", "hoof", "horn", "hunter",
            "jaw", "keeper", "kin",
            "lake", "lance", "leaf", "light", "mane", "mark", "mantle", "master", "might", "moon", "mourn",
            "pelt", "pike", "pelt", "proof",
            "rage", "rain", "reaper", "rider", "ridge", "river", "root", "runner",
            "scar", "scream", "seeker", "shadow", "shard", "shield", "shout", "skin", "sky", "slayer", "snarl", "song", "spear", "spell", "spire", "spring", "stalker", "star", "steed", "step", "stone", "storm", "stride", "strike", "strider", "surge", "sworn", "sword",
            "tail", "talon", "tear", "thorn", "throat", "tide", "tooth", "tracker", "trail", "trap", "treader", "tree",
            "vein", "view", "voice",
            "walker", "ward", "water", "weaver", "whisper", "wind", "wing", "wolf", "wood", "wrath",
            "yard"
        ]
    },
    title: {
        prefix: [
            "The Great", "The Incredible", "The Impeccable",
            "The High", "The Just", "The Invincible",
            "The Noble", "The Honourable", "The Pious",
            "The Brave", "The Wrathful", "The Gallant",
            "The Sharp", "The Eccentric", "The Wise",
        ],
        suffix: [
            "Protector", "Master", "Lord", "Dragonslayer", "Butcher", "Poet",
            "Dawn", "Hawk", "Smile", "Mountain", "Champion", "Giant", "Wolf",
            "Slayer", "Heartbreaker", "Dragon", "Observer", "Orphan", "Jackal"
        ]
    },
};
function createFirstName(seed) {
    if (seed >= 0.5) {
        return names.first.name[Math.floor((seed * 1.61803398875) % 1 * names.first.name.length)];
    }
    const pref = names.first.prefix[Math.floor((seed * 2.718281828) % 1 * names.first.prefix.length)];
    const suff = names.first.suffix[Math.floor((seed * 3.14159265359) % 1 * names.first.suffix.length)];
    return pref + suff;
}
function createLastName(seed) {
    const pref = names.last.prefix[Math.floor((seed * 2.718281828) * names.last.prefix.length)];
    const suff = names.last.suffix[Math.floor((seed * 1.61803398875) % 1 * names.last.suffix.length)];
    return pref + suff;
}
function createTitle(seed) {
    if (seed < 0.8) {
        return "";
    }
    const pref = names.title.prefix[Math.floor((seed * 0.809016994375) % 1 * names.title.prefix.length)];
    const suff = names.title.suffix[Math.floor((seed * 1.61803398875) % 1 * names.title.suffix.length)];
    return pref + " " + suff;
}
// Define character info
const charInfo = {
    race: [
        "Orc", "Dwarf", "Goliath", "Warforged", "Vampire",
        "Elf", "High-Elf", "Astral-Elf", "Fairy",
        "Strig", "Dragonborn", "Githyanki", "Githzerai",
        "Aasimar", "Nephilim", "Cambion"
    ],
    class: [
        "Barbarian", "Cleric", "Druid", "Fighter",
        "Mystic", "Paladin", "Ranger", "Rogue",
        "Warlock", "Wizard", "Sorcerer", "Monk",
    ]
};
function createCharacter(seed, index) {
    const random = seed + "participant" + index;

    const firstName = createFirstName(getSeededRandom(random + "first" + index * 7.321));
    const lastName = createLastName(getSeededRandom(random + "last" + index * 13.456));
    const title = createTitle(getSeededRandom(random + "title" + index * 7.789));
    const race = charInfo.race[Math.floor(getSeededRandom(random + "race" + index * 17.123) * charInfo.race.length)];
    const charClass = charInfo.class[Math.floor(getSeededRandom(random + "class" + index * 3.33) * charInfo.class.length)];

    if (title != "") {
        console.log(`${firstName} ${lastName} (${race}, ${charClass}), ${title}`);
        return `${firstName} ${lastName} (${race}, ${charClass}), ${title}`;
    }
    else {
        console.log(`${firstName} ${lastName} (${race}, ${charClass})`);
        return `${firstName} ${lastName} (${race}, ${charClass})`;
    }
}
// Define named monsters
const monster = {
    names: [
        "Tim", "Bobert", "Jerry", "Ted", "Kevin", "Gey",
        "Sammy", "Chester",
        "Goongalar", "Goohog", "Rooboo", "Bobo", "Ditso",
        "Antsy", "Skippy", "Curly", "Dimdim",
    ],
    types: [
        "Fiend", "Giant", "Monstrosity", "Celestial", "Spirit",
        "Construct", "Undead", "Abberation", "Fey", "Elemental",
        "Dragon (Chromatic)", "Dragon (Metallic)",
        "Dragon (Red)", "Dragon (Black)", "Dragon (Blue)",
        "Dragon (Green)", "Dragon (White)",
    ],
    title: [
        "The Stinky", "The Tiny", "The Slow",
        "The Loud", "The Unsightly", "The Inconvenient",
        "The Annoying", "The Unseemly", "The Irritating",
        "The Failed Abortion", "The Fickle",
        "The Needy", "The Clumsy", "The Almost-Scary",
    ],
};
function createMonster(seed) {
    const name = monster.names[Math.floor(seed * monster.names.length)];
    const type = monster.types[Math.floor(seed * monster.types.length)];
    const title = monster.title[Math.floor(seed * monster.title.length)];
    return `${name} ${title}, ${type}`;
}
// Define hardcoded teams for team-based events
const teams = {
    silkball: [
        "Silk Spinners", "Velvet Vipers", "Satin Serpents", "Lace Lancers",
        "Taffeta Titans", "Chiffon Chargers", "Brocade Brawlers", "Damask Duelists"
    ],
    mage_tower: [
        "Arcane Archers", "Mystic Magi", "Sorcerous Swordsmen", "Enchanted Eldritch",
        "Spellbound Sentinels", "Runic Ravagers", "Ethereal Eagles", "Mystical Marauders"
    ]
};

// Define events with their configurations
const events = {
    gladiator: {
        name: "Gladiator Fight",
        minParticipants: 2,
        maxParticipants: 8,
        supportedTypes: ["FFA", "TDM", "1vM", "TvM"],
    },
    silkball: {
        name: "Silkball Tournament",
        minParticipants: 2, // Number of teams
        maxParticipants: 4, // Number of teams
        supportedTypes: ["TDM"],
    },
    mage_tower: {
        name: "Mage Tower",
        minParticipants: 2, // Number of teams
        maxParticipants: 4, // Number of teams
        supportedTypes: ["TDM"],
    },
    sunderdome: {
        name: "The Sunderdome",
        minParticipants: 4,
        maxParticipants: 16,
        supportedTypes: ["FFA", "TDM"],
    },
    beast_hunt: {
        name: "Great Beast Hunt",
        minParticipants: 2,
        maxParticipants: 8,
        supportedTypes: ["FFA", "TDM"],
    },
};

// Function to generate a deterministic random number based on date
function getSeededRandom(seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & 0xFFFFFFFF; // Ensure 32-bit integer
    }

    const x = Math.sin(hash) * 10000;
    return x - Math.floor(x);
}

// Function to select a random event and type
function selectRandomEvent() {
    // Change to 3-hour blocks instead of daily
    const now = new Date();
    const threeHourBlock = Math.floor(now.getTime() / (3 * 60 * 60 * 1000));
    const dateSeed = threeHourBlock.toString();

    // Use date to select event
    const eventKeys = Object.keys(events);
    const eventRandom = getSeededRandom(dateSeed + "event");
    const eventIndex = Math.floor(eventRandom * eventKeys.length);
    const eventKey = eventKeys[eventIndex];
    const event = events[eventKey];

    // Use date to select event type
    const typeRandom = getSeededRandom(dateSeed + "type");
    const typeIndex = Math.floor(typeRandom * event.supportedTypes.length);
    const eventType = event.supportedTypes[typeIndex];

    // Use date to select participant count
    const countRandom = getSeededRandom(dateSeed + "count");
    const participantCount = Math.floor(
        countRandom * (event.maxParticipants - event.minParticipants + 1)
    ) + event.minParticipants;

    return {
        event: event,
        eventType: eventType,
        participantCount: participantCount
    };
}

// Function to select participants based on event type
function selectParticipants(event, type, count) {
    const seed = new Date().toISOString().slice(0, 10) + "participants";

    if (type === "FFA") {
        return selectFFAParticipants(event, count, seed);
    } else if (type === "TDM") {
        return selectTDMTeams(event, count, seed);
    } else if (type === "1vM") {
        return select1vMParticipants(event, count, seed);
    } else if (type === "TvM") {
        return selectTvMParticipants(event, count, seed);
    }
}

// Free For All participant selection - uses generated names
function selectFFAParticipants(event, count, seed) {
    const participants = [];

    for (let i = 0; i < count; i++) {
        participants.push(createCharacter(seed, i));
    }

    return {
        type: "FFA",
        participants: participants
    };
}

// Team Death Match team selection
function selectTDMTeams(event, count, seed) {
    // For silkball and mage_tower, use predefined team names
    if (event.name === "Silkball Tournament" || event.name === "Mage Tower") {
        const eventKey = event.name === "Silkball Tournament" ? 'silkball' : 'mage_tower';
        const eventTeams = [...teams[eventKey]];
        const selectedTeams = [];

        // Select the required number of teams randomly
        for (let i = 0; i < count; i++) {
            if (eventTeams.length === 0) break;
            const index = Math.floor(getSeededRandom(seed + i) * eventTeams.length);
            selectedTeams.push([eventTeams[index]]); // Wrap in array for consistent structure
            eventTeams.splice(index, 1);
        }

        return {
            type: "TDM",
            teams: selectedTeams
        };
    } else {
        // For other events, generate teams with individual participants
        const generatedTeams = [];
        const teamCount = Math.max(2, Math.floor(count / 2));

        for (let i = 0; i < teamCount; i++) {
            const team = [];
            const teamSize = Math.max(2, Math.floor(getSeededRandom(seed + "teamsize" + i) * 3) + 1);

            for (let j = 0; j < teamSize; j++) {
                team.push(createCharacter(seed, i * teamSize + j));
            }
            generatedTeams.push(team);
        }

        return {
            type: "TDM",
            teams: generatedTeams
        };
    }
}

// One vs Monster(s) participant selection
function select1vMParticipants(event, count, seed) {
    // Select one participant
    const participant = createCharacter(seed, 0);

    // Generate monsters (1-3 monsters)
    const monsterCount = Math.min(Math.floor(getSeededRandom(seed + "monster") * 3) + 1, count - 1);
    const selectedMonsters = [];

    for (let i = 0; i < monsterCount; i++) {
        const monsterSeed = seed + "monster" + i;
        selectedMonsters.push(createMonster(getSeededRandom(monsterSeed)));
    }

    return {
        type: "1vM",
        participant: participant,
        monsters: selectedMonsters
    };
}

// Team vs Monster(s) participant selection
function selectTvMParticipants(event, count, seed) {
    // Generate a team of 2-4 participants
    const teamSize = Math.min(Math.floor(getSeededRandom(seed + "team") * 3) + 2, count - 1);
    const team = [];

    for (let i = 0; i < teamSize; i++) {
        team.push(createCharacter(seed, i));
    }

    // Generate monsters (2-4 monsters)
    const monsterCount = Math.min(count - teamSize, 4);
    const selectedMonsters = [];

    for (let i = 0; i < monsterCount; i++) {
        const monsterSeed = seed + "m" + i;
        selectedMonsters.push(createMonster(getSeededRandom(monsterSeed)));
    }

    return {
        type: "TvM",
        team: team,
        monsters: selectedMonsters
    };
}

// Function to generate betting odds
function generateBettingOdds(participants, seed) {
    const odds = {};
    let totalStrength = 0;

    // Assign random strengths to each participant with title influence
    participants.forEach(participant => {
        let strength = getSeededRandom(seed + participant) * 100 + 10; // 10-110 base strength

        // Check if participant has a title and boost strength if they do
        if (participant.includes(", The ")) {
            // Titles provide a significant strength boost (50-100% increase)
            const titleBoost = 1 + (getSeededRandom(seed + participant + "title") * 0.5) + 0.5;
            strength *= titleBoost;
        }

        // Additional boost for specific powerful-sounding titles
        if (participant.includes("The Great") || participant.includes("The Invincible") ||
            participant.includes("Dragonslayer") || participant.includes("Champion")) {
            strength *= 1.5; // Extra 50% boost for particularly impressive titles
        }

        odds[participant] = {
            strength: strength,
            probability: 0
        };
        totalStrength += strength;
    });

    // Calculate probabilities and payout odds
    Object.keys(odds).forEach(participant => {
        const probability = odds[participant].strength / totalStrength;
        odds[participant].probability = probability;
        // Calculate payout (inverse of probability with house edge)
        odds[participant].payout = (1 / probability) * 0.85; // 15% house edge
    });

    return odds;
}

// Function to determine winner based on odds
function determineWinner(odds, seed) {
    const participants = Object.keys(odds);
    const randomValue = Math.random();

    let cumulativeProbability = 0;
    for (const participant of participants) {
        cumulativeProbability += odds[participant].probability;
        if (randomValue <= cumulativeProbability) {
            return participant;
        }
    }
}

// Function to display the matchup
function displayMatchup() {
    const eventKeys = Object.keys(events);
    const { event, eventType, participantCount } = selectRandomEvent();
    const matchup = selectParticipants(event, eventType, participantCount);

    // Display event info
    const eventInfo = document.getElementById('event-info');
    eventInfo.innerHTML = `
                <p><strong>></strong> ${event.name} <strong>-</strong> ${getTypeDescription(eventType)}</p>
                <p>Participants: <strong>${participantCount}</strong></p>
            `;

    // Display matchup based on type
    const container = document.getElementById('matchup');
    container.innerHTML = '';

    // Prepare participants list for odds calculation
    let participantsForOdds = [];
    let participantNames = [];

    if (matchup.type === "FFA") {
        matchup.participants.forEach((participant, index) => {
            const participantElement = document.createElement('div');
            participantElement.className = 'participant';
            participantElement.innerHTML = `- <strong>${index + 1}</strong> ${participant}`;
            container.appendChild(participantElement);
            participantsForOdds.push(participant);
            participantNames.push(participant);
        });
    } else if (matchup.type === "TDM") {
        matchup.teams.forEach((team, index) => {
            const teamElement = document.createElement('div');
            teamElement.className = 'team';
            teamElement.innerHTML = `<strong>Team ${index + 1}:</strong> ${team.join(', ')}`;
            container.appendChild(teamElement);
            participantsForOdds.push(`Team ${index + 1}`);
            participantNames.push(`Team ${index + 1}: ${team.join(', ')}`);
        });
    } else if (matchup.type === "1vM") {
        const participantElement = document.createElement('div');
        participantElement.className = 'participant';
        participantElement.innerHTML = `<strong>Champion:</strong> ${matchup.participant}`;
        container.appendChild(participantElement);

        const monstersElement = document.createElement('div');
        monstersElement.className = 'monsters';
        monstersElement.innerHTML = `<strong>Monsters:</strong> ${matchup.monsters.join(', ')}`;
        container.appendChild(monstersElement);

        participantsForOdds.push(matchup.participant);
        participantsForOdds.push("Monsters");
        participantNames.push(matchup.participant);
        participantNames.push("Monsters: " + matchup.monsters.join(', '));
    } else if (matchup.type === "TvM") {
        const teamElement = document.createElement('div');
        teamElement.className = 'team';
        teamElement.innerHTML = `<strong>Team:</strong> ${matchup.team.join(', ')}`;
        container.appendChild(teamElement);

        const monstersElement = document.createElement('div');
        monstersElement.className = 'monsters';
        monstersElement.innerHTML = `<strong>Monsters:</strong> ${matchup.monsters.join(', ')}`;
        container.appendChild(monstersElement);

        participantsForOdds.push("Team");
        participantsForOdds.push("Monsters");
        participantNames.push("Team: " + matchup.team.join(', '));
        participantNames.push("Monsters: " + matchup.monsters.join(', '));
    }

    // Generate and display betting odds
    const seed = new Date().toISOString().slice(0, 10) + "odds";
    const odds = generateBettingOdds(participantsForOdds, seed);
    const winner = determineWinner(odds, seed);

    const bettingOddsContainer = document.getElementById('betting-odds');
    bettingOddsContainer.innerHTML = '';

    participantsForOdds.forEach((participant, index) => {
        const oddsElement = document.createElement('div');
        oddsElement.className = 'odds-item';
        oddsElement.innerHTML = `
                    <div>${participantNames[index]}</div>
                    <div class="odds-value">${odds[participant].payout.toFixed(2)}x</div>
                    <div>(${(odds[participant].probability * 100).toFixed(1)}%)</div>
                `;
        bettingOddsContainer.appendChild(oddsElement);
    });

    // Store winner information for reveal
    window.currentWinner = {
        name: winner,
        payout: odds[winner].payout.toFixed(2)
    };

    // Reset outcome display
    document.getElementById('outcome').style.display = 'none';
    document.getElementById('outcome').innerHTML = '';

    // Update the countdown timer
    updateCountdown();
}

// Helper function to get description for event type
function getTypeDescription(type) {
    const descriptions = {
        "FFA": "Free For All",
        "TDM": "Team Match",
        "1vM": "One vs Monster(s)",
        "TvM": "Team vs Monster(s)"
    };
    return descriptions[type] || type;
}

// Function to update countdown until next matchup (3 hours)
function updateCountdown() {
    const now = new Date();
    const nextUpdate = new Date(now);
    // Calculate next 3-hour interval
    const currentHour = now.getHours();
    const hoursToAdd = 3 - (currentHour % 3);
    nextUpdate.setHours(nextUpdate.getHours() + hoursToAdd);
    nextUpdate.setMinutes(0, 0, 0);

    const diff = nextUpdate - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('countdown').textContent =
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    displayMatchup();

    // Add event listener for reveal button
    document.getElementById('reveal-outcome').addEventListener('click', function () {
        const outcomeDiv = document.getElementById('outcome');
        outcomeDiv.innerHTML = `
                    <p><span class="winner">Winner: ${window.currentWinner.name}</span></p>
                    <p>Payout: <span class="payout">${window.currentWinner.payout}x</span> your bet</p>
                `;
        outcomeDiv.style.display = 'block';
    });

    // Update countdown every second
    setInterval(updateCountdown, 1000);
    // Update matchup every 3 hours
    setInterval(displayMatchup, 3 * 60 * 60 * 1000);
});