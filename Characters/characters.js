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
        name: "Lerranmoraxitro", loc: "Aerialis", faction: "Curseborne", affiliation: "Curseborne", race: "Elder God", subrace: "None", status: "Inactive",
        desc: "An Elder God who is known as the "+'"God of Freedom." '+
        "He once ruled the Fourth and Fifth Realms, but quit, and allowed the populous complete freedom from His rule."+
        "He is depicted as the sky itself, and thought to be the creator of Dragons and all other avian creatures. "+
        "His freedom inspired Aurum to explore the Realms. Lerranmoraxitro now lounges inside of a temple in Aerialis."
    },
    {
        name: "Lucifer", loc: "Kyofu", faction: "The Council", affiliation: "The Council", race: "Devil", subrace: "Lord", status: "Active",
        desc: "An extremely powerful Devil Lord, who reached the rank of a Lord before maturity. "+
        "After founding The Council with his twin sister, Beelzebub, they pose one of the greatest threats to the Divine Realm."
    },
    {
        name: "Be'llelzebub", loc: "Endless City", faction: "The Council", affiliation: "The Council", race: "Devil", subrace: "Lord", status: "Active",
        desc: "The most powerful member of The Council. She can become a Wild God, but chooses not to. As becoming a God would put a target on her."+
        "After founding The Council with her twin brother, Lucifer, she left to enjoy the luxuries of The Endless City."
    },
    {
        name: "Eleth", loc: "Divine Realm", faction: "The Council", affiliation: "The Council", race: "Angel", subrace: "Archangel", status: "Active",
        desc: "She is one of the strongest angels in the Divine Realm. She is near the qualifications to become a Wild God."
    },
    {
        name: "Octo", loc: "Felled Realm", faction: "The Council", affiliation: "The Council", race: "Lich", subrace: "Elder", status: "Active",
        desc: "A Lich who believes that Oterum is unfit for ruling over the Felled Realm. "+
        "After joining the council, he began a war to dethrone Oterum."
    },
    {
        name: "Phobos", loc: "Kyofu", faction: "The Council", affiliation: "The Council", race: "Devil", subrace: "Archdevil", status: "Active",
        desc: "A near omniscient mage. He manages all of The Councils interests."
    },
    {
        name: "Aurem Regem", loc: "Garna", faction: "None", affiliation: "None", race: "Wild God", subrace: "Ancient Gold Dragon", status: "Deceased",
        desc: "An Ancient Dragon, Older than some gods. "+
        "After Lerranmoraxitro decided to free everything which He ruled, Aurem decided to use the freedom He was granted to explore, learn, and experience everything. "+
        "In His final years, He would create elaborate and complex puzzles for Himself to solve, before wiping His memories and enjoy the experience of learning all over again."
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
        name: "Gabriel Capulet", loc: "Endless City", faction: "Trapped", affiliation: "Chiraq", race: "Nephilim", subrace: "None", status: "Deceased",
        desc: "A Half-Angel who believes the Endless City is the corpse of a deceased God. " +
            "He believes that with enough prayer towards the City, or prayer directed towards the Stalkers, they can get free."
    },
    {
        name:"Saam Husain", loc:"Astral Sea", faction:"Neo-Neprad", affiliation:"Voices", race:"Human", status:"Active",
        desc: "A Voice elected with a high approval rating. He is an incredibly proud nationalist. He spreads a lot of propaganda against the other Realms and Gods."
    },
    {
        name:"James Stellan", loc:"Astral Sea", faction:"Neo-Neprad", affiliation:"Lantern", race:"Human", status:"Active",
        desc: "A Lantern chosen by Sylvar for his revolutionary ideas about job creation and society. He assists Saam with his research on the Realms for propaganda."
    },
    {
        name:"Adolphous Gitler", loc:"Astral Sea", faction:"Neo-Neprad", affiliation:"Voices", race:"Human", status:"Active",
        desc: "An incredibly proud nationalist with a high approval rating. He is the main proponent for a Neo-Neprad first, who cares about anyone else, mentality."
    },
    {
        name:"Usamu Ben Hlhaden", loc:"Astral Sea", faction:"Neo-Neprad", affiliation:"Voices", race:"Human", status:"Active",
        desc: "An incredibly religious person who, despite being a Voice, supports the majority of Lantern decisions."
    },
    {
        name:"Donnovan Steelarm", loc:"Astral Sea", faction:"Neo-Neprad", affiliation:"Lantern", race:"Human", status:"Active",
        desc: "A Lantern chosen by Sylvar, who was selected for his brilliant military strategy."
    },
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
        "Curseborne": "faction-curseborne",
        "The Council": "faction-council",
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
        "Titan": "race-titan",
    },
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
    bModalContent.style.backgroundImage = 'none';
    beastModal.style.display = 'none';
}

// Initialize dynamic character stuff
function InitFilters() {
    // Get all unique values from character data
    const factions = [...new Set(characters.map(char => char.faction))];
    const affiliations = [...new Set(characters.map(char => char.affiliation))];
    const races = [...new Set(characters.map(char => char.race))];
    const statuses = [...new Set(characters.map(char => char.status))];

    // Populate faction filter
    factions.forEach(faction => {
        const option = document.createElement('option');
        option.value = faction;
        option.textContent = faction;
        factionFilter.appendChild(option);
    });

    // Populate affiliation filter
    affiliations.forEach(affiliation => {
        const option = document.createElement('option');
        option.value = affiliation;
        option.textContent = affiliation === "None" ? "No Affiliation" : affiliation;
        affiliationFilter.appendChild(option);
    });

    // Populate race filter
    races.forEach(race => {
        const option = document.createElement('option');
        option.value = race;
        option.textContent = race;
        raceFilter.appendChild(option);
    });

    // Populate status filter
    statuses.forEach(status => {
        const option = document.createElement('option');
        option.value = status;
        option.textContent = status;
        statusFilter.appendChild(option);
    });
}

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

// Reset filters
function resetFilters() {
    searchInput.value = '';
    locationFilter.value = '';
    factionFilter.value = '';
    affiliationFilter.value = '';
    raceFilter.value = '';
    statusFilter.value = '';
    sortSelect.value = 'name-asc';

    InitFilters();
    filterCharacters();
}

const BESTIARY_DB = [
    { name: "Stalkers", type: "Unknown", subrace: null, loc: "Endless City", status: "Active", img: "img/stalker.webp",
        desc: "An unknown creature native, and isolated to the Endless City. Nothing is known about this creature. The image provided is speculation, on what the stalkers might look like."
    },
    { name: "Tarrasque", type: "Titan", subrace: "Monstrosity", loc: "Astral Sea", status: "Active", img: "img/tarrasque.webp",
        desc: "Among the most devastating creatures in existence, the tarrasque is an engine of catastrophe and a ruiner of nations. A terror of massive size and overwhelming might, this primeval destroyer survives from the earliest epochs of the Material Plane, when it served as a weapon of immortal forces. Since then, the tarrasque has slumbered in secret, rising every few ages to usher in eras of destruction."
    },
    { name: "Zetalpa", type: "Titan", subrace: "Dinosaur", loc: "Realm of Beasts", status: "Active", img: "img/zetalpa.webp",
        desc: "A gargantuan Dinosaur Titan, shaped like a Pterodactyl, who rules the majority of the skies of the Third Realm."
    },
    { name: "Zacama", type: "Titan", subrace: "Dinosaur", loc: "Realm of Beasts", status: "Active", img: "img/zacama.webp",
        desc: "A gargantuan Three-Headed Dinosaur Titan, shaped like a T-Rex, it rules the outsides of the Stronghold that Soniya rules."
    },
    { name: "Tetzimoc", type: "Titan", subrace: "Dinosaur", loc: "Realm of Beasts", status: "Active", img: "img/tetzimoc.webp",
        desc: "A gargantuan Dinosaur Titan, shaped like an Ankylosaurus, it picks fights with other beasts and Titans."
    },
    { name: "Nezahal", type: "Titan", subrace: "Dinosaur", loc: "Realm of Beasts", status: "Active", img: "img/nezahal.webp",
        desc: "A gargantuan Dinosaur Titan, shaped like a Mosasaur, it rules the Great Ocean in the Realm of Beasts."
    },
    { name: "Ghalta", type: "Titan", subrace: "Dinosaur", loc: "Realm of Beasts", status: "Active", img: "img/ghalta.webp",
        desc: "A gargantuan Dinosaur Titan, shaped like a T-Rex, it picks fights with other beasts and Titans."
    },
    { name: "Etali", type: "Titan", subrace: "Dinosaur", loc: "Realm of Beasts", status: "Active", img: "img/etali.webp",
        desc: "A gargantuan Dinosaur Titan, shaped like a Spinosaurus, it rules over a large jungle and uses electricity to hunt prey."
    },
    { name: "Stronmaus", type: "Titan", subrace: "Giant", loc: "Jotunheim", status: "Active", img: "img/stronmaus.webp",
        desc: "Stronmaus often slumbers high in the sky or deep in the ocean, where the tumult caused by the scion's restless sleep has little effect on the world. If it drifts too near the ground or the ocean surface, it causes mighty storms or fierce maelstroms."
    },
    { name: "Tromokratis", type: "Titan", subrace: "Monstrosity", loc: "Realm of Beasts", status: "Active", img: "img/tromokratis.webp",
        desc: "Most krakens live in the oceans or seas, Tromokratis fled the sea due to the Nezahal. It now lives on the coastlines, attacking small towns and villages."
    },
    { name: "Memnor", type: "Titan", subrace: "Giant", loc: "Jotunheim", status: "Active", img: "img/memnor.webp",
        desc: "Memnor appears as a dense, slowly drifting tower of clouds that never dissipates. Often, this cloud lingers over a remote valley, creating a constantly overcast sky."
    },
    { name: "Surtur", type: "Titan", subrace: "Giant", loc: "Jotunheim", status: "Active", img: "img/surtur.webp",
        desc: "Surtur slumbering at the peak of a volcano causes an unending plume of smoke to rise, sometimes lit from below by fiery bursts of lava. As the scion dreams of battle, the volcano rumbles and spews molten rage."
    },
    { name: "Colossus", type: "Titan", subrace: "Construct", loc: "Any / All", status: "Active", img: "img/colossus.webp",
        desc: "Colossi are massive constructs, mostly built on Jotunheim and Garna. These titans are mostly used in the Realm of Beasts, to combat the natural Titans."
    },
    { name: "Thrym", type: "Titan", subrace: "Giant", loc: "Jotunheim", status: "Active", img: "img/thrym.webp",
        desc: "Thrym encased in its cradle is functionally identical to a glacier or iceberg, nestled in an alpine valley or drifting in a polar sea. In its wintry seclusion, the scion dreams of battle and glory."
    },
    { name: "Ulamog", type: "Titan", subrace: "Celestial", loc: "Realm of Beasts", status: "Active", img: "img/ulamog.webp",
        desc: "A huge humanoid celestial. It has the body of a skinless human, with a featureless skull. It's arms are split at the elbows, giving it 4 forearms and 4 hands. It's feet are a bunch of tentacles."
    },
    { name: "Skoraeus", type: "Titan", subrace: "Giant", loc: "Jotunheim", status: "Active", img: "img/skoraeus.webp",
        desc: "Skoraeus typically slumbers deep in the heart of a towering mountain, almost becoming one with the earth. While the scion dreams, the mountain's minerals are transformed into fine carving stones and brilliant gems."
    },
    { name: "Kraken", type: "Titan", subrace: "Monstrosity", loc: "Astral Sea", status: "Active", img: "img/kraken.webp",
        desc: "Is a kraken, made by Bahgyel."
    },
    { name: "Empyrean", type: "Titan", subrace: "Celestial", loc: "Astral Sea", status: "Active", img: "img/empyrean.webp",
        desc: "Empyreans are idealized, human-shaped beings of godly power. They are created from Primal forces, both Celestial and Infernal."
    },
    { name: "Empyrean", type: "Titan", subrace: "Fiend", loc: "Astral Sea", status: "Active", img: "img/empyrean.webp",
        desc: "Empyreans are idealized, human-shaped beings of godly power. They are created from Primal forces, both Infernal and Celestial."
    },
    { name: "The Blob", type: "Titan", subrace: "Ooze", loc: "Realm of Beasts", status: "Active", img: "img/blob.webp",
        desc: "The Blob is a coagulation of cosmic energy and the remains of dead Gods and Titans. It drifts across the damp underground of the Realm of Beasts."
    },
    { name: "Grolantor", type: "Titan", subrace: "Giant", loc: "Jotunheim", status: "Active", img: "img/grolantor.webp",
        desc: "Grolantor is often mistaken for a hill, and sometimes people erect standing stones, a village, or a city on a scion's back, unaware of the mighty power beneath them. Such settlements can thrive for centuries, as the scion's magic causes crops to flourish and livestock to thrive in the surrounding region."
    },
    { name: "Daemogoth", type: "Titan", subrace: "Fiend", loc: "Any / All", status: "Active", img: "img/daemogoth.webp",
        desc: "Daemogoth titans are towering monsters that blight the land around them. A daemogoth grows in power over the course of decades spent feeding on sorrow and draining life from nature. Eventually that growth turns the daemogoth into a titan."
    },
    { name: "Emrakul", type: "Titan", subrace: "Monstrosity", loc: "Realm of Beasts", status: "Active", img: "img/emrakul.webp",
        desc: "A massive monstrosity the size of town. It is shaped like a floating disc, with hundreds of tentacles stemming from the nucleus of the disk. Before Soniya, the natives of the Realm named Emrakul "+'"The Promised End."'
    },
    { name: "Tiamat", type: "Titan", subrace: "Dragon", loc: "Aerialis", status: "Active", img: "img/tiamat.webp",
        desc: "The five-headed progenitor of chromatic dragons, Tiamat embodies the vices of evil dragons."
    },
    { name: "Bahamut", type: "Titan", subrace: "Dragon", loc: "Aerialis", status: "Active", img: "img/bahamut.webp",
        desc: "Known as the Platinum Dragon, Bahamut is the patron and progenitor of metallic dragons."
    },
    { name: "Archaic", type: "Titan", subrace: "Celestial", loc: "Any / All", status: "Active", img: "img/archaic.webp",
        desc: "Archaics are towering, multi-armed creatures overflowing with magic. Despite their solitude, archaics carry vast understanding of magic and the world's history, as well as the ability to warp the fabric of the world around them."
    },
    { name: "Tyrant Shadow", type: "Aberration", subrace: "Dinosaur", loc: "Astral Sea", status: "Active", img: "img/tyrant_shadow.jpg",
        desc: "Raw negative emotion can be personified in the darkest islands of the Astral Sea. Congealing into a shape that knows only hunger and the need to hunt. It stalks those filled with fears and insecurities that they refuse to acknowledge."
    },
];

// DOM Elements
const bestiaryBtn = document.getElementById('bestiary-btn');
const characterContainer = document.getElementById('character-container');
const bestiaryContainer = document.getElementById('bestiary-container');
const beastSearch = document.getElementById('search-beast');
const beastType = document.getElementById('type');
const beastLocation = document.getElementById('beast-location');
const beastSort = document.getElementById('sort-beast');
const beastReset = document.getElementById('reset-beast');
const beastList = document.getElementById('bestiary-list');
const beastResultsCount = document.getElementById('results-count-beast');
const beastTableHeaders = document.querySelectorAll('#bestiary-container th[data-sort]');
// MODAL Elements
const beastModal = document.getElementById('bestiary-modal');
const closeBeastModalBtn = document.getElementById('close-bmodal');
const beastModalName = document.getElementById('modal-beast-name');
const beastModalLocation = document.getElementById('bmodal-location');
const beastModalRace = document.getElementById('bmodal-race');
const beastModalSubRace = document.getElementById('bmodal-subRace');
const beastModalStatus = document.getElementById('bmodal-status');
const beastModalDesc = document.getElementById('bmodal-description');
const bModalContent = document.getElementById('bmodal-content');

beastSearch.addEventListener('input', filterBeasts);
beastType.addEventListener('change', filterBeasts);
beastLocation.addEventListener('change', filterBeasts);
beastSort.addEventListener('change', filterBeasts);
beastReset.addEventListener('click', resetBeastFilters);

// Close modal when clicking outside content
beastModal.addEventListener('click', (e) => {
    if (e.target === beastModal) {
        closeModal();
    }
});

// Close modal with button
closeBeastModalBtn.addEventListener('click', closeModal);

beastTableHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const sortField = header.getAttribute('data-sort');
        sortBeastsByField(sortField);
    });
});

bestiaryBtn.addEventListener('click', () => {
    const isBestiaryOpen = bestiaryContainer.style.display === 'block';
    bestiaryContainer.style.display = isBestiaryOpen ? 'none' : 'block';
    characterContainer.style.display = isBestiaryOpen ? 'block' : 'none';
    bestiaryBtn.textContent = isBestiaryOpen ? 'Open Bestiary' : 'Back to Characters';
    if (!isBestiaryOpen) filterBeasts();
});

function resetBeastFilters() {
    beastSearch.value = '';
    beastType.value = '';
    beastLocation.value = '';
    beastSort.value = 'name-asc';
    filterBeasts();
}

function filterBeasts() {
    const searchTerm = beastSearch.value.toLowerCase();
    const typeVal = beastType.value;
    const locVal = beastLocation.value;
    const sortVal = beastSort.value;

    let filtered = BESTIARY_DB.filter(b => {
        const matchSearch = b.name.toLowerCase().includes(searchTerm) ||
                            b.type.toLowerCase().includes(searchTerm) ||
                            b.location.toLowerCase().includes(searchTerm)
        const matchType = typeVal ? b.type === typeVal : true;
        const matchLoc = locVal ? b.location === locVal : true;
        return matchSearch && matchType && matchLoc;
    });

    sortBeastsFromValue(filtered, sortVal);
    renderBeasts(filtered);
}

function sortBeastsFromValue(data, sortVal) {
    const [field, direction] = sortVal.split('-');
    data.sort((a, b) => {
        let valA = a[field]?.toLowerCase() || '';
        let valB = b[field]?.toLowerCase() || '';
        return direction === 'desc' ? valB.localeCompare(valA) : valA.localeCompare(valB);
    });
}

function sortBeastsByField(field) {
    const [currentField, currentDir] = beastSort.value.split('-');
    const newDir = (field === currentField && currentDir === 'asc') ? 'desc' : 'asc';
    beastSort.value = `${field}-${newDir}`;
    filterBeasts();
}

function renderBeasts(beasts) {
    beastList.innerHTML = '';
    if (beasts.length === 0) {
        beastList.innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 30px;">No beasts found.</td></tr>';
        beastResultsCount.textContent = '0';
        return;
    }

    beasts.forEach(beast => {
        const row = document.createElement('tr');
        const locClass = CLASS_MAP.location[beast.loc] || 'loc-neutral';
        const raceClass = CLASS_MAP.race[beast.type] || 'epic';

        row.innerHTML = `
            <td>${beast.name}</td>
            <td><span class="${raceClass}">${beast.type}</span>${beast.subrace ? ` (${beast.subrace})` : ''}</td>
            <td><span class="${locClass}">${beast.loc || "Any / All"}</span></td>
            <td>${beast.status}</td>
        `;

        row.addEventListener('click', () => showBeastDetails(beast));
        beastList.appendChild(row);
    });

    beastResultsCount.textContent = beasts.length;
}

function showBeastDetails(beast) {
    beastModalName.textContent = beast.name;
    beastModalLocation.textContent = beast.loc;
    beastModalRace.textContent = beast.type;
    beastModalSubRace.textContent = beast.subrace || "";
    beastModalStatus.textContent = beast.status;
    beastModalDesc.textContent = beast.desc || 'No description available.';
    beastModal.style.display = 'flex';
    bModalContent.style.backgroundImage = `url("${beast.img}")`;
}
