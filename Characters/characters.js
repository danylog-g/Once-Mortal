// Character Database
const CHARACTER_DB = [
    /* 
    {
        name: "XXX", loc: "XXX", faction: "XXX", affiliation: "XXX", race: "XXX", subrace: "XXX", status: "XXX",
        desc: "XXXXXXXXXXXXXXXXX"
    },
    */
   {
        name: "Evogas Llamoak", loc: "Feywild", faction: "Neutral", affiliation: "Curious Wanderers", race: "Wild God", subrace: "Elf", status: "Inactive",
        desc: "An Elf who attained the status of Godhood through exploring, studying, and learning about the Realms. "+
        "Centuries ago, there was not a soul who did not know His name. Now, after retirement, His name is only known through books."
    },
    {
        name: "Solara", loc: "Divine Realm", faction: "The Order", affiliation: "The Order", race: "Elder God", subrace: "None", status: "Active",
        desc: "An Elder God who founded The Order. She is known as the "+'"Goddess of the Sun." '+
        "Solara often takes the form of a Sun High-Elf."
    },
    {
        name: "Clara", loc: "Divine Realm", faction: "The Order", affiliation: "The Order", race: "Natural God", subrace: "None", status: "Active",
        desc: "A Natural God who is known as the "+'"Goddess of Light." '+
        "She is a warrior Goddess and is always depicted as a Moon High-Elf with a gold and silver greatsword."
    },
    {
        name: "Thalorin", loc: "Divine Realm", faction: "The Order", affiliation: "The Order", race: "Natural God", subrace: "None", status: "Active",
        desc: "A Natural God who is known as the "+'"God of Justice." '+
        "He is known to use the form of an old "+'"Silver Fox"'+" Human."
    },
    {
        name: "Aerion", loc: "Divine Realm", faction: "The Order", affiliation: "The Order", race: "Natural God", subrace: "None", status: "Active",
        desc: "A Natural God who is known as the "+'"God of Honour." '+
        "Those who pray to Him, often pray to Clara as well. He is popularly depicted as a chivalrous and handsome Human."
    },
    {
        name: "Elandra", loc: "Divine Realm", faction: "The Order", affiliation: "The Order", race: "Natural God", subrace: "None", status: "Active",
        desc: "A Natural God who is known as the "+'"Goddess of Truth." '+
        "She acts a jury, or witness when dealing with the judgement of souls. She is never depicted, except through writing and symbols."
    },
    {
        name: "Miriel", loc: "Divine Realm", faction: "The Order", affiliation: "The Order", race: "Natural God", subrace: "None", status: "Active",
        desc: "A Natural God who is known as the "+'"God of Discipline." '+
        "He is the main proponent of living a risk-free lifestyle, and focusing on being a good person instead of saving the world."+
        " He is depicted as a tall, muscular, and bald Human."
    },
    {
        name: "Lyris", loc: "Divine Realm", faction: "Blessed Ring", affiliation: "Blessed Ring", race: "Elder God", subrace: "None", status: "Active",
        desc: "An Elder God who founded The Blessed Ring. She is known as the "+'"Goddess of Destiny." '+
        "Lyris often takes the form of a solemn Astral Elf, She is commonly depicted has having 3 eyes, and 4 arms."
    },
    {
        name: "Nevorn", loc: "Divine Realm", faction: "Blessed Ring", affiliation: "Blessed Ring", race: "Elder God", subrace: "None", status: "Active",
        desc: "An Elder God who is considered to be one of the most powerful Gods. He is known as the "+'"God of Luck." '+
        "Nevorn is depicted as a Cambion (Half-Demon). He is widely prayed to, and all concepts of luck are attributed to Him."
    },
    {
        name: "Lyssia", loc: "Divine Realm", faction: "Blessed Ring", affiliation: "Blessed Ring", race: "Natural God", subrace: "None", status: "Active",
        desc: "She is known as the "+'"Goddess of Nature." '+
        "Lyssia is known to take a myriad of forms. The most common form is that of a frightening Treant, with branches sprawling from their body."
    },
    {
        name: "Azael", loc: "Divine Realm", faction: "Blessed Ring", affiliation: "Blessed Ring", race: "Natural God", subrace: "None", status: "Active",
        desc: "He is known as the "+'"God of Peace." '+
        "He is most known for negotiating peace treaties which He violently enforces. He takes the form of a Nephilim (Half-Angel)."
    },
    {
        name: "Xornoren", loc: "Unknown", faction: "Winter's Embrace", affiliation: "Xornoren's Followers", race: "Wild God", subrace: "Titan", status: "Active",
        desc: "A recently born Wild God. They are the only God to ever be called "+'"Evil" '+
        "The first thing They did is create a fifth season on Garna, a much colder winter. "+
        "Although Xornoren is the youngest God, Their followers are spread across the Realms, causing all sorts of chaos."
    },
    {
        name: "Godwyn", loc: "Divine Realm", faction: "Duskborne", affiliation: "Cult of Death", race: "Natural God", subrace: "None", status: "Active",
        desc: "A Natural God who is known as the "+'"God of Death." '+
        "Godwyn observes the Realms beneath the 3rd and solidifies the Divine Law of Death; by killnig mortals who near ascension to Immortality. "+
        "He is depicted as being able to suck the sould out of mortals by opening up His face."
    },
    {
        name: "Zalgor", loc: "Astral Sea", faction: "Duskborne", affiliation: "Duskborne", race: "Wild God", subrace: "Giant", status: "Active",
        desc: "A Wild God who is known as the "+'"God of Brutal War." '+
        "He creates and enacts the most cruel, sadistic, and brutal tactics on the battlefields. Tormenting His enemies before killing them."
    },
    {
        name: "Faela", loc: "Garna", faction: "Duskborne", affiliation: "Cult of Cure", race: "Natural God", subrace: "None", status: "Active",
        desc: "A Natural God who is known as the "+'"Goddess of Plague." '+
        "She is only worshipped by a large cult. This cult cures all illnesses which Faela did not create, then create new weaponized plagues as offerings for Her. "+
        "She is depcited as looking like a witch doctor, except its not a mask, but flesh."
    },
    {
        name: "Irol", loc: "Divine Realm", faction: "Duskborne", affiliation: "Duskborne", race: "Elder God", subrace: "None", status: "Inactive",
        desc: "An Elder God who is known as the "+'"God of Endings." '+
        "Nearly nothing is known about Irol. They are thought to be the only God at the end of all time."
    },
    {
        name: "Urnogh", loc: "Kyofu", faction: "Duskborne", affiliation: "Duskborne", race: "Natural God", subrace: "None", status: "Active",
        desc: "A Natural God who is known as the "+'"God of Shadows." '+
        "Urnogh is unlike many Gods. He cares for his followers, often giving them advice, and helping with problems they encounter."
    },
    {
        name: "Oterum", loc: "Felled Realm", faction: "Duskborne", affiliation: "Felled Realm", race: "Wild God", subrace: "Mindflayer", status: "Inactive",
        desc: "A Wild God who is known as the "+'"God of the Insane." '+
        "The sole ruler of the Seventh Realm, the Realm whose name has been lost, the Felled Realm."
    },
    {
        name: "Seraxum", loc: "Divine Realm", faction: "Duskborne", affiliation: "Duskborne", race: "Natural God", subrace: "None", status: "Active",
        desc: "A Natural God who is known as the "+'"God of Revenge." '+
        "There are no depictions of Seraxum. He is known only because He gives nearly everyone blessings, as long as they wish to seek revenge for anything."
    },
    {
        name: "Ilfandi", loc: "Divine Realm", faction: "Curseborne", affiliation: "Curseborne", race: "Elder God", subrace: "None", status: "Active",
        desc: "An Elder God who is known as the "+'"God of Curses." '+
        "He founded the Curseborne pantheon, created curses, created necromancy, and is the only known entity to have killed a Natural God. "+
        "Depicted in many different forms, all of them abominations."
    },
    {
        name: "Erevos", loc: "Divine Realm", faction: "Curseborne", affiliation: "Curseborne", race: "Elder God", subrace: "None", status: "Active",
        desc: "An Elder God who is known as the "+'"God of Secrets." '+
        "Known for professionalism, and the abilities of His followers."+
        "Depicted as a sentient cloak with 5 sets of silver runic engravings."
    },
    {
        name: "Sonyia", loc: "Realm of Beasts", faction: "Curseborne", affiliation: "Curseborne", race: "Elder God", subrace: "None", status: "Active",
        desc: "An Elder God who is known as the "+'"Goddess of Souls." '+
        "Nothing is known about Her from before She constructed a stronghold in the Third Realm, where She hosts events for all the Realms to watch. "+
        "Depicted in many different forms. The most common depiction portrays Her as being a tall spindly creature made of black smoke. "+
        "The smoke forms sharp, jagged looking hair. Her eyes are such a fair shade of white, that they emit light themselves."
    },
    {
        name: "Bahgyel", loc: "Astral Sea", faction: "Curseborne", affiliation: "Curseborne", race: "Natural God", subrace: "None", status: "Active",
        desc: "A Natural God who is known as the "+'"Goddess of Deep Sea." '+
        "She is young, but extremely popular in the Astral Sea. She loves creating horrific and monstrous creatures for the sailors to encounter and fight. "+
        "Depicted in many different forms, all of them different, but cute, sea monsters."
    },
    {
        name: "Lerranmoraxitro", loc: "Aerialis", faction: "Curseborne", affiliation: "Curseborne", race: "Elder God", subrace: "None", status: "Active",
        desc: "An Elder God who is known as the "+'"God of Freedom." '+
        "He once ruled the Fourth and Fifth Realms, but quit, and allowed the populous complete freedom from His rule."+
        "He is depicted as the sky itself, and thought to be the creator of Dragons and all other avian creatures. "+
        "His freedom inspired Aurum to explore the Realms. Lerranmoraxitro now lounges inside of a temple in Aerialis."
    },
    {
        name: "Jolly Roger", loc: "Astral Sea", faction: "VPF", affiliation: "Tortuga", race: "Lich", subrace: "Overlord", status: "Inactive",
        desc: "The first pirate to sail the Astral Sea. He was executed by firing squad in the Empire of Shaire for inciting a rebellion. " +
            "He resurrected as a Lich afterwards, and formed a faction of like-minded rebels to oppose the Empire of Shaire's expansion across the endless sea. " +
            "He has since retired from piracy and is focused on constructing a nation strong enough to oppose the Empire of Shaire."
    },
    {
        name: "Edison Learn", loc: "Astral Sea", faction: "Neutral", affiliation: "Grayhair Pirates", race: "Githyanki", subrace: "Ancient", status: "Active",
        desc: "One of the first pirates to sail the Astral Sea. He sailed underneath the flag of " + '"Jolly Roger"' + " before Roger's retirement. " +
            "After Roger retired from Piracy and created the Various Pirate Factions, Edison Learn refused to join. " +
            "Edison decided to be neutral, which gave him the freedom to raid, pillage, and endlessly sail the Sea as long as he would like, and in any way he would like."
    },
    {
        name: "Henderson Always", loc: "Astral Sea", faction: "VPF", affiliation: "Always Pirates", race: "Elf", subrace: "Astral-Elf", status: "Active",
        desc: "A daredevil who loves the feeling of adrenaline coursing through their veins. " +
            "A relatively young pirate who is hailed as the " + '"Ideal Pirate" or "Pirate King" ' +
            "He is best known for stealing 115 million gold coins from a Wild God who pledged their support to the Empire."
    },
    {
        name: "Samuel Bellamy", loc: "Astral Sea", faction: "VPF", affiliation: "White Sam's Men", race: "Elf", subrace: "High-Elf, Sun", status: "Active",
        desc: "A timid High-Elf scholar from the Feywild who fell in love with Piracy. " +
            "Since His start, He became a commodore of the largest, and wealthiest pirate fleet. " +
            "He is best known for freedom fighting operations on the outskirts of the Empire of the Shaire."
    },
    {
        name: "Sylvar Neprad", loc: "Astral Sea", faction: "Neo-Neprad", affiliation: "Neo-Neprad", race: "Wild God", subrace: "High-Elf, Moon", status: "Active",
        desc: "The theocratic leader of Neo-Neprad. She is not the founder of the city, " +
            "but an outsider who genuinely wishes to help the people of Neo-Neprad."
    },
    {
        name: "Alsandir Shogo", loc: "Endless City", faction: "Trapped", affiliation: "Mandalin", race: "Dwarf", subrace: "Mountain", status: "Active",
        desc: "A brutal killer who rules over five clock towers in the Endless City. He is a tyrant who believes only in killing the enemy. " +
            "Most of his loyal followers turn down the opportunity to leave the Endless City, simply because of how good their life is."
    },
    {
        name: "Viggo Karling", loc: "Endless City", faction: "Trapped", affiliation: "Karling", race: "Human", subrace: "None", status: "Active",
        desc: "A powerful ruler inside the Endless City. He considers himself to be a king, controlling six clock towers, and lording over a sizeable chunk of territory. " +
            "He believes in feudalism, has nobles which manage his territory, knights who command soldiers, and peasants who do the undesireable jobs."
    },
    {
        name: "Gabriel Capulet", loc: "Endless City", faction: "Trapped", affiliation: "Chiraq", race: "Nephilim", subrace: "None", status: "Active",
        desc: "A Half-Angel who believes the Endless City is the corpse of a deceased God. " +
            "He believes that with enough prayer towards the City, or prayer directed towards the Stalkers, they can get free."
    }
];

// Class mapping configuration
const CLASS_MAP = {
    faction: {
        "VPF": "faction-vpf",
        "Neo-Neprad": "faction-neprad",
        "Shaire": "faction-shaire",
        "Trapped": "faction-trapped",
        "Neutral": "faction-neutral",
        "The Order": "faction-order",
        "Blessed Ring": "faction-blessed-ring",
        "Winter's Embrace": "faction-xornoren",
        "Duskborne": "faction-duskborne",
    },
    affiliation: {
        "Curious Wanderers": "aff-curious-wanderers",
        "Grayhair Pirates": "aff-grayhair",
        "Always Pirates": "aff-always",
        "White Sam's Men": "aff-white-sam",
        "Neo-Neprad": "aff-neprad",
        "Cult of Death": 'aff-cod',
    },
    location: {
        "Garna": "loc-garna",
        "Jotunheim": "loc-jotunheim",
        "Endless City": "loc-city",
        "Felled Realm": "loc-felled",
        "Feywild": "loc-feywild",
        "Aerialis": "loc-aerialis",
        "Kyofu": "loc-kyofu",
        "Realm of Beasts": "loc-rob",
        "Astral Sea": "loc-sea",
        "Divine Realm": "loc-divine"
    },
    race: {
        "Wild God": "race-wg",
        "Natural God": "race-ng",
        "Elder God": "race-eg",
    }
};

// Get DOM Elements
const searchInput = document.getElementById('search');
const locationFilter = document.getElementById('location');
const factionFilter = document.getElementById('faction');
const affiliationFilter = document.getElementById('affiliation');
const raceFilter = document.getElementById('race');
const statusFilter = document.getElementById('status');
const sortSelect = document.getElementById('sort');
const resetBtn = document.getElementById('reset');
const characterList = document.getElementById('character-list');
const resultsCount = document.getElementById('results-count');
const tableHeaders = document.querySelectorAll('th[data-sort]');

// Modal elements
const modal = document.getElementById('character-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalName = document.getElementById('modal-character-name');
const modalLocation = document.getElementById('modal-location');
const modalFaction = document.getElementById('modal-faction');
const modalAffiliation = document.getElementById('modal-affiliation');
const modalRace = document.getElementById('modal-race');
const modalSubRace = document.getElementById('modal-subRace');
const modalStatus = document.getElementById('modal-status');
const modalDescription = document.getElementById('modal-description');

// Initial render
resetFilters();

// Event Listeners
searchInput.addEventListener('input', filterCharacters);
locationFilter.addEventListener('change', filterCharacters);
factionFilter.addEventListener('change', filterCharacters);
affiliationFilter.addEventListener('change', filterCharacters);
raceFilter.addEventListener('change', filterCharacters);
statusFilter.addEventListener('change', filterCharacters);
sortSelect.addEventListener('change', filterCharacters);
resetBtn.addEventListener('click', resetFilters);

// Close modal when clicking outside content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with button
closeModalBtn.addEventListener('click', closeModal);

tableHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const sortField = header.getAttribute('data-sort');
        sortCharacters(sortField);
    });
});

// Filter and sort characters
function filterCharacters() {
    const searchTerm = searchInput.value.toLowerCase();
    const locationValue = locationFilter.value;
    const factionValue = factionFilter.value;
    const affiliationValue = affiliationFilter.value;
    const raceValue = raceFilter.value;
    const statusValue = statusFilter.value;
    const sortValue = sortSelect.value;

    let filtered = CHARACTER_DB.filter(char => {
        const matchesSearch =
            char.name.toLowerCase().includes(searchTerm) ||
            (char.race && char.race.toLowerCase().includes(searchTerm)) ||
            (char.affiliation && char.affiliation.toLowerCase().includes(searchTerm)) ||
            (char.faction && char.faction.toLowerCase().includes(searchTerm)) ||
            (char.status && char.status.toLowerCase().includes(searchTerm)) ||
            (char.loc && char.loc.toLowerCase().includes(searchTerm)) ||
            (char.subrace && char.subrace.toLowerCase().includes(searchTerm));

        const matchesLocation = locationValue ? char.loc === locationValue : true;
        const matchesFaction = factionValue ? char.faction === factionValue : true;
        const matchesAffiliation = affiliationValue ? char.affiliation === affiliationValue : true;
        const matchesRace = raceValue ? char.race === raceValue : true;
        const matchesStatus = statusValue ? char.status === statusValue : true;

        return matchesSearch && matchesLocation && matchesFaction && matchesAffiliation && matchesRace && matchesStatus;
    });

    // Apply sorting
    sortCharactersFromValue(filtered, sortValue);

    renderCharacters(filtered);
}

// Sort characters based on sort value
function sortCharactersFromValue(chars, sortValue) {
    const [field, direction] = sortValue.split('-');

    chars.sort((a, b) => {
        let valA, valB;

        if (field === 'name') {
            valA = a.name;
            valB = b.name;
        } else if (field === 'faction') {
            valA = a.faction;
            valB = b.faction;
        } else if (field === 'affiliation') {
            valA = a.affiliation || '';
            valB = b.affiliation || '';
        } else if (field === 'location') {
            valA = a.loc;
            valB = b.loc;
        } else {
            return 0;
        }

        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        return direction === 'asc'
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
    });
}

// Sort characters based on header click
function sortCharacters(field) {
    // Get current sort state
    let currentSort = sortSelect.value;
    let [currentField, currentDirection] = currentSort.split('-');

    // Determine new sort direction
    let newDirection = 'asc';
    if (currentField === field && currentDirection === 'asc') {
        newDirection = 'desc';
    }

    // Update sort select
    sortSelect.value = `${field}-${newDirection}`;

    // Apply sorting
    filterCharacters();
}

// Render characters to the table
function renderCharacters(chars) {
    characterList.innerHTML = '';

    if (chars.length === 0) {
        characterList.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 30px;">No characters match your filters</td></tr>';
        resultsCount.textContent = '0';
        return;
    }

    chars.forEach(char => {
        const row = document.createElement('tr');

        // Get classes using centralized mapping
        const factionClass = CLASS_MAP.faction[char.faction] || 'faction-neutral';
        const affiliationClass = CLASS_MAP.affiliation[char.affiliation] || factionClass;
        const locationClass = CLASS_MAP.location[char.loc] || 'loc-neutral';
        const raceClass = CLASS_MAP.race[char.race] || 'race-neutral';

        // terrible subrace fix
        if (char.subrace === "None") {
            row.innerHTML = `
                    <td>${char.name}</td>
                    <td><span class="${factionClass}">${char.faction}</span></td>
                    <td><span class="${affiliationClass}">${char.affiliation || 'None'}</span></td>
                    <td><span class="${raceClass}">${char.race}</span></td>
                    <td><span class="${locationClass}">${char.loc || "Any / All"}</span></td>
                    <td>${char.status}</td>
                `;
        } else {
            row.innerHTML = `
                    <td>${char.name}</td>
                    <td><span class="${factionClass}">${char.faction}</span></td>
                    <td><span class="${affiliationClass}">${char.affiliation || 'None'}</span></td>
                    <td><span class="${raceClass}">${char.race}</span>${char.subrace ? ` (${char.subrace})` : ''}</td>
                    <td><span class="${locationClass}">${char.loc || "Any / All"}</span></td>
                    <td>${char.status}</td>
                `;
        }

        // Add click event to show character details
        row.addEventListener('click', () => {
            showCharacterDetails(char);
        });

        characterList.appendChild(row);
    });

    resultsCount.textContent = chars.length;
}

// Show character details in modal
function showCharacterDetails(character) {
    modalName.textContent = character.name;
    modalLocation.textContent = character.loc;
    modalFaction.textContent = character.faction;
    modalAffiliation.textContent = character.affiliation;
    modalRace.textContent = character.race;
    modalSubRace.textContent = character.subrace;
    modalStatus.textContent = character.status;
    modalDescription.textContent = character.desc || 'No description available.';

    modal.style.display = 'flex';
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
}

// Reset filters
function resetFilters() {
    searchInput.value = '';
    locationFilter.value = '';
    factionFilter.value = '';
    affiliationFilter.value = '';
    raceFilter.value = '';
    statusFilter.value = '';
    sortSelect.value = 'name-asc';

    filterCharacters();
}