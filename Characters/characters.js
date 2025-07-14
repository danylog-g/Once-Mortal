// Character Database
const CHARACTER_DB = [
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
        name: "Henderson Always", loc: "Astral Sea", faction: "VPF", affiliation: "Always Pirates", race: "Elf", subrace: "Astral", status: "Active",
        desc: "A daredevil who loves the feeling of adrenaline coursing through their veins. " +
            "A relatively young pirate who is hailed as the " + '"Ideal Pirate" or "Pirate King" ' +
            "He is best known for stealing 115 million gold coins from a Wild God who pledged their support to the Empire."
    },
    {
        name: "Samuel Bellamy", loc: "Astral Sea", faction: "VPF", affiliation: "White Sam's Men", race: "Elf", subrace: "High, Sun", status: "Active",
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
            "He believes that with enough prayer towards the City, or prayer directed towards the Stalkers."
    }
];

// Class mapping configuration
const CLASS_MAP = {
    faction: {
        "VPF": "faction-vpf",
        "Neo-Neprad": "faction-neprad",
        "Shaire": "faction-shaire",
        "Trapped": "faction-trapped",
        "Neutral": "faction-neutral"
    },
    affiliation: {
        "Grayhair Pirates": "affiliation-grayhair",
        "Always Pirates": "affiliation-always",
        "White Sam's Men": "affiliation-white_sam",
        "Neo-Neprad": "affiliation-neprad",
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
renderCharacters(CHARACTER_DB);

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

        row.innerHTML = `
                    <td>${char.name}</td>
                    <td><span class="${factionClass}">${char.faction}</span></td>
                    <td><span class="${affiliationClass}">${char.affiliation || 'None'}</span></td>
                    <td>${char.race}${char.subrace ? ` (${char.subrace})` : ''}</td>
                    <td><span class="${locationClass}">${char.loc || "Any / All"}</span></td>
                    <td>${char.status}</td>
                `;

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
    modalAffiliation.textContent = character.affiliation || 'None';
    modalRace.textContent = character.race;
    modalSubRace.textContent = character.subrace || 'None';
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