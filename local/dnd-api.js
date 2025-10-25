// created by OOFRIF, 2025

// Main Dungeons & Dragons API Object
const DND_API = {};

// Utility Dataset
// Choice Handler
DND_API.choiceHandler = {
    // Create a modal for single or multiple choices
    makeChoice: async function(prompt, options, maxSelections = 1) {
        return new Promise((resolve) => {
            // Create modal overlay
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                font-family: Arial, sans-serif;
            `;

            // Create modal content
            const modal = document.createElement('div');
            modal.style.cssText = `
                background: var(--background);
                padding: 2rem;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            `;

            // Create prompt
            const promptEl = document.createElement('h3');
            promptEl.textContent = prompt;
            promptEl.style.marginBottom = '1rem';
            modal.appendChild(promptEl);

            // Create options container
            const optionsContainer = document.createElement('div');
            optionsContainer.style.marginBottom = '1rem';

            const selectedItems = new Set();

            // Create option elements
            options.forEach((option, index) => {
                const optionDiv = document.createElement('div');
                optionDiv.style.cssText = `
                    padding: 0.5rem;
                    margin: 0.25rem 0;
                    border: 2px solid var(--border);
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.2s;
                `;

                optionDiv.textContent = option;
                optionDiv.dataset.value = option;

                optionDiv.addEventListener('click', () => {
                    if (maxSelections === 1) {
                        // Single selection - select this one only
                        selectedItems.clear();
                        selectedItems.add(option);
                        
                        // Update visuals
                        document.querySelectorAll('[data-value]').forEach(el => {
                            el.style.background = 'var(--background)';
                            el.style.borderColor = 'var(--border)';
                        });
                        optionDiv.style.background = 'var(--card-bg)';
                        optionDiv.style.borderColor = 'var(--primary)';
                    } else {
                        // Multiple selection - toggle
                        if (selectedItems.has(option)) {
                            selectedItems.delete(option);
                            optionDiv.style.background = 'var(--card-bg)';
                            optionDiv.style.borderColor = 'var(--primary)';
                        } else if (selectedItems.size < maxSelections) {
                            selectedItems.add(option);
                            optionDiv.style.background = 'var(--background)';
                            optionDiv.style.borderColor = 'var(--primary)';
                        }
                    }
                });

                optionsContainer.appendChild(optionDiv);
            });

            modal.appendChild(optionsContainer);

            // Create button container
            const buttonContainer = document.createElement('div');
            buttonContainer.style.cssText = `
                display: flex;
                justify-content: flex-end;
                gap: 0.5rem;
            `;

            // Create confirm button
            const confirmBtn = document.createElement('button');
            confirmBtn.textContent = 'Confirm';
            confirmBtn.style.cssText = `
                padding: 0.5rem 1rem;
                background: #4caf50;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            `;

            confirmBtn.addEventListener('click', () => {
                if (selectedItems.size === 0 && maxSelections === 1) {
                    // Auto-select first option if nothing selected for single choice
                    selectedItems.add(options[0]);
                }

                if (selectedItems.size > 0) {
                    const result = maxSelections === 1 ? 
                        Array.from(selectedItems)[0] : 
                        Array.from(selectedItems);
                    document.body.removeChild(overlay);
                    resolve(result);
                }
            });

            // Create cancel button (only for optional choices)
            const cancelBtn = document.createElement('button');
            cancelBtn.textContent = 'Cancel';
            cancelBtn.style.cssText = `
                padding: 0.5rem 1rem;
                background: #f44336;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            `;

            cancelBtn.addEventListener('click', () => {
                document.body.removeChild(overlay);
                // Return default selection
                const defaultResult = maxSelections === 1 ? 
                    options[0] : 
                    options.slice(0, maxSelections);
                resolve(defaultResult);
            });

            buttonContainer.appendChild(cancelBtn);
            buttonContainer.appendChild(confirmBtn);
            modal.appendChild(buttonContainer);

            overlay.appendChild(modal);
            document.body.appendChild(overlay);

            // Close modal when clicking outside
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    document.body.removeChild(overlay);
                    const defaultResult = maxSelections === 1 ? 
                        options[0] : 
                        options.slice(0, maxSelections);
                    resolve(defaultResult);
                }
            });

            // Auto-select first option for single selection
            if (maxSelections === 1 && options.length > 0) {
                const firstOption = optionsContainer.querySelector('[data-value]');
                firstOption.style.background = 'var(--bakcground)';
                firstOption.style.borderColor = 'var(--primary)';
                selectedItems.add(options[0]);
            }
        });
    }
};
// Character Schema
DND_API.Character = {
    // Character Info
    pName: "", // name of player
    cName: "", // name of character
    origin: "", // origin of character
    alignment: {}, // dict
    faith: [], // array of diety objects or pantheon objects
    personality: [], // array of personality traits
    ideals: [], // array of ideals
    bonds: [], // array of bonds
    flaws: [], // array of flaws
    // physical attributes
    physical: {
        gender: "", // M/F/A/N/etc.
        eyes: "", // colour
        height: 0, // in cm
        weight: 0, // in lbs
        hair: "", // colour
        skin: "", // colour
        age: 0, // int
        flavour: "", // long str
    },
    // gameplay stuff
    level: 1, // level of character, int, no maximum
    profBonus: 0, // proficiency bonus
    hitpoints: { // hitpoints object
        hpMax: 0, // maximum hp
        hpCur: 0, // current hp
        hitdice: "", // hitdice string (xDy) 
    },
    savingThrows: { // saving throws obj
        "Strength Save": [], // int (0,1,2), int
        "Dexterity Save": [],
        "Constitution Save": [],
        "Intelligence Save": [],
        "Wisdom Save": [],
        "Charisma Save": [],
    },
    abilities: { // abilities obj
        "strength": 0, // int = ability score
        "dexterity": 0,
        "constitution": 0,
        "intelligence": 0,
        "wisdom": 0,
        "charisma": 0,
    },
    race: { // race object
        name: "", // race name
        type: "", // creature type
        size: { // character size
            short: "",
            long: ""
        },
        description: "" // race description
    },
    class: {}, // class obj (not modeled)
    background: {}, // background obj (not modeled)
    speed: { // speed object
        walk: 0,
        fly: 0,
        hover: 0,
        burrow: 0,
        climb: 0,
        swim: 0
    },
    armorClass: { // armor class object
        min: -1, // minimum armor class
        val: 0  // current armor class value
    },
    senses: { // senses object
        "blindsight": 0,
        "darkvision": 0,
        "darkvisionX": 0, // can see colours in darkness
        "tremorsense": 0,
        "truesight": 0,
    },
    skills: { // skills object
        "Acrobatics": [], // int, int (0,1,2)
        "Animal Handling": [],
        "Arcana": [],
        "Athletics": [],
        "Deception": [],
        "History": [],
        "Insight": [],
        "Intimidation": [],
        "Investigation": [],
        "Medicine": [],
        "Nature": [],
        "Perception": [],
        "Performance": [],
        "Persuasion": [],
        "Religion": [],
        "Sleight of Hand": [],
        "Stealth": [],
        "Survival": [],
    },
    weaponProf: [], // list of weapon proficiencies
    armorProf: [], // list of armor proficiencies
    toolProf: [], // list of tool proficiencies
    langProf: [], // list of language proficiencies
    inventory: { // inventory object
        carried: 0, // weight carried in lbs
        capacity: 0, // total carrying capacity in lbs
        crowns: 0, // currency
        equip: [], // array of item objects
        inv: [] // array of item objects
    },
    spellCasting: { // spellcasting obj
        ability: "", // string of ability score used for casting
        slots: {
            1: 0, // 0 slots for lvl 1 spells
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
        },
        spells: [] // array of spells known
    },
    feats: [] // array of feature objects
}
// Character Functions
// Get ability score from character by name
DND_API.getAbilityScore = function(character, abilityName) {
    const abilities = Object.keys(character.abilities);
    const lowerAbility = abilityName.toLowerCase();
    return abilities.find(ability => ability.toLowerCase() === lowerAbility);
}
// Get ability score modifier from score
DND_API.getAbilityMod = function(score) {
    if (typeof score === "number") { return Math.floor((score - 10) / 2); }
    else { return console.log("DND_API.getAbilityModifier(score) Error. Invalid score parameter passed."); }
}
// Alignment Dataset
DND_API.Alignments = [
    {
        name:"Lawful Good",
        desc:"A lawful good character typically acts with compassion and always with honor and a sense of duty. However, lawful good characters will often regret taking any action they fear would violate their code, even if they recognize such action as being good. Such characters include gold dragons, righteous knights, paladins, and most dwarves."
    },
    {
        name:"Lawful Neutral",
        desc:"A lawful neutral character typically believes strongly in lawful concepts such as honor, order, rules, and tradition, but often follows a personal code in addition to, or even in preference to, one set down by a benevolent authority. Examples of this alignment include a soldier who always follows orders, a judge or enforcer who adheres mercilessly to the letter of the law, a disciplined monk, and some wizards."
    },
    {
        name:"Lawful Evil",
        desc:"A lawful evil character sees a well-ordered system as being necessary to fulfill their own personal wants and needs, using these systems to further their power and influence. Examples of this alignment include tyrants, devils, corrupt officials, undiscriminating mercenary types who have a strict code of conduct, blue dragons, and hobgoblins."
    },
    {
        name:"Neutral Good",
        desc:"A neutral good character typically acts altruistically, without regard for or against lawful precepts such as rules or tradition. A neutral good character has no problems with cooperating with lawful officials, but does not feel beholden to them. In the event that doing the right thing requires the bending or breaking of rules, they do not suffer the same inner conflict that a lawful good character would. Examples of this alignment include many celestials, some cloud giants, and most gnomes."
    },
    {
        name:"True Neutral",
        desc:"A neutral character (also called \"true neutral\") is neutral on both axes and tends not to feel strongly towards any alignment, or actively seeks their balance. Druids frequently follow this dedication to balance and, under Advanced Dungeons & Dragons rules, were required to be this alignment. In an example given in the 2nd Edition Player's Handbook, a typical druid might fight against a band of marauding gnolls, only to switch sides to save the gnolls' clan from being totally exterminated. Examples of this alignment include lizardfolk, most druids, and many humans."
    },
    {
        name:"Neutral Evil",
        desc:"A neutral evil character is typically selfish and has no qualms about turning on allies-of-the-moment, and usually makes allies primarily to further their own goals. A neutral evil character has no compunctions about harming others to get what they want, but neither will they go out of their way to cause carnage or mayhem when they see no direct benefit for themselves. Another valid interpretation of neutral evil holds up evil as an ideal, doing evil for evil's sake and trying to spread its influence. Examples of the first type are an assassin who has little regard for formal laws but does not needlessly kill, a henchman who plots behind their superior's back, or a mercenary who readily switches sides if made a better offer. An example of the second type would be a masked killer who strikes only for the sake of causing fear and distrust in the community. Examples of this alignment include many drow, some cloud giants, and yugoloths."
    },
    {
        name:"Chaotic Good",
        desc:"A chaotic good character does whatever is necessary to bring about change for the better, disdains bureaucratic organizations that get in the way of social improvement, and places a high value on personal freedom, not only for oneself but for others as well. Chaotic good characters usually intend to do the right thing, but their methods are generally disorganized and often out of sync with the rest of society. Examples of this alignment include copper dragons, many elves, and unicorns."
    },
    {
        name:"Chaotic Neutral",
        desc:"A chaotic neutral character is an individualist who follows their own heart and generally shirks rules and traditions. Although chaotic neutral characters promote the ideals of freedom, it is their own freedom that comes first; good and evil come second to their need to be free. Examples of this alignment include many barbarians and rogues, and some bards."
    },
    {
        name:"Chaotic Evil",
        desc:"A chaotic evil character tends to have no respect for rules, other people's lives, or anything but their own desires, which are typically selfish and cruel. They set a high value on personal freedom, but do not have much regard for the lives or freedom of other people. Chaotic evil characters do not work well in groups because they resent being given orders and usually do not behave themselves unless there is no alternative. Examples of this alignment include higher forms of undead (such as liches), violent killers who strike for pleasure rather than profit, demons, red dragons, and orcs."
    },
];
// Get Alignment Object from String
DND_API.getAlignment = function(str) {
    if (!str || str === "allNames") {
        let alignments = [];
        DND_API.Alignments.forEach(a => { alignments.push(a.name); });
        return alignments;
    }
}
// Cybernetics Dataset
DND_API.Cybernetics = {
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
                "Meditate for 10 minutes to gain temporary hit points (1d10)"
            ]
        },
        {
            name: "NC - Speech Enhancer",
            cost: 3100,
            capacity: 1,
            humanity: 4,
            effects: [
                "+1 to Charisma Score",
                "Gain proficiency in the Persuasion Skill; double if already proficient",
                "Advantage on Charisma (Persuasion) checks"
            ]
        },
        {
            name: "NC - Empathetic",
            cost: 6100,
            capacity: 1,
            humanity: -2,
            effects: [
                "+1 to Wisdom or Intelligence Scores",
                "Gain proficiency in Insight Skill; double if already proficient",
                "Advantage on attack rolls against targets you successfully insighted"
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
        },
        {
            name: "NC - OnAlert",
            cost: 4200,
            capacity: 2,
            humanity: 9,
            effects: [
                "Cannot be surprised while conscious",
                "+5 to initiative",
                "Other creatures do not get advantage from hiding against you"
            ]
        },
        {
            name: "NC - Quick_Observation",
            cost: 13000,
            capacity: 4,
            humanity: 21,
            effects: [
                "When a creature is speaking a language you know, and their mouth is visible, you can interpret what they are saying",
                "You gain a +5 bonus to your passive Wisdom (Perception) score",
                "You gain a +5 bonus to your passive Intelligence (Investigation) score",
                "You gain a +5 bonus to your passive Wisdom (Insight) score",
            ]
        },
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
        },
        {
            name: "NC - Akimbo_Compat",
            cost: 17200,
            capacity: 3,
            humanity: 2,
            effects: [
                "Can wield two Melee weapons, Pistols, or Rifles (within reason)",
                "When performing an attack while using both weapons, do not add bonuses to the off-hand weapon"
            ]
        },
        {
            name: "NC - Ideal Fingers",
            cost: 1200,
            capacity: 1,
            humanity: 9,
            effects: [
                "Gain proficiency in Sleight of Hand skill; double if already proficient",
                "Can perform a Dexterity (Sleight of Hand) check as a bonus action"
            ]
        },
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
        {
            name: "NC - Stamina Booster",
            cost: 6300,
            capacity: 1,
            humanity: 9,
            effects: [
                "When prone, standing up uses only 5ft of movement",
                "Speed increased by 10ft",
                "Can climb and swim without using extra movement"
            ]
        },
        {
            name: "NC - Physical Body Enhancement",
            cost: 6300,
            capacity: 1,
            humanity: 9,
            effects: [
                "+1 to Strength Score",
                "Gain proficiency in the Athletics Skill; double if already proficient",
                "Count as one size larger when determining your carrying capacity"
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
        {
            name: "NC - Reinforced Skin",
            cost: 8400,
            capacity: 2,
            humanity: 17,
            effects: [
                "+1 to Constitution Score",
                "When healing, the minimum is you can be healed is 2 * Constitution Modifier"
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
                "Turn invisible for up to 1 minute, recharge on short rest",
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
        },
        {
            name: "NC - Magic-Familiar",
            cost: 7000,
            capacity: 2,
            humanity: 11,
            effects: [
                "+1 to Intelligence Score",
                "Gain proficiency in the Arcana Skill; double if already proficient",
                "Can cast detect magic once per long rest"
            ]
        },
    ]
};
// Faith Dataset
DND_API.Faith = {
    Deities: [
        {
            name:"Aerion",
            altNames: [
                "The God of Honour",
                "The Honourable God",
            ],
            source: { short: "OMP", long: "Once Mortal Primer" },
            pantheon: "The Order",
            alignment: "Neutral Good",
            domains: [
                "Honour",
                "Justice",
            ],
            race: "Natural God",
            location: "Divine Realm",
            status: "Active",
            symbol: "A platinum shield with a small gold sun in the center.",
            description: "Those who pray to Aerion often pray to Clara as well. He is popularly depicted as a chivalrous and handsome Human."
        },
        {
            name:"Aurum Regem",
            altNames: [
                "The Golden God",
                "The Great and Wise Golden Emperor",
            ],
            source: { short: "OMP", long: "Once Mortal Primer" },
            pantheon: "No Pantheon",
            alignment: "Chaotic Neutral",
            domains: [
                "Knowledge",
                "Labyrinth",
            ],
            race: "Wild God",
            subrace: "Ancient Gold Dragon",
            location: "Garna",
            status: "Deceased",
            symbol: "A brain made out of gold.",
            description: "The only God to have died of natural causes. As an eccentric God, He was known to have experienced and learned everything. In the final centuries of His life He would erase His memories and embark on treasure hunts He created for Himself as challenges."
        },
        {
            name:"Azael",
            altNames: [
                "The God of Peace",
                "The Peaceful God of War",
            ],
            source: { short: "OMP", long: "Once Mortal Primer" },
            pantheon: "Blessed Ring",
            alignment: "Lawful Good",
            domains: [
                "Order",
                "Justice",
                "Peace",
            ],
            race: "Natural God",
            location: "Divine Realm",
            status: "Active",
            symbol: "A sealed scroll with golden engravings.",
            description: "A God known for negotiation Peace treaties, which He violently enforces. He often uses the form of a Nephilim (Half-Angel)."
        },
        {
            name:"Bahgyel",
            altNames: [
                "The Goddess of Deep Sea",
                "The Goddess of Monstrosities",
                "The Laughing Goddess of the Sea",
            ],
            source: { short: "OMP", long: "Once Mortal Primer" },
            pantheon: "Curseborne",
            alignment: "Chaotic Neutral",
            domains: [
                "Ocean",
                "Tempest",
                "Death",
            ],
            race: "Natural God",
            location: "Astral Sea",
            status: "Active",
            symbol: "A mermaid wearing the night sky.",
            description: "A young Goddess who is extremely popular in the Astral Sea. She enjoys creating horiffic and monsterous creatures for the pirates of the Astral Sea to encounter and battle to the death. Depicted in many different forms, all of them different, but cute, sea monsters."
        },
        {
            name:"Clara",
            altNames: [
                "The Goddess of Light",
                "The Sun's Beam",
                "The Sun's Moon",
                "The Sun's Sword",
                "The Goddess of Purification"
            ],
            source: { short: "OMP", long: "Once Mortal Primer" },
            pantheon: "The Order",
            alignment: "Lawful Good",
            domains: [
                "Justice",
                "Light",
                "Death",
                "War"
            ],
            race: "Natural God",
            location: "Divine Realm",
            status: "Active",
            symbol: "A silver greatsword with golden engravings.",
            description: "She is a warrior Goddess and is always depicted as a Moon High-Elf with a gold and silver greatsword."
        },
        {
            name:"Elandra",
            altNames: [
                "The Goddess of Truth",
                "The Goddess of Sins",
                "The Jury of Hope"
            ],
            source: { short: "OMP", long: "Once Mortal Primer" },
            pantheon: "The Order",
            alignment: "Neutral Good",
            domains: [
                "Justice",
                "Life",
                "Death",
            ],
            race: "Natural God",
            location: "Divine Realm",
            status: "Active",
            symbol: "A Dwarven Rune meaning \"Truth\".",
            description: "A Goddess who acts as the Witness and Jury during the judgement of souls when crossing into the afterlife. She is never depicted, except through writing and symbols."
        },
        {
            name:"Erevos",
            altNames: [
                "The God of Secrets",
            ],
            source: { short: "OMP", long: "Once Mortal Primer" },
            pantheon: "Curseborne",
            alignment: "True Neutral",
            domains: [
                "Justice",
                "Death",
            ],
            race: "Elder God",
            location: "Divine Realm",
            status: "Active",
            symbol: "A cloak with silver runic detailing",
            description: "A God who is known for their professionalism, secrecy, and the skill of their followers. Depicted as a sentient cloak with 5 sets of silver runic engravings."
        },
        {
            name:"Evogas Llamoak",
            altNames: [
                "The First Curious Wanderer",
            ],
            source: { short: "OMP", long: "Once Mortal Primer" },
            pantheon: "No Pantheon",
            alignment: "True Neutral",
            domains: [
                "Knowledge",
            ],
            race: "Wild God",
            subrace: "Elf",
            location: "Feywild",
            status: "Inactive",
            symbol: "An old tome with a tree on the cover.",
            description: "An Elf who attained the status of Godhood through exploring, studying, and learning about the Realms. Everyone has heard of Evogas."
        },
        {
            name:"Faela",
            altNames: [
                "The Goddess of Plague",
                "The Goddess of Medicine",
            ],
            source: { short: "OMP", long: "Once Mortal Primer" },
            pantheon: "Duskborne",
            alignment: "Neutral Evil",
            domains: [
                "Life",
                "Death",
            ],
            race: "Natural God",
            location: "garna",
            status: "Active",
            symbol: "A witch doctors mask.",
            description: "A Goddess whose cult cures all illnesses which Faela did not create, they also create and weaponize plagues which they offer to Faela for rewards."
        },
        {
            name:"Godwyn",
            altNames: [
                "The God of Death",
                "The Reaper",
            ],
            source: { short: "OMP", long: "Once Mortal Primer" },
            pantheon: "Duskborne",
            alignment: "Neutral Evil",
            domains: [
                "Death",
                "Hunting",
            ],
            race: "Natural God",
            location: "Divine Realm",
            status: "Active",
            symbol: "A fractured skull.",
            description: "A God who solidifies the Divine Law of Death. Preventing mortals from attaining immortality by reaping their souls. He is depicted as being able to suck the sould out of mortals by opening up His face."
        },
        {
            name:"Ilfandi",
            altNames: [
                "The God of Curses",
                "The Father of Darkness",
            ],
            source: { short: "OMP", long: "Once Mortal Primer" },
            pantheon: "Curseborne",
            alignment: "Chaotic Neutral",
            domains: [
                "Darkness",
                "Knowledge",
            ],
            race: "Elder God",
            location: "Divine Realm",
            status: "Active",
            symbol: "A small green flame.",
            description: "The founder of the Curseborne Pantheon, the creator of curses, the creator of necromancy, and the only entity in recorded history to have killed a Natural God. Depicted in many different forms, all of them abberations and monstrosities."
        },
        {
            name:"Irol",
            altNames: [
                "The God of Endings",
            ],
            source: { short: "OMP", long: "Once Mortal Primer" },
            pantheon: "Duskborne",
            alignment: "True Neutral",
            domains: [
                "Unknown",
                "Void",
            ],
            race: "Elder God",
            location: "Divine Realm",
            status: "Active",
            symbol: "None.",
            description: "An Elder God who constantly sleeps. Nearly nothing is known about Irol. It is believed that they will be the last entity at the end of all time."
        },
        {
            name:"Lerranmoraxitro",
            altNames: [
                "The God of Freedom",
            ],
            source: { short: "OMP", long: "Once Mortal Primer" },
            pantheon: "Curseborne",
            alignment: "Lawful Neutral",
            domains: [
                "Nature",
                "Wind",
            ],
            race: "Elder God",
            location: "Aerialis",
            status: "Inactive",
            symbol: "Clouds, or the sky itself.",
            description: "The creator of Dragons. He once ruled the Fourth and Fifth Realms, but quit, and allowed the populous complete freedom from His rule. His freedom inspired Aurum to explore the Realms. He presently lounges in a temple in Aerialis."
        },
        {
            name:"Lyris",
            altNames: [
                "The Goddess of Destiny",
            ],
            source: { short: "OMP", long: "Once Mortal Primer" },
            pantheon: "Blessed Ring",
            alignment: "Neutral Good",
            domains: [
                "Peace",
                "Prophecy",
                "Life"
            ],
            race: "Elder God",
            location: "Divine Realm",
            status: "Active",
            symbol: "A purple eye, or a deep purple orb.",
            description: "The founder of the Blessed Ring Pantheon, She wishes to prevent terrible disasters from befalling the Realms. Lyris often takes the form of a solemn Astral Elf, She is commonly depicted has having 3 eyes, and 4 arms."
        },
        {
            name:"Lyssia",
            altNames: [
                "The Goddess of Nature",
                "Mother of the Feywild"
            ],
            source: { short: "OMP", long: "Once Mortal Primer" },
            pantheon: "Blessed Ring",
            alignment: "Neutral Good",
            domains: [
                "Knowledge",
                "Nature",
                "Life"
            ],
            race: "Natural God",
            location: "Divine Realm",
            status: "Active",
            symbol: "A white wolf, or a multi-tailed fox.",
            description: "A Goddess who is popular amongst Fey for Her love of nature. Lyssia is known to take a myriad of forms. The most common form is that of a frightening Treant, with branches sprawling from their body."
        },
        {
            name:"Miriel",
            altNames: [
                "The God of Discipline",
            ],
            source: { short: "OMP", long: "Once Mortal Primer" },
            pantheon: "The Order",
            alignment: "Lawful Good",
            domains: [
                "Peace",
                "Community",
                "Wind",
            ],
            race: "Natural God",
            location: "Divine Realm",
            status: "Active",
            symbol: "A solitary mountain.",
            description: "A God who promotes the idea of living a risk-free lifestyle, focusing on being a good person rather than trying to save the Realms. He is depicted as a tall, muscular, and bald Human."
        },
        {
            name:"Nevorn",
            altNames: [
                "The God of Luck",
            ],
            source: { short: "OMP", long: "Once Mortal Primer" },
            pantheon: "Blessed Ring",
            alignment: "Chaotic Neutral",
            domains: [
                "Greed",
                "Luck",
            ],
            race: "Elder God",
            location: "Divine Realm",
            status: "Active",
            symbol: "Dice, playing cards, any symbol of luck.",
            description: "One of the most popular and powerful Gods. Nevorn has total control of the luck of mortals. Nevorn is depicted as a Cambion (Half-Demon)."
        },
        {
            name:"Oterum",
            altNames: [
                "The God of the Insane",
            ],
            source: { short: "OMP", long: "Once Mortal Primer" },
            pantheon: "Duskborne",
            alignment: "Neutral Evil",
            domains: [
                "Darkness",
                "Apocalypse",
                "War"
            ],
            race: "Wild God",
            subrace: "Mindflayer",
            location: "Felled Realm",
            status: "Inactive",
            symbol: "Self-Immolation.",
            description: "The ruler of the seventh realm."
        },
        {
            name:"Seraxum",
            altNames: [
                "The God of Revenge",
            ],
            source: { short: "OMP", long: "Once Mortal Primer" },
            pantheon: "Duskborne",
            alignment: "Chaotic Neutral",
            domains: [
                "Darkness",
                "Death",
            ],
            race: "Natural God",
            location: "Divine Realm",
            status: "Active",
            symbol: "A bloodstained dagger.",
            description: "A God who blesses nearly everyone who wants revenge on someone or something. There are no depictions of Seraxum."
        },
        {
            name:"Solara",
            altNames: [
                "The Goddess of the Sun",
                "The Goddess",
                "The Goddess of the Order",
                "The First Light",
                "The Holy God",
                "The True God",
            ],
            source: { short: "OMP", long: "Once Mortal Primer" },
            pantheon: "The Order",
            alignment: "Neutral",
            domains: [
                "Life",
                "Order",
                "War"
            ],
            race: "Elder God",
            location: "Divine Realm",
            status: "Active",
            symbol: "A sun or a golden crown.",
            description: "The founder of The Order. Solara often takes the form of a Sun High-Elf."
        },
        {
            name:"Soniya",
            altNames: [
                "The Goddess of Souls",
                "The Goddess of the Tournament",
                "The Goddess of the Third Realm",
            ],
            source: { short: "OMP", long: "Once Mortal Primer" },
            pantheon: "Curseborne",
            alignment: "Lawful Neutral",
            domains: [
                "Life",
                "Death",
                "Moon",
                "Night"
            ],
            race: "Elder God",
            location: "Realm of Beasts",
            status: "Active",
            symbol: "A white dress.",
            description: "A Goddess who constructed a stronghold in the Third Realm, where She hosts events for all the Realms to watch. Depicted in many different forms. The most common depiction portrays Her as being a tall spindly creature made of black smoke. The smoke forms sharp, jagged looking hair. Her eyes are such a fair shade of white, that they emit light themselves."
        },
        {
            name:"Sylvar Neprad",
            altNames: [
                "The Goddess of Neo-Neprad",
                "The Queen of Neo-Neprad",
            ],
            source: { short: "OMP", long: "Once Mortal Primer" },
            pantheon: "No Pantheon",
            alignment: "Neutral Good",
            domains: [
                "Knowledge",
                "Night",
                "Darkness",
                "Order",
                "Life"
            ],
            race: "Wild God",
            subrace: "Moon High-Elf",
            location: "Astral Sea",
            status: "Deceased",
            symbol: "None.",
            description: "The theocratic leader of Neo-Neprad. She is not the founder of the city, but an outsider who genuinely wishes to help the people of Neo-Neprad."
        },
        {
            name:"Thalorin",
            altNames: [
                "The God of Justice",
                "The Just God",
            ],
            source: { short: "OMP", long: "Once Mortal Primer" },
            pantheon: "The Order",
            alignment: "Neutral Good",
            domains: [
                "Justice",
                "Hunting",
                "War"
            ],
            race: "Natural God",
            location: "Divine Realm",
            status: "Active",
            symbol: "A stylish walking cane.",
            description: "He is known to use the form of an old \"Silver Fox\" Human."
        },
        {
            name:"Urnogh",
            altNames: [
                "The God of Shadows",
            ],
            source: { short: "OMP", long: "Once Mortal Primer" },
            pantheon: "Duskborne",
            alignment: "Chaotic Neutral",
            domains: [
                "Darkness",
                "Death",
                "Shadow",
                "Night"
            ],
            race: "Natural God",
            location: "Kyofu",
            status: "Active",
            symbol: "An eclipsed moon.",
            description: "Urnogh is unlike many Gods. He cares for his followers, often giving them advice, and helping with problems they encounter."
        },
        {
            name:"Xornoren",
            altNames: [
                "The God of Harsh Winter",
                "The Evil God",
            ],
            source: { short: "OMP", long: "Once Mortal Primer" },
            pantheon: "Winter's Embrace",
            alignment: "Chaotic Evil",
            domains: [
                "Darkness",
                "Apocalypse",
                "Death",
                "War",
                "Void"
            ],
            race: "Wild God",
            subrace: "Titan",
            location: "Unknown",
            status: "Active",
            symbol: "Winter.",
            description: "A recently born Wild God. They are the only God to ever be called 'Evil' The first thing They did is create a fifth season across every realm, a much colder winter. Although Xornoren is the youngest God, Their followers are spread across the Realms, causing all sorts of chaos."
        },
        {
            name:"Zalgor",
            altNames: [
                "The God of Brutal War",
            ],
            source: { short: "OMP", long: "Once Mortal Primer" },
            pantheon: "Duskborne",
            alignment: "True Neutral",
            domains: [
                "Death",
                "War",
            ],
            race: "Wild God",
            subrace: "Giant",
            location: "Astral Sea",
            status: "Active",
            symbol: "An adamantine axe.",
            description: "A God who creates and enacts the most cruel, sadistic, and brutal tactics on the battlefields. Tormenting His enemies before killing them."
        },
    ],
    Pantheons: [
        {
            name:"The Order",
            desc:""
        },
        {
            name:"Blessed Ring",
            desc:""
        },
        {
            name:"Winter's Embrace",
            desc:""
        },
        {
            name:"Duskborne",
            desc:""
        },
        {
            name:"Curseborne",
            desc:""
        },
    ]
};
// Get Deities Object from String
DND_API.getDeity = function(str) {
    if (!str || str === "allNames") {
        let deities = [];
        DND_API.Faith.Deities.forEach(d => { deities.push(d.name); });
        return deities;
    }
}
// Get Pantheons Object from String
DND_API.getPantheon = function(str) {
    if (!str || str === "allNames") {
        let pantheons = [];
        DND_API.Faith.Pantheons.forEach(p => { pantheons.push(p.name); });
        return pantheons;
    }
}
// Features Dataset
DND_API.Features = [
    // A
    {
        name: "Aggressive",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "actionBonus"
            }
        ],
        desc: "As a bonus action, you can move up to your speed toward a hostile creature that you can see."
    },
    {
        name: "Artificer's Lore",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "actionBonus"
            }
        ],
        desc: "As a bonus action, you can move up to your speed toward a hostile creature that you can see."
    },
    {
        name: "Astral Knowledge",
        source: { short: "OMP", long: "Once Mortal Primer" },
        type: "origin",
        effect: [
            {
                type: "proficiency",
                on: "skill",
                effect: [
                    {
                        type: "choice",
                        skill: ["any"],
                        value: 1
                    }
                ]
            },
            {
                type: "proficiency",
                on: "weaponOrTool",
                effect: [
                    {
                        type: "choice",
                        category: ["weapon", "tool"],
                        value: 1
                    }
                ]
            }
        ],
        desc: "You can mystically access a reservoir of experiences of entities connected to the Astral Plane. Whenever you finish a long rest, you gain proficiency in one skill of your choice and with one weapon or tool of your choice as you momentarily project your consciousness into the Astral Plane. These proficiencies last until the end of your next long rest."
    },
    {
        name: "Astral Step",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "actionBonus"
            }
        ],
        desc: "As a bonus action, you can magically teleport up to 30 feet to an unoccupied space you can see. You can use this trait a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest."
    },
    // B
    {
        name: "Blood Thirst",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "action"
            }
        ],
        desc: "You can drain blood and life energy from a willing creature, or one that is grappled by you, incapacitated, or restrained. Make a melee attack against the target. If you hit, you deal 1 piercing damage and 1d6 necrotic damage. The target's hit point maximum is reduced by an amount equal to the necrotic damage taken, and you regain hit points equal to that amount. The reduction lasts until the target finishes a long rest. The target dies if this effect reduces its hit point maximum to 0."
    },
    {
        name: "Brave",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "advantage",
                on: "savingThrow"
            }
        ],
        desc: "You have advantage on saving throws against being frightened."
    },
    {
        name: "Breath Weapon",
        source: { short: "OMP", long: "Once Mortal Primer" },
        type: "origin",
        effect: [
            {
                type: "action",
                actionType: "attackReplacement",
                area: ["15ftCone", "30ftLine"],
                save: "dexterity",
                dc: "8 + conMod + profBonus",
                damage: "1d10",
                damage_type: "draconicAncestry",
                scaling: {
                    5: "2d10",
                    11: "3d10",
                    17: "4d10"
                },
                uses: "proficiencyBonus",
                recharge: "longRest"
            }
        ],
        desc: "When you take the Attack action on your turn, you can replace one of your attacks with an exhalation of magical energy in either a 15-foot Cone or a 30-foot Line that is 5 feet wide (choose the shape each time). Each creature in that area must make a Dexterity saving throw (DC 8 plus your Constitution modifier and Proficiency Bonus). On a failed save, a creature takes 1D10 damage of the type determined by your Draconic Ancestry trait. On a successful save, a creature takes half as much damage. This damage increases by 1D10 when you reach character levels 5 (2D10), 11 (3D10), and 17 (4D10). You can use this Breath Weapon a number of times equal to your Proficiency Bonus, and you regain all expended uses when you finish a Long Rest."
    },
    // C
    {
        name: "Cantrip",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "granted",
                spell: ["anyCantrip"],
                castingAbility: "intelligence"
            }
        ],
        desc: "You know one cantrip of your choice from the wizard spell list. Intelligence is your spellcasting ability for it."
    },
    {
        name: "Celestial Legacy",
        source: { short: "OMP", long: "Once Mortal Primer" },
        type: "origin",
        effect: [
            {
                type: "granted",
                spell: ["Light", "Guidance"],
                castingAbility: "charisma"
            },
            {
                type: "granted",
                spell: ["Lesser Restoration"],
                condition: "level3",
                uses: 1,
                recharge: "longRest",
                castingAbility: "charisma"
            },
            {
                type: "granted",
                spell: ["Daylight"],
                condition: "level5",
                uses: 1,
                recharge: "longRest",
                castingAbility: "charisma"
            }
        ],
        desc: "You know the light and guidance cantrips. Once you reach 3rd level, you can cast the lesser restoration spell once with this trait, and you regain the ability to do so when you finish a long rest. Once you reach 5th level, you can cast the daylight spell once with this trait, and you regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells."
    },
    {
        name: "Celestial Resistance",
        source: { short: "OMP", long: "Once Mortal Primer" },
        type: "origin",
        effect: [
            {
                type: "resistance",
                on: "necrotic"
            },
            {
                type: "resistance",
                on: "radiant"
            }
        ],
        desc: "You have Resistance to Necrotic damage and Radiant damage."
    },
    {
        name: "Constructed Resilience",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "immune",
                on: "poison"
            },
            {
                type: "immune",
                on: "condition"
            }
        ],
        desc: "You do not need to eat, sleep, breathe, or drink. You are immune to poison and disease. Magic cannot put you to sleep."
    },
    // D
    {
        name: "Damage Resistance",
        source: { short: "OMP", long: "Once Mortal Primer" },
        type: "origin",
        effect: [
            {
                type: "resistance",
                on: "draconicAncestry"
            }
        ],
        desc: "You have resistance to the damage type associated with your draconic ancestry."
    },
    {
        name: "Dark Bargain",
        source: { short: "OMP", long: "Once Mortal Primer" },
        type: "origin",
        effect: [
            {
                type: "reaction",
                on: "savingThrow",
            }
        ],
        desc: "When you fail an ability check or saving throw, you can add 1d6 to the roll after seeing the result. You must then take 1d6 necrotic damage. You can use this trait a number of times equal to your proficiency bonus, regaining all uses after a long rest."
    },
    {
        name: "Decadent Mastery",
        source: { short: "OMP", long: "Once Mortal Primer" },
        type: "origin",
        effect: [
            {
                type: "proficiency",
                on: "language",
                effect: [
                    {
                        type: "choice",
                        lang: ["any"],
                        value: 1
                    }
                ]
            },
            {
                type: "proficiency",
                on: "skillOrTool",
                effect: [
                    {
                        type: "choice",
                        category: ["skill", "tool"],
                        value: 1
                    }
                ]
            }
        ],
        desc: "You learn one language of your choice, and you are proficient with one skill or tool of your choice. In the Astral Sea, Gith have bountiful time to master odd bits of knowledge."
    },
    {
        name: "Dive Attack",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        desc: "If you are flying and dive at least 30 ft. straight toward a target and then hit it with a melee weapon attack, the attack deals an extra 1d6 damage to the target."
    },
    {
        name: "Divine Resilience",
        source: { short: "OMP", long: "Once Mortal Primer" },
        type: "origin",
        effect: [
            {
                type: "advantage",
                on: "savingThrow"
            }
        ],
        desc: "You have advantage on saving throws against being frightened or charmed."
    },
    {
        name: "Draconic Ancestry",
        source: { short: "OMP", long: "Once Mortal Primer" },
        type: "origin",
        effect: [
            {
                type: "table",
                table: {
                    headers: ["Dragon Type", "Damage Type", "Resistance"],
                    rows: [
                        ["Black, Copper", "Acid", "Acid"],
                        ["Blue, Bronze", "Lightning", "Lightning"],
                        ["Brass, Gold, Red", "Fire", "Fire"],
                        ["Green", "Poison", "Poison"],
                        ["Silver, White", "Cold", "Cold"]
                    ]
                }
            }
        ],
        desc: "Your draconic ancestry determines the damage type and resistance of your breath weapon and damage resistance."
    },
    {
        name: "Dwarven Combat Training",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "proficiency",
                on: "weapon",
                effect: [
                    {
                        type: "granted",
                        weapon: ["Battleaxe","Handaxe","Light Hammer","Warhammer"]
                    },
                ]
            }
        ],
        desc: "You have proficiency with the battleaxe, handaxe, light hammer, and warhammer."
    },
    {
        name: "Dwarven Resilience",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "advantage",
                on: "savingThrow"
            },
            {
                type: "resistance",
                on: "poison"
            }
        ],
        desc: "You have advantage on saving throws against poison, and you have resistance against poison damage."
    },
    {
        name: "Dwarven Toughness",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "hitpoints",
                on: "level",
                effect: [
                    {
                        type: "hpMax",
                        value: 1
                    },
                ]   
            }
        ],
        desc: "Your Hit Point maximum increases by 1, and it increases by 1 again whenever you gain a level."
    },
    // E
    {
        name: "Elf Weapon Training",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "proficiency",
                on: "weapon",
                effect: [
                    {
                        type: "granted",
                        weapon: ["Longsword", "Shortsword", "Shortbow", "Longbow"]
                    },
                ]
            }
        ],
        desc: "You have proficiency with the longsword, shortsword, shortbow, and longbow."
    },
    // F
    {
        name: "Fairy Magic",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "granted",
                spell: ["Druidcraft"],
                castingAbility: "charisma"
            },
            {
                type: "granted",
                spell: ["Faerie Fire"],
                condition: "level3",
                castingAbility: "charisma"
            },
            {
                type: "granted",
                spell: ["Enlarge/Reduce"],
                condition: "level5",
                castingAbility: "charisma"
            },
        ],
        desc: "You know the druidcraft cantrip. Starting at 3rd level, you can cast the faerie fire spell with this trait. "+
        "Starting at 5th level, you can also cast the enlarge/reduce spell with this trait. "+
        "Once you cast faerie fire or enlarge/reduce with this trait, you can't cast that spell with it again until you finish a long rest. "+
        "You can also cast either of those spells using any spell slots you have of the appropriate level. "+
        "Intelligence, Wisdom, or Charisma is your spellcasting ability for these spells when you cast them with this trait (choose when you select this race)."
    },
    {
        name: "Feast of Blood",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "action",
                on: "Blood Thirst"
            }
        ],
        desc: "When you drain blood with your Blood Thirst ability, you experience a surge of vitality. Your speed increases by 10 feet, and you gain advantage on Strength and Dexterity checks and saving throws for 1 minute."
    },
    {
        name: "Fey Ancestry",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "advantage",
                on: "savingThrow"
            }
        ],
        desc: "You have Advantage on saving throws you make to avoid or end the Charmed condition."
    },
    {
        name: "Fiendish Charm",
        source: { short: "PHB", long: "Player's Handbook" },
        type: "origin",
        effect: [
            {
                type: "granted",
                spell: ["Charm Person"],
                uses: 1,
                recharge: "longRest",
                castingAbility: "charisma"
            },
            {
                type: "granted",
                spell: ["Suggestion"],
                condition: "level3",
                uses: 1,
                recharge: "longRest",
                castingAbility: "charisma"
            }
        ],
        desc: "You can cast Charm Person once with this trait. Starting at 3rd level, you can cast Suggestion once. Charisma is your spellcasting ability. You regain these after a long rest."
    },
    // G
    {
        name: "Githyanki Psionics",
        source: { short: "OMP", long: "Once Mortal Primer" },
        type: "origin",
        effect: [
            {
                type: "granted",
                spell: ["Mage Hand"],
                castingAbility: "wisdom",
                special: "invisible"
            },
            {
                type: "granted",
                spell: ["Jump"],
                condition: "level3",
                uses: 1,
                recharge: "longRest",
                castingAbility: "wisdom",
                special: "noComponents"
            },
            {
                type: "granted",
                spell: ["Misty Step"],
                condition: "level5",
                uses: 1,
                recharge: "longRest",
                castingAbility: "wisdom",
                special: "noComponents"
            }
        ],
        desc: "You know the mage hand cantrip, and the hand is invisible when you cast the cantrip with this trait. Starting at 3rd level, you can cast the jump spell with this trait. Starting at 5th level, you can also cast misty step with it. Once you cast jump or misty step with this trait, you can't cast that spell with it again until you finish a long rest. You can also cast either of those spells using any spell slots you have of the appropriate level. Wisdom is your spellcasting ability for these spells when you cast them with this trait (choose when you select this race). None of these spells require spell components when you cast them with this trait."
    },
    {
        name: "Githzerai Psionics",
        source: { short: "OMP", long: "Once Mortal Primer" },
        type: "origin",
        effect: [
            {
                type: "granted",
                spell: ["Mage Hand"],
                castingAbility: "choice",
                options: "intelligence",
                special: "invisible"
            },
            {
                type: "granted",
                spell: ["Shield"],
                condition: "level3",
                uses: 1,
                recharge: "longRest",
                castingAbility: "choice",
                options: "intelligence",
                special: "noComponents"
            },
            {
                type: "granted",
                spell: ["Detect Thoughts"],
                condition: "level5",
                uses: 1,
                recharge: "longRest",
                castingAbility: "choice",
                options: "intelligence",
                special: "noComponents"
            }
        ],
        desc: "You know the mage hand cantrip, and the hand is invisible when you cast the cantrip with this trait. Starting at 3rd level, you can cast the shield spell with this trait. Starting at 5th level, you can also cast the detect thoughts spell with it. Once you cast shield or detect thoughts spell with this trait, you can't cast that spell with it again until you finish a long rest. You can also cast either of those spells using any spell slots you have of the appropriate level. Intelligence, Wisdom, or Charisma is your spellcasting ability for these spells when you cast them with this trait (choose when you select this race). None of these spells require spell components when you cast them with this trait."
    },
    {
        name: "Glide",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        desc: "Using your feathered arms, you can slow your fall, and glide short distances. When falling you can use your reaction to spread your arms, stiffen your wing feathers, and slow your descent. While doing so, you continue to fall gently at a speed of 60 feet per round, taking no fall damage when you land. If you would fall at least 10 feet in this way, you may fly up to your movement speed in one direction you choose, although you cannot choose to move upwards, landing in the space you finish your movement. You cannot glide while carrying heavy weapons or wielding a shield (though you may drop any held items as part of your reaction to spread your arms). You cannot glide while wearing heavy armor, or if you are encumbered."
    },
    {
        name: "Gnomish Cunning",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "advantage",
                on: "savingThrow"
            }
        ],
        desc: "You have Advantage on Intelligence, Wisdom, and Charisma saving throws."
    },
    // H
    {
        name: "Healing Hands",
        source: { short: "OMP", long: "Once Mortal Primer" },
        type: "origin",
        effect: [
            {
                type: "action"
            }
        ],
        desc: "As a Magic action, you touch a creature and roll a number of d4s equal to your Proficiency Bonus. The creature regains a number of Hit Points equal to the total rolled. Once you use this trait, you can't use it again until you finish a Long Rest."
    },
    {
        name: "Heavenly Judgement",
        source: { short: "OMP", long: "Once Mortal Primer" },
        type: "origin",
        desc: "When you deal damage to a creature with an attack or spell, you can channel divine energy to make the attack especially potent. The creature takes an extra 10 radiant damage. You can use this trait a number of times equal to your proficiency bonus, regaining all uses after a long rest."
    },
    {
        name: "Hellish Resistance",
        source: { short: "OMP", long: "Once Mortal Primer" },
        type: "origin",
        effect: [
            {
                type: "resistance",
                on: "fire"
            }
        ],
        desc: "You have resistance to fire damage."
    },
    // I
    {
        name: "Internal Logic",
        source: { short: "PHB", long: "Player's Handbook" },
        type: "origin",
        effect: [
            {
                type: "granted",
                spell: ["Friends"],
                castingAbility: "charisma"
            }
        ],
        desc: "You know the Friends cantrip. Charisma is your spellcasting ability for it."
    },
    {
        name: "Integrated Protection",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "bonus",
                on: "armorClass.min",
                value: 1
            }
        ],
        desc: "You gain a +1 bonus to Armor Class. To wear any armor, you must fuse it with your body over the span of 1 hour. Armor you don cannot be forcefully removed."
    },
    // J
    // K
    {
        name: "Keen Sense",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "proficiency",
                on: "skill",
                effect: [
                    {
                        type: "choice",
                        skill: ["Insight", "Perception", "Survival"],
                        value: 1
                    },
                ]
            }
        ],
        desc: "You have proficiency with the battleaxe, handaxe, light hammer, and warhammer."
    },
    // L
    {
        name: "Light Bearer",
        source: { short: "OMP", long: "Once Mortal Primer" },
        type: "origin",
        effect: [
            {
                type: "granted",
                spell: ["Light"],
                castingAbility: "charisma"
            }
        ],
        desc: "You know the Light cantrip. Charisma is your spellcasting ability for it."
    },
    {
        name: "Lucky",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        desc: "Whenever you roll a 1, you can choose to reroll the die and must use the new roll, even if its a one. "+
        "You get three luck points which recharge every long rest, these points can be used to give yourself advantage on any roll, or disadvantage on any roll made against you."
    },
    // M
    {
        name: "Mental Discipline",
        source: { short: "OMP", long: "Once Mortal Primer" },
        type: "origin",
        effect: [
            {
                type: "advantage",
                on: "savingThrow"
            }
        ],
        desc: "Your innate psychic defenses grant you advantage on saving throws you make to avoid or end the charmed and frightened conditions on yourself."
    },
    {
        name: "Mountain Born",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "resistance",
                on: "cold"
            }
        ],
        desc: "You have resistance to cold damage. You're also acclimated to high altitude, including elevations above 20,000 feet."
    },
    // N
    {
        name: "Natural Athlete",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "proficiency",
                on: "skill",
                effect: [
                    {
                        type: "granted",
                        skill: ["Athletics"]
                    },
                ]
            }
        ],
        desc: "You gain proficiency in the Athletics skill."
    },
    {
        name: "Natural Stealth",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "action",
                on: "Hide"
            }
        ],
        desc: "You can take the Hide action even when you are obscured only by a creature that is at least one size larger than you."
    },
    {
        name: "Nimble",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        desc: "You can move through the space of any creature that is of a size larger than yours."
    },
    // O
    {
        name: "One With Stone",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "actionBonus",
            }
        ],
        desc: "As a Bonus Action, you gain Tremorsense with a range of 60 feet for 10 minutes. You must be on a stone surface or touching a stone surface to use this Tremorsense. The stone can be natural or worked. You can use this Bonus Action a number of times equal to your Proficiency Bonus, and you regain all expended uses when you finish a Long Rest."
    },
    // P
    {
        name: "Patterned Feathers",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "advantage",
                on: "skillStealth"
            }
        ],
        desc: "You have advantage on Dexterity (Stealth) checks when you attempt to hide in a forest."
    },
    {
        name: "Powerful Build",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "carryingCapacity"
            }
        ],
        desc: "You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift. You also have Advantage on any ability check you make to end the Grappled condition."
    },
    {
        name: "Primal Intuition",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "proficiency",
                on: "skill",
                effect: [
                    {
                        type: "choice",
                        skill: ["Animal Handling","Insight","Intimidation","Medicine","Perception","Survival"],
                        value: 2
                    },
                ]
            }
        ],
        desc: "You have proficiency in two skills of your choice. "
    },
    {
        name: "Psychic Resilience",
        source: { short: "OMP", long: "Once Mortal Primer" },
        type: "origin",
        effect: [
            {
                type: "resistance",
                on: "psychic"
            }
        ],
        desc: "You have resistance to psychic damage."
    },
    // Q
    // R
    {
        name: "Relentless Endurance",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        desc: "When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. Once you use this trait, you can't do so again until you finish a long rest."
    },
    // S
    {
        name: "Savage Attacks",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "attack",
                on: "weaponMelee"
            }
        ],
        desc: "When you score a critical hit with a melee weapon attack, you can roll one of the weapon's damage dice one additional time and add it to the extra damage of the critical hit."
    },
    {
        name: "Sentry's Rest",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        desc: "When taking a long rest, at least 6 hours must be spent motionless."
    },
    {
        name: "Soul Debt",
        source: { short: "OMP", long: "Once Mortal Primer" },
        type: "origin",
        effect: [
            {
                type: "disadvantage",
                on: "skillDeception"
            },
            {
                type: "advantage",
                on: "skillPersuasion"
            }
        ],
        desc: "Fiends recognize your lineage. You have disadvantage on Charisma (Deception) checks when lying to fiends, and advantage on Charisma (Persuasion) checks when offering them something they desire."
    },
    {
        name: "Specialized Design",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "proficiency",
                on: "skill",
                effect: [
                    {
                        type: "choice",
                        skill: ["any"],
                        value: 1
                    },
                ]
            },
            {
                type: "proficiency",
                on: "tool",
                effect: [
                    {
                        type: "choice",
                        tool: ["any"],
                        value: 1
                    },
                ]
            }
        ],
        desc: "You gain one skill proficiency and one tool proficiency of your choice."
    },
    {
        name: "Stone Camouflage",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "advantage",
                on: "skillStealth"
            }
        ],
        desc: "You have advantage on Dexterity (Stealth) checks to hide in rocky terrain."
    },
    {
        name: "Stonecunning",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "actionBonus"
            }
        ],
        desc: "As a Bonus Action, you gain Tremorsense with a range of 60 feet for 10 minutes. You must be on a stone surface or touching a stone surface to use this Tremorsense. The stone can be natural or worked. You can use this Bonus Action a number of times equal to your Proficiency Bonus, and you regain all expended uses when you finish a Long Rest."
    },
    {
        name: "Stone's Endurance",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        desc: "You can focus yourself to occasionally shrug off injury. "+
        "When you take damage, you can use your reaction to roll a D12. "+
        "Add your Constitution modifier to the number rolled, and reduce the damage by that total. "+
        "After you use this trait, you can't use it again until you finish a short or long rest."
    },
    {
        name: "Storm Affinity",
        source: { short: "OMP", long: "Once Mortal Primer" },
        type: "origin",
        effect: [
            {
                type: "resistance",
                on: "lightning"
            }
        ],
        desc: "You have resistance to lightning damage. When you roll lightning or thunder damage, you can reroll one damage die and must use the new result."
    },
    {
        name: "Survivor",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "proficiency",
                on: "skillSurvival"
            }
        ],
        desc: "You have proficiency in the Survival skill."
    },
    // T
    {
        name: "Talons",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "unarmedStrike"
            },
            {
                type: "advantage",
                on: "skillAthletics"
            }
        ],
        desc: "You are proficient with your unarmed strikes, which deal 1D4 + your Strength modifier slashing damage on a hit. Additionally, you have advantage on Strength (Athletics) checks made to climb any surface your talons could reasonably grip."
    },
    {
        name: "Tinker",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "Toy",
                effect: [
                    {
                        type: "choice",
                        feat: ["Clockwork Toy", "Fire Starter", "Music Box"],
                        value: 1
                    },
                ]
            }
        ],
        desc: "You have proficiency with artisan's tools (tinker's tools). Using those tools, you can spend 1 hour and 10 gp worth of materials to construct a Tiny clockwork device (AC 5, 1 hp). The device ceases to function after 24 hours (unless you spend 1 hour repairing it to keep the device functioning), or when you use your action to dismantle it; at that time, you can reclaim the materials used to create it. You can have up to three such devices active at a time. When you create a device, choose one of the following options."
    },
    {
        name: "Tool Proficiency",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "proficiency",
                on: "tool",
                effect: [
                    {
                        type: "choice",
                        tool: ["Smith's Tools","Brewer's Supplies","Mason's Tools"],
                        value: 1
                    },
                ]
            }
        ],
        desc: "You have proficiency with the battleaxe, handaxe, light hammer, and warhammer."
    },
    // Tinker Toy
    {
        name: "Toy",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "feat",
                feats: [
                    {
                        name: "Clockwork Toy",
                        desc: "This toy is a clockwork animal, monster, or person, such as a frog, mouse, bird, dragon, or soldier. When placed on the ground, the toy moves 5 feet across the ground on each of your turns in a random direction. It makes noises as appropriate to the creature it represents."
                    },
                    {
                        name: "Fire Starter",
                        desc: "The device produces a miniature flame, which you can use to light a candle, torch, or campfire. Using the device requires your action."
                    },
                    {
                        name: "Music Box",
                        desc: "When opened, this music box plays a single song at a moderate volume. The box stops playing when it reaches the song's end or when it is closed."
                    },
                ]
            }
        ],
        desc: "You have proficiency with artisan's tools (tinker's tools). Using those tools, you can spend 1 hour and 10 gp worth of materials to construct a Tiny clockwork device (AC 5, 1 hp). The device ceases to function after 24 hours (unless you spend 1 hour repairing it to keep the device functioning), or when you use your action to dismantle it; at that time, you can reclaim the materials used to create it. You can have up to three such devices active at a time. When you create a device, choose one of the following options."
    },
    {
        name: "Trance",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "immune",
                on: "condition"
            }
        ],
        desc: "You don't need sleep, and magic can't put you to sleep. You can finish a Long Rest with just 4 hours of meditation."
    },
    {
        name: "TranceAE",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "immune",
                on: "condition"
            }
        ],
        desc: "You don't need to sleep, and magic can't put you to sleep. "+
        "You can finish a long rest in 4 hours if you spend those hours in a trancelike meditation, during which you remain conscious. "+
        "Whenever you finish this trance, you gain proficiency in one skill of your choice and with one weapon or tool of your choice. "+
        "You mystically acquire these proficiencies by drawing them from shared elven memory and the experiences of entities on the Astral Sea, and you retain them until you finish your next long rest."
    },
    // U
    // V
    {
        name: "Vampiric Resistance",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        type: "origin",
        effect: [
            {
                type: "resistance",
                on: "necrotic"
            }
        ],
        desc: "You have resistance to necrotic damage."
    },
    // W
    {
        name: "Wings of Heaven",
        source: { short: "OMP", long: "Once Mortal Primer" },
        type: "origin",
        effect: [
            {
                type: "bonusAction"
            }
        ],
        desc: "Feathers grace your limbs or back. As a bonus action, you manifest spectral wings for 1 minute, gaining a fly speed of 30 ft. You can use this trait a number of times equal to your proficiency bonus, regaining all uses after a long rest."
    },
    // X
    // Y
    // Z
];
// Get Feature Object from String
DND_API.getFeat = function(str) {
    // If string is the name of a feature
    if (DND_API.Features.find(f => f.name === str)) {
        return DND_API.Features.find(f => f.name === str);
    }
    // If string is the type of a feature
    else if (DND_API.Features.find(f => f.type === str)) {
        return DND_API.Features.find(f => f.type === str);
    }
    // If string is the source of a feature
    else if (DND_API.Features.find(f => f.source.short === str || f.source.long === str)) {
        return DND_API.Features.find(f => f.source.short === str || f.source.long === str);
    }
    // If string is looking for any/all feature
    else if (str === "any" || str === "all") {
        return DND_API.Features;
    }
    // If string is anything else, return an error
    else {
        console.error("DND_API.getFeat(str) Error. Invalid string passed.")
    }
}
// Guns Dataset
DND_API.Guns = {
    pistols: [
        {
            name: "CIP - Standard",
            damage: "1d10",
            range: "10/75",
            ammo: 15,
            weight: 4,
            decibels: 165,
            accuracy: 1
        },
        {
            name: "CIP - Heavy",
            damage: "1d12",
            range: "10/75",
            ammo: 10,
            weight: 5,
            decibels: 160,
            accuracy: 0
        },
        {
            name: "CIP - Revolver",
            damage: "2d8",
            range: "20/150",
            ammo: 6,
            weight: 7.5,
            decibels: 175,
            accuracy: -1
        },
        {
            name: "FN-P - Prop-Pulse",
            damage: "1d8",
            range: "10/75",
            ammo: 6,
            weight: 9,
            decibels: 120,
            accuracy: -2
        },
        {
            name: "DMW - TwTi",
            damage: "2d4",
            range: "0/50",
            ammo: 8,
            weight: 14,
            decibels: 60,
            accuracy: 0
        },
        {
            name: "DEW - V3",
            damage: "1d20",
            range: "10/500",
            ammo: 999,
            weight: 12,
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
            weight: 14,
            decibels: 175,
            accuracy: 0
        },
        {
            name: "FA - 39",
            damage: "2d8",
            range: "50/300",
            ammo: 30,
            weight: 16,
            decibels: 170,
            accuracy: -1
        },
        {
            name: "FA - 51",
            damage: "3d12",
            range: "80/1000",
            ammo: 20,
            weight: 18,
            decibels: 165,
            accuracy: -3
        },
        {
            name: "FN-R - Prop-Pulse",
            damage: "3d6",
            range: "50/300",
            ammo: 30,
            weight: 18,
            decibels: 125,
            accuracy: -3
        },
        {
            name: "DMW - ExR",
            damage: "4d4",
            range: "10/100",
            ammo: 16,
            weight: 14,
            decibels: 90,
            accuracy: 1
        },
        {
            name: "DEW - RV-V1",
            damage: "2d20",
            range: "50/1000",
            ammo: 999,
            weight: 24,
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
            weight: 14,
            decibels: 170,
            accuracy: -2
        },
        {
            name: "OSG - Semi",
            damage: "3d6",
            range: "5/150",
            ammo: 8,
            weight: 16,
            decibels: 165,
            accuracy: -1
        },
        {
            name: "FN-Sg - WUTYH",
            damage: "4d6",
            range: "0/50",
            ammo: 2,
            weight: 20,
            decibels: 125,
            accuracy: -4
        },
        {
            name: "DMW - H.O.L.E",
            damage: "3d8",
            range: "0/25",
            ammo: 8,
            weight: 30,
            decibels: 120,
            accuracy: 1
        },
        {
            name: "DEW - SV-V4",
            damage: "3d20",
            range: "5/500",
            ammo: 999,
            weight: 28,
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
            weight: 24,
            decibels: 170,
            accuracy: 2
        },
        {
            name: "NIS - Heavy",
            damage: "4d12",
            range: "1000/6600/13000",
            ammo: 5,
            weight: 62.4,
            decibels: 175,
            accuracy: 0
        },
        {
            name: "NIS - Light",
            damage: "4d6",
            range: "250/1000/2000",
            ammo: 10,
            weight: 21,
            decibels: 160,
            accuracy: 3
        },
        {
            name: "NIS - Tactical",
            damage: "5d8",
            range: "250/4100/8200",
            ammo: 5,
            weight: 28.4,
            decibels: 165,
            accuracy: 1
        },
        {
            name: "CI-A-JFK",
            damage: "2d20",
            range: "66/8200/26000",
            ammo: 30,
            weight: 31,
            decibels: 180,
            accuracy: -2
        },
        {
            name: "CI-A-MLK",
            damage: "3d20",
            range: "500/8200",
            ammo: 5,
            weight: 31.8,
            decibels: 190,
            accuracy: -1
        },
        {
            name: "DEW - SnV-V6",
            damage: "4d20",
            range: "100/13000",
            ammo: 999,
            weight: 74.8,
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
            weight: 54,
            decibels: 175,
            accuracy: -3
        },
        {
            name: "CIM - Light",
            damage: "1d4",
            range: "30/2000",
            ammo: 30,
            weight: 26,
            decibels: 170,
            accuracy: -2
        },
        {
            name: "CIM - Heavy",
            damage: "3d4",
            range: "50/1000",
            ammo: 100,
            weight: 98,
            decibels: 180,
            accuracy: 0
        },
        {
            name: "CIM - SpecOps",
            damage: "1d6",
            range: "30/2000",
            ammo: 50,
            weight: 36,
            decibels: 165,
            accuracy: -1
        },
        {
            name: "DEW - LMG-P1",
            damage: "1d20",
            range: "30/4000",
            ammo: 999,
            weight: 89.64,
            decibels: 300,
            accuracy: -3
        },
        {
            name: "DEW - LMG-SBB",
            damage: "2d20",
            range: "60/2000",
            ammo: 999,
            weight: 72,
            decibels: 275,
            accuracy: -6
        },
    ],
    atws: [
        {
            name: "CIAT - Standard",
            damage: "2d12",
            range: "160/2200",
            ammo: 3,
            weight: 44,
            decibels: 300,
            accuracy: -3
        },
        {
            name: "CIAT - Light",
            damage: "1d20",
            range: "160/16400",
            ammo: 1,
            weight: 28,
            decibels: 275,
            accuracy: -3
        },
        {
            name: "CIAT - Heavy",
            damage: "2d20",
            range: "100/16400",
            ammo: 3,
            weight: 98,
            decibels: 325,
            accuracy: -3
        },
        {
            name: "FN-AT - Prop-Pulse",
            damage: "4d20",
            range: "40/1400",
            ammo: 1,
            weight: 69,
            decibels: 160,
            accuracy: -6
        },
        {
            name: "DEW - White-Nova",
            damage: "3d20",
            range: "100/4000",
            ammo: 1,
            weight: 89.64,
            decibels: 325,
            accuracy: -10
        },
    ],
    rail: [
        {
            name: "DRW - Spike",
            damage: "4d20",
            range: "100/4000",
            ammo: 5,
            weight: 67,
            decibels: 100,
            accuracy: -6
        },
        {
            name: "DRW - Orbital",
            damage: "2d20",
            range: "100/10000",
            ammo: 5,
            weight: 98,
            decibels: 150,
            accuracy: -4
        },
    ],
};
// Gun Attachments Dataset
DND_API.GAttachments = {
    silencer: [
        { name: "No Suppressor", damage: "0", decibels: 0, weight: 0 },
        { name: "RC-Su Standard", damage: "-1 die size", decibels: "-30", weight: 1 },
        { name: "RC-Su Premium", damage: "-1 die size", decibels: "-40", weight: 2 },
        { name: "RC-Su Tactical", damage: "0", decibels: "-35", weight: 3 },
        { name: "RC-Su Spec-Ops", damage: "-1 dice", decibels: "-60", weight: 4 },
        { name: "RC-Su Loudencer", damage: "+1 die size", decibels: "+10", weight: 2 },
    ],
    frame: [
        { name: "RC-F Standard", weight: 0, accuracy: 0 },
        { name: "RC-F Light", weight: -1, accuracy: -1 },
        { name: "RC-F Heavy", weight: 5, accuracy: 3 },
        { name: "RC-F Alloy", weight: 3.2, accuracy: 2 },
        { name: "RC-F Tungsten", weight: 16, accuracy: 4 },
        { name: "RC-F Spec-Ops", weight: 1.4, accuracy: 1 },
    ],
    stock: [
        { name: "No Stock", weight: 0, accuracy: 0 },
        { name: "RC-St Collapsible", weight: 2, accuracy: 1 },
        { name: "RC-St Tactical", weight: 3, accuracy: 2 },
        { name: "RC-St Heavy", range: "+10%/+20%/+20%", weight: 10, accuracy: 4 },
        { name: "RC-St Tungsten", range: "+15%/+25%/+25%", weight: 15, accuracy: 6 },
        { name: "RC-St Spec-Ops", range: "+5%/+5%/+5%", weight: 7, accuracy: 3 },
    ],
    grip: [
        { name: "No Grip", weight: 0, accuracy: 0 },
        { name: "RC-G Collapsible", weight: 2, accuracy: 1 },
        { name: "RC-G Tactical", weight: 3, accuracy: 2 },
        { name: "RC-G Heavy", range: "+10%/+20%/+20%", weight: 10, accuracy: 4 },
        { name: "RC-G Tungsten", range: "+15%/+25%/+25%", weight: 15, accuracy: 6 },
        { name: "RC-G Spec-Ops", range: "+5%/+5%/+5%", weight: 7, accuracy: 3 },
    ],
    barrel: [
        { name: "RC-B Standard", damage: "0", range: "0", decibels: "0", weight: 0 },
        { name: "RC-B Light", damage: "0", range: "0", decibels: "-10", weight: 1 },
        { name: "RC-B Heavy", damage: "+1 die size", range: "+20/40/10%", decibels: "-10", weight: 4 },
        { name: "RC-B Alloy", damage: "0", range: "+20/40/80", decibels: "0", weight: 2 },
        { name: "RC-B Tungsten", damage: "+1 die size", range: "+20/40/10%", decibels: "-20", weight: 6 },
        { name: "RC-B Spec-Ops", damage: "-1 dice", range: "-10/0/0", decibels: "-20", weight: 1 },
        { name: "RC-B Insulating", damage: "-1 die size", range: "+10/0/0", decibels: "-25", weight: 2 },
        { name: "RC-B Streamlinedd", damage: "+1 dice", range: "-10/+10/-20", decibels: "+5", weight: 3 },
    ],
    magazine: [
        { name: "RC-M Standard", ammo: "0", damage: "0", weight: 0 },
        { name: "RC-M Common", ammo: "+25%", damage: "0", weight: 0.4 },
        { name: "RC-M Tactical", ammo: "+50%", damage: "0", weight: 0.8 },
        { name: "RC-M Spec-Ops", ammo: "+100%", damage: "0", weight: 1.6 },
        { name: "RC-M Drum", ammo: "+200%", damage: "0", weight: 4 },
        { name: "RC-Ab Feed Strip", ammo: "0", damage: "+1 dice", weight: 2.26 },
        { name: "RC-Ab Chain", ammo: "0", damage: "+2 dice", weight: 4.1 },
        { name: "RC-Ab Belt", ammo: "0", damage: "+3 dice", weight: 6.2 },
        { name: "RC-Ab A-Strip", ammo: "+25%", damage: "+1 dice", weight: 2.7 },
        { name: "RC-Ab D-Strip", ammo: "+50%", damage: "+1 dice", weight: 6.2 },
        { name: "RC-Ab D-Belt", ammo: "+25%", damage: "+3 dice", weight: 12.6 },
        { name: "DEW-Battery", ammo: "0", damage: "0", weight: 3 },
        { name: "DEW-ECB", ammo: "+2.5%", damage: "0", weight: 5 },
        { name: "DEW-DCG", ammo: "+101", damage: "-2 dice", weight: 16 },
        { name: "DEW-RVC", ammo: "+5%", damage: "0", weight: 8 },
        { name: "DEW-PPB", ammo: "+25%", damage: "-1 dice -1 die size", weight: 24 },
        { name: "DEW-NRB", ammo: "+100%", damage: "-2 dice -1 die size", weight: 48 },
        { name: "DEW-Release", ammo: "-99%", damage: "+4 dice", weight: 16 },
    ],
    scope: [
        { name: "RC-Sc Standard", range: "0", weight: 0, accuracy: 0 },
        { name: "RC-Sc Premium", range: "+5%/+10%/+5%", weight: 1.5, accuracy: 1 },
        { name: "RC-Sc Halo", range: "0/+100%/+50%", weight: 2.8, accuracy: 0 },
        { name: "RC-Sc Predator", range: "-25%/-50%/-75%", weight: 2.2, accuracy: 4 },
        { name: "RC-Sc S-Tactical", range: "0/+25%/+50%", weight: 1.2, accuracy: 1 },
        { name: "RC-Sc FR-Tactical", range: "0/+50%/+25%", weight: 1.2, accuracy: 2 },
        { name: "RC-Sc S-Spec-Ops", range: "+15%/+50%/+25%", weight: 2, accuracy: 2 },
        { name: "RC-Sc FR-Spec-Ops", range: "-20%/-10%/-10%", weight: 2, accuracy: 3 },
        { name: "RC-Sc Thermal", range: "0", weight: 2, accuracy: 0 },
        { name: "RC-Sc T-Thermal", range: "+5%/+10%/+5%", weight: 3, accuracy: 0 },
        { name: "RC-Sc S-Thermal", range: "+15%/+30%/+15%", weight: 5.6, accuracy: 0 },
    ],
    sight: [
        { name: "No Sight", accuracy: 0, range: "0", damage: "0", decibels: 0, weight: 0 },
        { name: "RC-Si Laser", accuracy: 1, range: "-10%/+10%", damage: "0", decibels: 0, weight: 0.4 },
        { name: "RC-Si Int-Laser", accuracy: 1, range: "-10%/0", damage: "0", decibels: 0, weight: 0.2 },
        { name: "RC-Si Predator", accuracy: 2, range: "-5%/-30%", damage: "+1 dice", decibels: 0, weight: 0.66 },
    ],
    bullet: [
        { name: "RC-B Standard", ammo: "0", range: "0", damage: "0", decibels: 0, weight: 0, type: "Piercing" },
        { name: "RC-B-9", ammo: "+33%", range: "-10%/-10%/-50%", damage: "-1 die size", decibels: "5%", weight: -0.05, type: "Piercing" },
        { name: "RC-B-45", ammo: "-10%", range: "-5%/+10%/+10%", damage: "0", decibels: "-5%", weight: 0.0, type: "Piercing" },
        { name: "RC-B-22", ammo: "+50%", range: "+20%/+10%/+20%", damage: "+1 dice -1 die size", decibels: "-5%", weight: 0.1, type: "Piercing" },
        { name: "RC-B-3O8", ammo: "-20%", range: "+0/+75%/+25%", damage: "+1 die size", decibels: "10%", weight: 0.2, type: "Piercing" },
        { name: "RC-B 12-Slug", ammo: "-50%", range: "-10%/-15%/-75%", damage: "+1 dice +1 die size", decibels: "10%", weight: 0.15, type: "Piercing" },
        { name: "RC-B T-Slug", ammo: "0", range: "-10%/-15%/-75%", damage: "+1 die size", decibels: "-15%", weight: 3.6, type: "Piercing" },
        { name: "RC-B-22-Segmented", ammo: "0", range: "-10%/-15%/-30%", damage: "-2 die size", decibels: "-50%", weight: 0.2, type: "Piercing" },
        { name: "RC-B IE", ammo: "-20%", range: "0", damage: "+1 dice", decibels: "+10%", weight: 0.4, type: "Piercing (Fire)" },
        { name: "RC-B II", ammo: "-25%", range: "0", damage: "+1 dice -1 die size", decibels: "+10%", weight: 0.6, type: "Piercing (Burned)" },
        { name: "RC-B Incendiary", ammo: "-20%", range: "0", damage: "+1 dice", decibels: "+5%", weight: 0.5, type: "Fire (Burned)" },
        { name: "RC-B NL-Stun", ammo: "+20%", range: "0", damage: "-1 dice -1 die size", decibels: "-10%", weight: 0.8, type: "Lightning" },
        { name: "RC-B Stun", ammo: "-10%", range: "0", damage: "+1 dice", decibels: "+15%", weight: 1.2, type: "Thunder" },
        { name: "RC-B Shock", ammo: "-10%", range: "0", damage: "+1 die size", decibels: "0", weight: 0.6, type: "Lightning" },
        { name: "RC-M PLUG", ammo: "-50%", range: "-20%/-20%/-100%", damage: "0", decibels: "-5%", weight: 2, type: "Piercing (Magnetic)" },
        { name: "RC-M PUNCH", ammo: "-50%", range: "-20%/-20%/-80%", damage: "0", decibels: "-5%", weight: 2.5, type: "Piercing (Magnetic)" },
        { name: "RC-M SLAM", ammo: "-50%", range: "-20%/-20%/-100%", damage: "0", decibels: "-5%", weight: 4, type: "Bludgeoning (Magnetic)" },
        { name: "RC-M DRILL", ammo: "-50%", range: "-20%/-20%/-75%", damage: "+1 dice", decibels: "-2.5%", weight: 4, type: "Piercing (Magnetic)" },
        { name: "RC-M HOLE", ammo: "-75%", range: "-20%/-20%/-100%", damage: "+2 dice -1 die size", decibels: "-7.5%", weight: 6, type: "Piercing (Magnetic)" },
        { name: "RC-M SPARK", ammo: "-25%", range: "-20%/-20%/-80%", damage: "0", decibels: "-7.5%", weight: 4, type: "Lightning (Magnetic)" },
        { name: "RC-E Laser", ammo: "0", range: "0", damage: "0", decibels: 0, weight: 0, type: "Radiant" },
        { name: "RC-E Plasma", ammo: "0", range: "-25%/-50%/-75%", damage: "+1 dice", decibels: "5%", weight: 0.2, type: "Fire" },
        { name: "RC-E Ion", ammo: "0", range: "0/+25%/+50%", damage: "0", decibels: "10%", weight: -0.05, type: "Radiant" },
        { name: "RC-E Particles", ammo: "0", range: "0/-50%/-75%", damage: "+1 die size", decibels: "-33%", weight: -0.1, type: "Fire" },
        { name: "RC-E EMP", ammo: "0", range: "+10%/+20%/+10%", damage: "0", decibels: "5%", weight: 2, type: "Thunder" },
        { name: "RC-W Warhead", ammo: "0", range: "0/0/0", damage: "0", decibels: "10%", weight: 0.0, type: "Bludgeoning" },
        { name: "RC-W Wasp", ammo: "+50%", range: "0/-50%/-50%", damage: "+2 dice -1 die size", decibels: "-10%", weight: -1, type: "Piercing" },
        { name: "RC-W HEAT", ammo: "0", range: "+15%/0/0", damage: "+1 dice, +1 die size", decibels: "20%", weight: 2.0, type: "Force" },
        { name: "RC-W NF", ammo: "-50%", range: "0/0/0", damage: "0", decibels: "0", weight: 6.0, type: "Necrotic" },
        { name: "RC-W NG", ammo: "-25%", range: "0/0/0", damage: "0", decibels: "-15%", weight: -2.0, type: "Poison" },
        { name: "RC-R-3O8", ammo: "0", range: "-10%/+50%/+25%", damage: "+2 dice", decibels: "+15%", weight: 0.4, type: "Lightning" },
        { name: "RC-R-Sound", ammo: "0", range: "0/0/0", damage: "0", decibels: "+25%", weight: 0.8, type: "Thunder (decible)" },
    ],
    light: [
        { name: "No Light", weight: 0 },
        { name: "RC-L Standard", weight: 0.4 },
        { name: "RC-L 1000L", weight: 1.2 },
        { name: "RC-L A-1KL", weight: 2.4 },
        { name: "RC-L TA-1KL", weight: 3.6 },
    ],
    switch: [
        { name: "Semi-Automatic", accuracy: 0, weight: 0 },
        { name: "Burst Fire", accuracy: -3, weight: 2 },
        { name: "Fully Automatic", accuracy: -8, weight: 4 },
    ],
}
// Languages Dataset
DND_API.Languages = [
    {
        name: "Common",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        speakers: "Most Humanoid races learn at least a little bit of Common.",
        script: "Common",
        rarity: "Standard",
        desc: "A simple and malleable language, Common is the most widely spoken language in the Realms."
    },
    {
        name: "Abyssal",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        speakers: "Demons and lesser Fiends speak Abyssal as their native tongue.",
        script: "Infernal",
        rarity: "Rare",
        desc: "A simplistic language that is also harsh, guttural, difficult to pronounce, and disgusting."
    },
    {
        name: "Aven",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        speakers: "Aarakocra, Strig, and other bird-like races speak Aven.",
        script: "Draconic",
        rarity: "Standard",
        desc: "A tonal language with many inflections, Aven is known for its speed and efficiency."
    },
    {
        name: "Celestial",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        speakers: "Celestials, Angels, Gods, and other beings of the Upper Planes speak Celestial.",
        script: "Celestial",
        rarity: "Rare",
        desc: "A soft flowing language which is able to be sung as easily as spoken. Celestial is known for its beauty and elegance."
    },
    {
        name: "Deep Speech",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        speakers: "Mind Flayers, Beholders, and other aberrations speak Deep Speech.",
        script: "None",
        rarity: "Rare",
        desc: "A language of strange sounds and vocalizations, Deep Speech is difficult for non-aberrations to pronounce."
    },
    {
        name: "Draconic",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        speakers: "Dragons, Dragonborn, and other reptilian and avian races speak Draconic.",
        script: "Draconic",
        rarity: "Rare",
        desc: "Often used in the study of magic, Draconic is a complex language with many hard consonants and sibilants."
    },
    {
        name: "Druidic",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        speakers: "Druids are the only speakers of Druidic.",
        script: "None",
        rarity: "Secret",
        desc: "A secret language known only to Druids. Druidic is a combination of sounds and gestures, and is not written down."
    },
    {
        name: "Dwarvish",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        speakers: "Dwarves.",
        script: "Runic",
        rarity: "Standard",
        desc: "Full of harsh consonants and guttural sounds, these cahracters often bleed into other languags one who learned Dwarvish speaks."
    },
    {
        name: "Elvish",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        speakers: "Elves.",
        script: "Elvish",
        rarity: "Rare",
        desc: "A fluid language with intricate grammar and subtleties to inflections and intonations. " +
            "The literature of Elvish is rich and varied, and its songs and poems are famous among other races and Realms. " +
            "Elvish is the most complex language, despite this, many try to learn it."
    },
    {
        name: "Giant",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        speakers: "Giants, Goliaths, Orc, Ogres, Cyclopses, Minotaurs, and some Dwarves.",
        script: "Dwarvish",
        rarity: "Standard",
        desc: "A simplistic language with a wide and guttural vocabulary, but very little grammar or writing."
    },
    {
        name: "Gith",
        source: {
            short: "MM",
            long: "Monster Manual"
        },
        speakers: "Githyanki and Githzerai.",
        script: "Runic",
        rarity: "Standard",
        desc: "An incredibly large but easy to learn language. Gith is known for its sophistication, and simplicity despite its size."
    },
    {
        name: "Gnomish",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        speakers: "Gnomes, and Dwarves.",
        script: "Dwarvish",
        rarity: "Standard",
        desc: "Treated as an expansion of Dwarvish, Gnomish is a complex language made for use on mathematics and catalogues."
    },
    {
        name: "Goblin",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        speakers: "Goblins, and Hobgoblins.",
        script: "Dwarvish",
        rarity: "Standard",
        desc: "A very simplistic language with limited vocabulary, Goblin is often considered crude and unsophisticated."
    },
    {
        name: "God",
        source: {
            short: "OMP",
            long: "Once Mortal Primer"
        },
        speakers: "Gods, higher Celestials, higher Devils, Ancient Dragons.",
        script: "Celestial",
        rarity: "Exotic",
        desc: "A language which flows similarly to Celestial, but has a much more subtle rhythym and is far more polite sounding."
    },
    {
        name: "Halfing",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        speakers: "Many humanoid races are able to at least understand Halfing.",
        script: "Dwarvish",
        rarity: "Standard",
        desc: "A gramatically tubborn but cheerfully spoken language, Halfling is known for its earthy humor and proverbs."
    },
    {
        name: "Infernal",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        speakers: "Devils and greater Fiends speak Infernal as their native tongue.",
        script: "Infernal",
        rarity: "Exotic",
        desc: "A fluid but harsh language taught only to those who have earned the right to learn it."
    },
    {
        name: "Primordial",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        speakers: "Elementals",
        script: "Dwarvish",
        rarity: "Rare",
        desc: "A guttural language, Primordial has four dialects: Aquan (water), Auran (air), Ignan (fire), and Terran (earth). Speakers of one dialect can usually understand the others."
    },
    {
        name: "Sylvan",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        speakers: "Creatures from the Feywild speak Sylvan.",
        script: "Elvish",
        rarity: "Standard",
        desc: "A smooth language which is far more simplistic and convenient than Elvish."
    },
    {
        name: "Thieves' Cant",
        source: {
            short: "PHB",
            long: "Player's Handbook"
        },
        speakers: "Criminals, Rogues, Assassins, and other underworld figures speak Thieves' Cant.",
        script: "Based on many scripts",
        rarity: "Secret",
        desc: "A secret mix of dialects, jargon, and code which allows messages to be hidden in ."
    },
    {
        name: "Titanic",
        source: {
            short: "OMP",
            long: "Once Mortal Primer"
        },
        speakers: "Titans",
        script: "Aurum Regem's Interpretation",
        rarity: "Secret",
        desc: "A language that is only used by Titans when conversing with oneanother, it is a language similar to Deep Speech; made up of sounds, vibrations, and gestures."
    },
];
// Language Functions
// Get Language Object from String
DND_API.getLanguage = function(str) {
    // If string is the name of a language
    if (DND_API.Languages.find(name => name.name === str)) {
        return DND_API.Languages.find(l => l.name === str);
    }
    // If string is looking for any standard language
    else if (str === "anyStandard") {
        return DND_API.Languages.find(l => l.rarity === "Standard");
    }
    // If string is looking for any rare language
    else if (str === "anyRare") {
        return DND_API.Languages.find(l => l.rarity === "Rare");
    }
    // If string is looking for any exotic language
    else if (str === "anyExotic") {
        return DND_API.Languages.find(l => l.rarity === "Exotic");
    }
    // If string is looking for any/all languages
    else if (str === "any" || str === "all") {
        return DND_API.Languages.find(l => l.rarity != "Secret");
    }
    // If string is anything else, return an error
    else {
        console.error("DND_API.getLanguage(str) Error. Invalid string passed.")
    }
}
// Locations Dataset
DND_API.Locations = [
    // Once-Mortal Specific Locations
    {
        name: "The City",
        source: {
            short: "OMP",
            long: "Once Mortal Primer"
        },
        realm: "Divine Realm",
        rules: [ "noClass" ],
    },
    {
        name: "Celestial Heaven",
        source: {
            short: "OMP",
            long: "Once Mortal Primer"
        },
        realm: "Divine Realm",
        rules: [  ],
    },
    {
        name: "Infernal Hell",
        source: {
            short: "OMP",
            long: "Once Mortal Primer"
        },
        realm: "Divine Realm",
        rules: [  ],
    },
    {
        name: "The Empire of Shaire",
        source: {
            short: "OMP",
            long: "Once Mortal Primer"
        },
        realm: "Astral Sea",
        rules: [  ],
    },
    {
        name: "Neo-Neprad",
        source: {
            short: "OMP",
            long: "Once Mortal Primer"
        },
        realm: "Astral Sea",
        rules: [ "noClass", "noBackground" ],
    },
    {
        name: "Realm of Beasts",
        source: {
            short: "OMP",
            long: "Once Mortal Primer"
        },
        realm: "Realm of Beasts",
        rules: [ "noBackground" ],
    },
    {
        name: "Stronghold",
        source: {
            short: "OMP",
            long: "Once Mortal Primer"
        },
        realm: "Realm of Beasts",
        rules: [  ],
    },
];
// Location Functions
DND_API.getLocation = function(str) {
    // If string is the name of a location
    if (DND_API.Locations.find(l => l.name === str)) {
        return DND_API.Locations.find(l => l.name === str);
    }
    // If string is the source of a location
    else if (DND_API.Locations.find(l => l.source.short === str || l.source.long === str)) {
        return DND_API.Locations.find(l => l.source.short === str || l.source.long === str);
    }
    // If string is the name of a realm
    else if (DND_API.Locations.find(l => l.realm === str)) {
        return DND_API.Locations.find(l => l.realm === str);
    }
    // If string is looking for any/all locations
    else if (str === "any" || str === "all") {
        return DND_API.Locations;
    }
    // If string is not passed or looking for all names
    else if (!str || str === "allNames") {
        let locations = [];
        DND_API.Locations.forEach(l => { locations.push(l.name); });
        return locations;
    }
    // If string is anything else, return an error
    else {
        console.error("DND_API.getLocation(str) Error. Invalid string passed.");
        return;
    }
}
// Races Dataset
DND_API.Races = [
    {
        name: "Human", image: "ico/human.png",
        type: "Humanoid",
        source: { short: "OMP", long: "Once Mortal Primer" },
        size: {
            short: "M",
            long: "Medium"
        },
        age: {
            average: 80,
            mature: 16,
            max: 99
        },
        abilities: [
            {
                type: "granted",
                ability: ["strength"],
                value: 1
            },
            {
                type: "granted",
                ability: ["dexterity"],
                value: 1
            },
            {
                type: "granted",
                ability: ["constitution"],
                value: 1
            },
            {
                type: "granted",
                ability: ["intelligence"],
                value: 1
            },
            {
                type: "granted",
                ability: ["wisdom"],
                value: 1
            },
            {
                type: "granted",
                ability: ["charisma"],
                value: 1
            }
        ],
        speed: {
            walk: 30,
            fly: 0,
            hover: 0,
            burrow: 0,
            climb: 0,
            swim: 0
        },
        skills: [
            {
                type: "choice",
                skill: ["any"]
            }
        ],
        feats: [
            {
                type: "choice",
                feat: ["any"]
            }
        ],
        languages: [
            {
                type: "granted",
                lang: ["Common"]
            },
            {
                type: "choice",
                lang: ["anyStandard"]
            }
        ],
        description: "Native to Garna and Neo-Neprad. "+
        "Humans are as varied as they are numerous, and they endeavor to achieve as much as they can in the years they are given. "+
        "Their ambition and resourcefulness are commended, respected, and feared on many worlds. "+
        "Humans typically learn the languages of other peoples they deal with, including obscure dialects."
    },
    {
        name: "Halfling", image: "ico/halfling.png",
        type: "Humanoid",
        source: { short: "OMP", long: "Once Mortal Primer" },
        size: {
            short: "S",
            long: "Small"
        },
        age: {
            average: 250,
            mature: 20,
            max: 300
        },
        abilities: [
            {
                type: "granted",
                ability: ["dexterity"],
                value: 2
            }
        ],
        speed: {
            walk: 25,
            fly: 0,
            hover: 0,
            burrow: 0,
            climb: 0,
            swim: 0
        },
        feats: [
            {
                type: "granted",
                feat: ["Lucky"]
            },
            {
                type: "granted",
                feat: ["Brave"]
            },
            {
                type: "granted",
                feat: ["Nimble"]
            },
            {
                type: "granted",
                feat: ["Natural Stealth"]
            },
        ],
        languages: [
            {
                type: "granted",
                lang: ["Common"]
            },
            {
                type: "choice",
                lang: ["anyStandard"]
            }
        ],
        description: "Native to Garna. "+
        "Many halflings possess a brave and adventurous spirit that leads them on journeys of discovery, affording them the chance to explore a bigger world and make new friends along the way. "+
        "When a halfling is in mortal danger, an unseen force seems to intervene on the halfling's behalf. "+
        "The comforts of home are the goals of most halflings' lives: a place to settle in peace and quiet, far from marauding monsters and clashing armies; a blazing fire and a generous meal; fine drink and fine conversation."
    },
    {
        name: "Orc", image: "ico/orc.png",
        type: "Humanoid",
        source: { short: "OMP", long: "Once Mortal Primer" },
        size: {
            short: "M",
            long: "Medium"
        },
        age: {
            average: 50,
            mature: 16,
            max: 75
        },
        abilities: [
            {
                type: "granted",
                ability: ["strength"],
                value: 2
            },
            {
                type: "granted",
                ability: ["constitution"],
                value: 1
            },
            {
                type: "granted",
                ability: ["intelligence"],
                value: -2
            }
        ],
        speed: {
            walk: 30,
            fly: 0,
            hover: 0,
            burrow: 0,
            climb: 0,
            swim: 0
        },
        senses: {
            "darkvision": 60,
        },
        feats: [
            {
                type: "granted",
                feat: ["Aggressive"]
            },
            {
                type: "granted",
                feat: ["Primal Intuition"]
            },
            {
                type: "granted",
                feat: ["Powerful Build"]
            },
            {
                type: "granted",
                feat: ["Relentless Endurance"]
            },
            {
                type: "granted",
                feat: ["Savage Attacks"]
            },
        ],
        languages: [
            {
                type: "granted",
                lang: ["Common"]
            },
            {
                type: "granted",
                lang: ["Giant"]
            }
        ],
        description: "Native to Garna, most become mercenaries, all are shunned by the people of Garna. "+
        "Orcs are happy to leave old tales in the past and find their own way."
    },
    {
        name: "Dwarf", image: "ico/dwarf.png",
        type: "Humanoid",
        source: { short: "OMP", long: "Once Mortal Primer" },
        size: {
            short: "M",
            long: "Medium"
        },
        age: {
            average: 300,
            mature: 16,
            max: 350
        },
        abilities: [
            {
                type: "granted",
                ability: ["strength"],
                value: 1
            },
            {
                type: "granted",
                ability: ["constitution"],
                value: 2
            }
        ],
        senses: {
            "darkvision": 60
        },
        speed: {
            walk: 25,
            fly: 0,
            hover: 0,
            burrow: 0,
            climb: 0,
            swim: 0
        },
        feats: [
            {
                type: "granted",
                feat: ["Dwarven Resilience"]
            },
            {
                type: "granted",
                feat: ["Dwarven Combat Training"]
            },
            {
                type: "granted",
                feat: ["Dwarven Toughness"]
            },
            {
                type: "granted",
                feat: ["Tool Proficiency"]
            },
            {
                type: "granted",
                feat: ["Stonecunning"]
            },
            {
                type: "granted",
                feat: ["One With Stone"]
            }
        ],
        languages: [
            {
                type: "granted",
                lang: ["Common"]
            },
            {
                type: "granted",
                lang: ["Dwarvish"]
            }
        ],
        description: "Native to Jotunheim and Kyofu. "+
        "Dwarves are known as skilled warriors, miners, and workers of stone and metal. "+
        "Dwarves are solid and enduring like the mountains they love, weathering the passage of centuries with stoic endurance and little change. "+
        "They love the beauty and artistry of precious metals and fine jewelry, and in some dwarves this love festers into avarice."
    },
    {
        name: "Goliath", image: "ico/goliath.png",
        type: "Humanoid",
        source: { short: "OMP", long: "Once Mortal Primer" },
        size: {
            short: "M",
            long: "Medium"
        },
        age: {
            average: 80,
            mature: 16,
            max: 99
        },
        abilities: [
            {
                type: "granted",
                ability: ["strength"],
                value: 2
            },
            {
                type: "granted",
                ability: ["constitution"],
                value: 1
            }
        ],
        speed: {
            walk: 30,
            fly: 0,
            hover: 0,
            burrow: 0,
            climb: 0,
            swim: 0
        },
        feats: [
            {
                type: "granted",
                feat: ["Natural Athlete"]
            },
            {
                type: "granted",
                feat: ["Stone's Endurance"]
            },
            {
                type: "granted",
                feat: ["Powerful Build"]
            },
            {
                type: "granted",
                feat: ["Mountain Born"]
            },
        ],
        languages: [
            {
                type: "granted",
                lang: ["Common"]
            },
            {
                type: "granted",
                lang: ["Giant"]
            }
        ],
        description: "Native to Jotunheim and The Realm of Beasts. "+
        "The first goliaths lived on the highest mountain peaks—far above the tree line, where the air is thin and frigid winds howl. "+
        "Distantly related to giants and infused with the supernatural essence of their ancestors' mountainous home."
    },
    {
        name: "Gnome", image: "ico/gnome.png",
        type: "Humanoid",
        source: { short: "OMP", long: "Once Mortal Primer" },
        size: {
            short: "S",
            long: "Small"
        },
        age: {
            average: 350,
            mature: 16,
            max: 500
        },
        abilities: [
            {
                type: "granted",
                ability: ["dexterity"],
                value: 1
            },
            {
                type: "granted",
                ability: ["intelligence"],
                value: 2
            }
        ],
        speed: {
            walk: 25,
            fly: 0,
            hover: 0,
            burrow: 0,
            climb: 0,
            swim: 0
        },
        senses: {
            "darkvisionX": 60 // Darkvision variant that sees colour
        },
        feats: [
            {
                type: "granted",
                feat: ["Gnomish Cunning"]
            },
            {
                type: "granted",
                feat: ["Artificer's Lore"]
            },
            {
                type: "granted",
                feat: ["Stone Camoflauge"]
            },
            {
                type: "granted",
                feat: ["Tinker"]
            }
        ],
        languages: [
            {
                type: "granted",
                lang: ["Common"]
            },
            {
                type: "granted",
                lang: ["Gnomish"]
            }
        ],
        description: "Native to Jotunheim and Kyofu. "+
        "Gnomes try to take delight in life, enjoying every moment of invention, exploration, investigation, creation, and play. "+
        "As far as Gnomes are concerned, being alive is a wonderful thing, and they squeeze every ounce of enjoyment out of their three to five centuries of life. "+
        "Gnomes speak as if they can't get the thoughts out of their heads fast enough."
    },
    {
        name: "Warforged", image: "ico/warforged.png",
        type: "Humanoid",
        source: { short: "OMP", long: "Once Mortal Primer" },
        size: {
            short: "M",
            long: "Medium"
        },
        age: {
            average: -1,
            mature: -1,
            max: -1
        },
        abilities: [
            {
                type: "granted",
                ability: ["constitution"],
                value: 2
            },
            {
                type: "choice",
                ability: ["any"],
                value: 1
            }
        ],
        speed: {
            walk: 30,
            fly: 0,
            hover: 0,
            burrow: 0,
            climb: 0,
            swim: 0
        },
        feats: [
            {
                type: "granted",
                feat: ["Constructed Resilience"]
            },
            {
                type: "granted",
                feat: ["Specialized Design"]
            },
            {
                type: "granted",
                feat: ["Sentry's Rest"]
            },
            {
                type: "granted",
                feat: ["Integrated Protection"]
            },
        ],
        languages: [
            {
                type: "granted",
                lang: ["anyStandard"]
            }
        ],
        description: "Native to Jotunheim and Kyofu. "+
        "Warforged are made from wood and metal, but they can feel pain and emotion. "+
        "A warforged can be a steadfast ally, a cold-hearted killer, or a visionary in search of meaning. "+
        "Many warforged embrace a concrete purpose—such as protecting allies, completing a contract, or exploring a land—and embrace this task as they do war."
    },
    {
        name: "Vampire", image: "ico/vampire.png",
        type: "Humanoid",
        source: { short: "OMP", long: "Once Mortal Primer" },
        size: {
            short: "M",
            long: "Medium"
        },
        age: {
            average: -1,
            mature: -1,
            max: -1
        },
        abilities: [
            {
                type: "granted",
                ability: ["wisdom"],
                value: 1
            },
            {
                type: "granted",
                ability: ["charisma"],
                value: 2
            }
        ],
        speed: {
            walk: 30,
            fly: 0,
            hover: 0,
            burrow: 0,
            climb: 0,
            swim: 0
        },
        senses: {
            "darkvision": 60
        },
        feats: [
            {
                type: "granted",
                feat: ["Blood Thirst"]
            },
            {
                type: "granted",
                feat: ["Vampiric Resistance"]
            },
            {
                type: "granted",
                feat: ["Feast of Blood"]
            },
        ],
        languages: [
            {
                type: "granted",
                lang: ["Common"]
            },
            {
                type: "choice",
                lang: ["anyStandard"]
            }
        ],
        description: "Native to Garna, and The Felled Realm. "+
        "To members of the other races, vampires are a fearsome mystery and the stuff of nightmares. "+
        "Philosophically, they do not constrain themselves with artificial rules of morality, but believe that the strong can and should take what they need from the weak. "+
        "Their unique nature comes from an eldritch disease that turns their flesh cold, makes their gray or purple skin feel dead to the touch, and enables them to drain concentrated magical energy from the blood of other living creatures."
    },
    {
        name: "Elf", image: "ico/feywild.png",
        type: "Humanoid",
        source: { short: "OMP", long: "Once Mortal Primer" },
        size: {
            short: "M",
            long: "Medium"
        },
        age: {
            average: 400,
            mature: 100,
            max: 750
        },
        abilities: [
            {
                type: "granted",
                ability: ["wisdom"],
                value: 2
            }
        ],
        speed: {
            walk: 30,
            fly: 0,
            hover: 0,
            burrow: 0,
            climb: 0,
            swim: 0
        },
        senses: {
            "darkvision": 60
        },
        feats: [
            {
                type: "granted",
                feat: ["Fey Ancestry"]
            },
            {
                type: "granted",
                feat: ["Keen Senses"]
            },
            {
                type: "granted",
                feat: ["Trace"]
            },
        ],
        languages: [
            {
                type: "granted",
                lang: ["Common"]
            },
            {
                type: "granted",
                lang: ["Elvish"]
            }
        ],
        description: "Native to the Feywild. "+
        "Elves love nature and magic, art and artistry, music and poetry, and the good things of the world. "+
        "Elves have no facial and little body hair. "+
        "They favor elegant clothing in bright colors, and they enjoy simple yet lovely jewelry. "+
        "When pursuing a goal, whether adventuring on a mission or learning a new skill or art, Elves can be focused and relentless. "+
        "Most Elves dwell in small forest villages hidden among the trees."
    },
    {
        name: "High-Elf", image: "ico/feywild.png",
        type: "Humanoid",
        source: { short: "OMP", long: "Once Mortal Primer" },
        size: {
            short: "M",
            long: "Medium"
        },
        age: {
            average: 2000,
            mature: 100,
            max: -1
        },
        abilities: [
            {
                type: "granted",
                ability: ["dexterity"],
                value: 1
            },
            {
                type: "granted",
                ability: ["intelligence"],
                value: 2
            }
        ],
        speed: {
            walk: 30,
            fly: 0,
            hover: 0,
            burrow: 0,
            climb: 0,
            swim: 0
        },
        senses: {
            "darkvisionX": 60
        },
        feats: [
            {
                type: "granted",
                feat: ["Fey Ancestry"]
            },
            {
                type: "granted",
                feat: ["Keen Senses"]
            },
            {
                type: "granted",
                feat: ["Trace"]
            },
            {
                type: "granted",
                feat: ["Elf Weapon Training"]
            },
            {
                type: "granted",
                feat: ["Cantrip"]
            },
        ],
        languages: [
            {
                type: "granted",
                lang: ["Common"]
            },
            {
                type: "granted",
                lang: ["Elvish"]
            },
            {
                type: "choice",
                lang: ["any"]
            }
        ],
        description: "Native to the Feywild. "+
        "High-Elves can trace their roots back to the City of Laeto. "+
        "There are two different types of High-Elves, Sun Elves and Moon Elves. "+
        "There is are no inter-racial stereotypes or feud between the High-Elf races. "+
        "High-Elves believe themselves to be above the other races. "+
        "They remain neutral from all problems that occur across the Realms, but often observe, and record the happenings of the Realms. "+
        "The High-Elves birth the most prominent scholars and mages. "+
        "The majority of High-Elves are athiest, and do not believe in the concept of Gods, despite many of them attaining Godhood in their lifetimes."
    },
    {
        name: "Astral-Elf", image: "ico/feywild.png",
        type: "Humanoid",
        source: { short: "OMP", long: "Once Mortal Primer" },
        size: {
            short: "M",
            long: "Medium"
        },
        age: {
            average: 2000,
            mature: 100,
            max: -1
        },
        abilities: [
            {
                type: "granted",
                ability: ["wisdom"],
                value: 2
            }
        ],
        speed: {
            walk: 30,
            fly: 0,
            hover: 0,
            burrow: 0,
            climb: 0,
            swim: 0
        },
        senses: {
            "darkvisionX": 60
        },
        feats: [
            {
                type: "granted",
                feat: ["Fey Ancestry"]
            },
            {
                type: "granted",
                feat: ["Keen Senses"]
            },
            {
                type: "granted",
                feat: ["TraceAE"] // Astral Elf Variant
            },
            {
                type: "granted",
                feat: ["Astral Step"]
            },
        ],
        languages: [
            {
                type: "granted",
                lang: ["Common"]
            },
            {
                type: "granted",
                lang: ["Elvish"]
            },
            {
                type: "choice",
                lang: ["any"]
            }
        ],
        description: "Native to the Astral Sea. "+
        "Groups of Elves ventured from the Feywild to the Astral Sea to be closer to the center of the universe. "+
        "Because nothing ages on the Astral Sea, Astral Elves who inhabit that plane can be very old. "+
        "Some Astral Elves are prone to melancholy, wasting away on isolated islands. "+
        "Some Astral Elves grew to enjoy the chaos of the Astral Sea, studying it or pledging themselves to one of the more structured factions. "+
        "Very few Astral Elves join the VPF and are active participants in the chaos the Astral Sea breeds."
    },
    {
        name: "Fairy", image: "ico/fairy.webp",
        type: "Fey",
        source: { short: "OMP", long: "Once Mortal Primer" },
        size: {
            short: "S",
            long: "Small"
        },
        age: {
            average: -1,
            mature: -1,
            max: -1
        },
        abilities: [
            {
                type: "choice",
                ability: ["any"],
                value: 2
            },
            {
                type: "choice",
                ability: ["any"],
                value: 1
            },
        ],
        speed: {
            walk: 30,
            fly: 30,
            hover: 0,
            burrow: 0,
            climb: 0,
            swim: 0
        },
        feats: [
            {
                type: "granted",
                feat: ["Fairy Magic"]
            }
        ],
        languages: [
            {
                type: "granted",
                lang: ["Common"]
            },
            {
                type: "choice",
                lang: ["Sylvan","Elvish"]
            }
        ],
        description: "Native to the Feywild. "+
        "The first fairies spoke Elvish and Sylvan, and encounters with human visitors prompted many of them to learn Common as well. "+
        "Infused with the magic of the Feywild, most fairies look like Small elves with insectile wings, "+
        "but each fairy has a special physical characteristics."
    },
    {
        name: "Aarakocra", image: "ico/aarakocra.webp",
        type: "Humanoid",
        source: { short: "OMP", long: "Once Mortal Primer" },
        size: {
            short: "M",
            long: "Medium"
        },
        age: {
            average: 20,
            mature: 3,
            max: 50
        },
        abilities: [
            {
                type: "granted",
                ability: ["dexterity"],
                value: 2
            },
            {
                type: "granted",
                ability: ["wisdom"],
                value: 2
            },
        ],
        speed: {
            walk: 30,
            fly: 50,
            hover: 0,
            burrow: 0,
            climb: 0,
            swim: 0
        },
        feats: [
            {
                type: "granted",
                feat: ["Talons"]
            },
            {
                type: "granted",
                feat: ["Dive Attack"]
            },
        ],
        languages: [
            {
                type: "granted",
                lang: ["Common"]
            },
            {
                type: "granted",
                lang: ["Aven"]
            }
        ],
        description: "Native to the Aerialis. "+
        "They are immigrants, refugees, scouts, or soldiers killing for their masters. "+
        "They are subservient to various Dragons and Dragonborn from Aerialis. "+
        "Very few Aarakocra are free from the brutal slavery of Aerialis, and even fewer fight to remain so."
    },
    {
        name: "Strig", image: "ico/strig.jpg",
        type: "Humanoid",
        source: { short: "OMP", long: "Once Mortal Primer" },
        size: {
            short: "S",
            long: "Small"
        },
        age: {
            average: 60,
            mature: 15,
            max: 100
        },
        abilities: [
            {
                type: "granted",
                ability: ["strength"],
                value: 2
            },
            {
                type: "granted",
                ability: ["constitution"],
                value: 1
            },
        ],
        speed: {
            walk: 35,
            fly: 50,
            hover: 25,
            burrow: 0,
            climb: 0,
            swim: 0
        },
        senses: {
            "darkvisionX": 60
        },
        feats: [
            {
                type: "granted",
                feat: ["Glide"]
            },
            {
                type: "granted",
                feat: ["Talons"]
            },
            {
                type: "granted",
                feat: ["Patterned Feathers"]
            },
            {
                type: "granted",
                feat: ["Survivor"]
            },
        ],
        languages: [
            {
                type: "granted",
                lang: ["Common"]
            },
            {
                type: "granted",
                lang: ["Aven"]
            }
        ],
        description: "Native to the Aerialis. "+
        "They are proud, noble, and free from the rule of Dragons. "+
        "They are a people who spend all their time rebuilding their homes after Dragons attack, and fighting to protect their freedom."
    },
    {
        name: "Dragonborn", image: "ico/dragonborn.png",
        type: "Humanoid",
        source: { short: "OMP", long: "Once Mortal Primer" },
        size: {
            short: "M",
            long: "Medium"
        },
        age: {
            average: 80,
            mature: 6,
            max: 99
        },
        abilities: [
            {
                type: "granted",
                ability: ["strength"],
                value: 2
            },
            {
                type: "granted",
                ability: ["charisma"],
                value: 1
            },
        ],
        speed: {
            walk: 30,
            fly: 0,
            hover: 0,
            burrow: 0,
            climb: 0,
            swim: 0
        },
        feats: [
            {
                type: "granted",
                feat: ["Draconic Ancestry"]
            },
            {
                type: "granted",
                feat: ["Breath Weapons"]
            },
            {
                type: "granted",
                feat: ["Damage Resistance"]
            }
        ],
        languages: [
            {
                type: "granted",
                lang: ["Common"]
            },
            {
                type: "granted",
                lang: ["Draconic"]
            }
        ],
        description: "Native to the Aerialis. "+
        "They are rarely born, and instead created by Dragons to be servants. "+
        "Most Dragonborn are in cults which worship specific Dragons. "+
        "Many Dragonborn are tasked with traveling to other Realms and preparing those Realms for Draconic takeover."
    },
    {
        name: "Githyanki", image: "ico/githyanki.png",
        type: "Humanoid",
        source: { short: "OMP", long: "Once Mortal Primer" },
        size: {
            short: "M",
            long: "Medium"
        },
        age: {
            average: -1,
            mature: 20,
            max: -1
        },
        abilities: [
            {
                type: "granted",
                ability: ["strength"],
                value: 2
            },
            {
                type: "granted",
                ability: ["intelligence"],
                value: 1
            }
        ],
        speed: {
            walk: 30,
            fly: 0,
            hover: 0,
            burrow: 0,
            climb: 0,
            swim: 0
        },
        feats: [
            {
                type: "granted",
                feat: ["Astral Knowledge"]
            },
            {
                type: "granted",
                feat: ["Githyanki Psionics"]
            },
            {
                type: "granted",
                feat: ["Psychic Resilience"]
            },
            {
                type: "granted",
                feat: ["Decadent Mastery"]
            },
        ],
        languages: [
            {
                type: "granted",
                lang: ["Common"]
            },
            {
                type: "granted",
                lang: ["Gith"]
            }
        ],
        description: "Native to the Astral Sea. "+
        "Githyanki are soldiers who fuel the endless wars of the sea. "+
        "They are Natives to the Astral Sea, yet rarely fight for themselves. "+
        "The majority of Githyanki serve the Empire of Shaire."
    },
    {
        name: "Githzerai", image: "ico/githyanki.png",
        type: "Humanoid",
        source: { short: "OMP", long: "Once Mortal Primer" },
        size: {
            short: "M",
            long: "Medium"
        },
        age: {
            average: -1,
            mature: 20,
            max: -1
        },
        abilities: [
            {
                type: "granted",
                ability: ["Wisdom"],
                value: 2
            },
            {
                type: "granted",
                ability: ["intelligence"],
                value: 1
            }
        ],
        speed: {
            walk: 30,
            fly: 0,
            hover: 0,
            burrow: 0,
            climb: 0,
            swim: 0
        },
        feats: [
            {
                type: "granted",
                feat: ["Mental Discipline"]
            },
            {
                type: "granted",
                feat: ["Githzerai Psionics"]
            },
            {
                type: "granted",
                feat: ["Psychic Resilience"]
            },
            {
                type: "granted",
                feat: ["Decadent Mastery"]
            },
        ],
        languages: [
            {
                type: "granted",
                lang: ["Common"]
            },
            {
                type: "granted",
                lang: ["Gith"]
            }
        ],
        description: "Native to the Astral Sea. "+
        "They are the scholars, philosophers, teachers, engineers who upkeep the Astral Sea's technology. "+
        "The endless wars of the Sea would not be maintainable without them."
    },
    {
        name: "Aasimar", image: "ico/aasimar.png",
        type: "Humanoid",
        source: { short: "OMP", long: "Once Mortal Primer" },
        size: {
            short: "M",
            long: "Medium"
        },
        age: {
            average: 130,
            mature: 16,
            max: 180
        },
        abilities: [
            {
                type: "granted",
                ability: ["wisdom"],
                value: 1
            },
            {
                type: "granted",
                ability: ["charisma"],
                value: 2
            }
        ],
        senses: {
            "darkvision": 60
        },
        speed: {
            walk: 30,
            fly: 0,
            hover: 0,
            burrow: 0,
            climb: 0,
            swim: 0
        },
        feats: [
            {
                type: "granted",
                feat: ["Celestial Resistance"]
            },
            {
                type: "granted",
                feat: ["Healing Hands"]
            },
            {
                type: "granted",
                feat: ["Light Bearer"]
            },
            {
                type: "granted",
                feat: ["Celestial Legacy"]
            },
        ],
        languages: [
            {
                type: "granted",
                lang: ["Common"]
            },
            {
                type: "granted",
                lang: ["celestial"]
            }
        ],
        description: "Mortals from any Realm blessed by Celestials. "+
        "They carry a spark of the Celestial's soul within themselves and draw power from it. "+
        "They are rarely found outside the Divine Realm or Astral Sea."
    },
    {
        name: "Nephilim", image: "ico/nephilim.png",
        type: "Humanoid",
        source: { short: "OMP", long: "Once Mortal Primer" },
        size: {
            short: "M",
            long: "Medium"
        },
        age: {
            average: 100,
            mature: 25,
            max: 300
        },
        abilities: [
            {
                type: "granted",
                ability: ["wisdom"],
                value: 2
            },
            {
                type: "granted",
                ability: ["charisma"],
                value: 1
            }
        ],
        speed: {
            walk: 30,
            fly: 0,
            hover: 0,
            burrow: 0,
            climb: 0,
            swim: 0
        },
        feats: [
            {
                type: "granted",
                feat: ["Celestial Legacy"]
            },
            {
                type: "granted",
                feat: ["Storm Affinity"]
            },
            {
                type: "granted",
                feat: ["Wings of Heavens"]
            },
            {
                type: "granted",
                feat: ["Divine Resilience"]
            },
            {
                type: "granted",
                feat: ["Heavenly Judgement"]
            },
        ],
        languages: [
            {
                type: "granted",
                lang: ["Common"]
            },
            {
                type: "granted",
                lang: ["celestial"]
            }
        ],
        description: "Nephilim are born from the union of an Angel or Celestial and a Mortal. "+
        "They are often revered and considered messengers of the Gods. "+
        "They like to show off their traits and often become Priests or more."
    },
    {
        name: "Cambion", image: "ico/cambion.png",
        type: "Fiend",
        source: { short: "OMP", long: "Once Mortal Primer" },
        size: {
            short: "M",
            long: "Medium"
        },
        age: {
            average: 100,
            mature: 20,
            max: 300
        },
        abilities: [
            {
                type: "granted",
                ability: ["intelligence"],
                value: 1
            },
            {
                type: "granted",
                ability: ["charisma"],
                value: 2
            }
        ],
        speed: {
            walk: 30,
            fly: 0,
            hover: 0,
            burrow: 0,
            climb: 0,
            swim: 0
        },
        feats: [
            {
                type: "granted",
                feat: ["Infernal Legacy"]
            },
            {
                type: "granted",
                feat: ["Fiendish Charm"]
            },
            {
                type: "granted",
                feat: ["Dark Bargain"]
            },
            {
                type: "granted",
                feat: ["Hellish Resistance"]
            },
            {
                type: "granted",
                feat: ["Soul Debt"]
            },
        ],
        languages: [
            {
                type: "granted",
                lang: ["Common"]
            },
            {
                type: "granted",
                lang: ["Abyssal"]
            }
        ],
        description: "Cambion are born from the union of a Demon, or Devil, or Fiend and a Mortal. "+
        "They are shunned and outcast for being Fiends, so Cambion hide their small horns and wings. "+
        "Some going as far as to surgically remove their Fiendish traits. "+
        "Cambion have discoloured eyes, but most people find them attractive rather than repulsive."
    },
];
// Race Functions
// Parse race senses
DND_API.parseRaceSenses = function(raceSenses) {
    const senses = {};
    
    if (raceSenses) {
        Object.keys(raceSenses).forEach(sense => {
            senses[sense] = raceSenses[sense];
        });
    }
    
    return senses;
}
// Parse race speed
DND_API.parseRaceSpeed = function(raceSpeed) {
    const speed = {};
    
    Object.keys(raceSpeed).forEach(movementType => {
        speed[movementType] = raceSpeed[movementType];
    });
    
    return speed;
}
// Main function to apply race data to character schema
DND_API.applyRaceToCharacter = async function(character, raceName) {
    const race = DND_API.Races.find(r => r.name === raceName);
    if (!race) {
        console.error(`Race "${raceName}" not found`);
        return false;
    }

    // Apply basic race info
    character.race = {
        name: race.name,
        type: race.type,
        size: race.size,
        description: race.description
    };

    // Apply abilities (handles choices automatically)
    if (race.abilities) {
        for (const ability of race.abilities) {
            if (ability.type === "granted") {
                ability.ability.forEach(ab => {
                    character.abilities[ab] += ability.value || 1;
                });
            } else if (ability.type === "choice") {
                const choice = await DND_API.choiceHandler.makeChoice(
                    `Choose ${ability.value || 1} ability score${ability.value > 1 ? 's' : ''} to increase`,
                    ability.ability[0] === 'any' ? 
                        ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'] :
                        ability.ability,
                    ability.value || 1
                );
                
                const choices = Array.isArray(choice) ? choice : [choice];
                choices.forEach(ab => {
                    character.abilities[ab] += ability.value || 1;
                });
            }
        }
    }

    // Apply speed
    if (race.speed) {
        character.speed = { ...race.speed };
    }

    // Apply senses
    if (race.senses) {
        character.senses = { ...race.senses };
    }

    // Apply languages (handles choices automatically)
    if (race.languages) {
        character.langProf = [];
        for (const lang of race.languages) {
            if (lang.type === "granted") {
                lang.lang.forEach(l => {
                    const langData = DND_API.getLanguage(l);
                    if (langData) character.langProf.push(langData);
                });
            } else if (lang.type === "choice") {
                let options = [];
                if (lang.lang[0] === 'anyStandard') {
                    options = DND_API.Languages.filter(l => l.rarity === 'Standard').map(l => l.name);
                } else if (langObj.lang[0] === "anyRare") {
                    options = DND_API.Languages.filter(l => l.rarity === "Rare").map(l => l.name);
                } else if (langObj.lang[0] === "anyExotic") {
                    options = DND_API.Languages.filter(l => l.rarity === "Exotic").map(l => l.name);
                } else if (lang.lang[0] === 'any') {
                    options = DND_API.Languages.filter(l => l.rarity !== 'Secret').map(l => l.name);
                } else {
                    options = lang.lang;
                }

                const choice = await DND_API.choiceHandler.makeChoice(
                    `Choose ${lang.value || 1} language${lang.value > 1 ? 's' : ''}`,
                    options,
                    lang.value || 1
                );

                const choices = Array.isArray(choice) ? choice : [choice];
                choices.forEach(langName => {
                    const langData = DND_API.getLanguage(langName);
                    if (langData) character.langProf.push(langData);
                });
            }
        }
    }

    // Apply feats (handles choices automatically)
    if (race.feats) {
        character.feats = [];
        for (const feat of race.feats) {
            if (feat.type === "granted") {
                feat.feat.forEach(f => {
                    const featData = DND_API.getFeat(f);
                    if (featData) character.feats.push(featData);
                });
            } else if (feat.type === "choice") {
                let options = [];
                if (feat.feat[0] === 'any') {
                    options = DND_API.Features.map(f => f.name);
                } else {
                    options = feat.feat;
                }

                const choice = await DND_API.choiceHandler.makeChoice(
                    `Choose ${feat.value || 1} feat${feat.value > 1 ? 's' : ''}`,
                    options,
                    feat.value || 1
                );

                const choices = Array.isArray(choice) ? choice : [choice];
                choices.forEach(featName => {
                    const featData = DND_API.getFeat(featName);
                    if (featData) character.feats.push(featData);
                });
            }
        }
    }

    console.log(`Successfully applied race "${raceName}" to character`);
    return true;
};
// Get Race Object from String
DND_API.getRace = function(str) {
    // If string is the name of a race
    if (DND_API.Races.find(r => r.name === str)) {
        return DND_API.Races.find(r => r.name === str);
    }
    // If string is the type of a race
    else if (DND_API.Races.find(r => r.type === str)) {
        return DND_API.Races.find(r => r.type === str);
    }
    // If string is the source of a race
    else if (DND_API.Races.find(r => r.source.short === str || r.source.long === str)) {
        return DND_API.Races.find(r => r.source.short === str || r.source.long === str);
    }
    // If string is the size of a race
    else if (DND_API.Races.find(r => r.size.short === str || r.size.long === str)) {
        return DND_API.Races.find(r => r.size.short === str || r.size.long === str);
    }
    // If string is looking for any/all races
    else if (str === "any" || str === "all") {
        return DND_API.Races;
    }
    // If string is anything else, return an error
    else {
        console.error("DND_API.getRace(str) Error. Invalid string passed.")
    }
}
// Senses Dataset
DND_API.Senses = [
    {
        name: "Blindsight",
        source: { short:"PHB",long:"Player's Handbook" },
        desc: "If you have Blindsight, you can see within a specific range without relying on physical sight. "+
        "Within that range, you can see anything that isn't behind Cover even if you have the Blinded condition or are in Darkness. "+
        "Moreover, in that range, you can see something that has the Invisible condition."
    },
    {
        name: "Darkvision",
        source: { short:"PHB",long:"Player's Handbook" },
        desc: "If you have Darkvision, you can see in Dim Light within a specified range as if it were Bright Light and in Darkness within that range as if it were Dim Light. "+
        "You discern colors in that Darkness only as shades of gray."
    },
    {
        name: "Superior Darkvision",
        source: { short:"PHB",long:"Player's Handbook" },
        desc: "If you have Darkvision, you can see in Dim Light within a specified range as if it were Bright Light and in Darkness within that range as if it were Dim Light. "+
        "You discern colors in Darkness as they are, without alteration."
    },
    {
        name: "Tremorsense",
        source: { short:"PHB",long:"Player's Handbook" },
        desc: "A creature with Tremorsense can pinpoint the location of creatures and moving objects within a specific range, "+
        "provided that the creature with Tremorsense and anything it is detecting are both in contact with the same surface (such as the ground, a wall, or a ceiling) or the same liquid. "+
        "Tremorsense can't detect creatures or objects in the air, and it doesn't count as a form of sight."
    },
    {
        name: "Truesight",
        source: { short:"PHB",long:"Player's Handbook" },
        desc: "If you have Truesight, your vision is enhanced within a specified range. Within that range, your vision pierces through the following: "+
        "You can see clearly in normal and magical Darkness. You see creatures and objects that have the Invisible condition. "+
        "Visual illusions appear transparent to you, and you automatically succeed on Saving Throw against them. You discern the true form of any creature or object you see that has been transformed by magic. "
    },
];
// Senses Functions
// Get Sense Object from String
DND_API.getSense = function(str) {
    // If string is the name of a sense
    if (DND_API.Senses.find(s => s.name === str)) {
        return DND_API.Senses.find(s => s.name === str);
    }
    // If string is the source of a sense
    else if (DND_API.Senses.find(s => s.source.short === str || s.source.long === str)) {
        return DND_API.Senses.find(s => s.source.short === str || s.source.long === str);
    }
    // If string is looking for any/all sense
    else if (str === "any" || str === "all") {
        return DND_API.Senses;
    }
    // If string is anything else, return an error
    else {
        console.error("DND_API.getSense(str) Error. Invalid string passed.");
        return;
    }
}
// Update Character Sense
DND_API.updateCharacterSense = function(character, sense, range) {
    // Get Sense
    sense = DND_API.getSense(sense);
    // Validate Sense
    if (!sense || !character.senses[sense.name]) {
        console.error("DND_API.updateCharacterSense(character, sense, range) Error. Invalid sense passed.");
        return;
    }
    // Update sense in character schema
    character.senses[senseName] = range;
}
// Skills Dataset
DND_API.Skills = [
    {
        name: "Acrobatics",
        source: { short:"PHB",long:"Player's Handbook" },
        ability: { short:"dex",long:"dexterity" },
        desc: "Your Dexterity (Acrobatics) check covers your attempt to stay on your feet in a tricky situation, "+
        "such as when you're trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship's deck. "+
        "Dexterity (Acrobatics) checks can also be used to determine if you can perform acrobatic stunts, including dives, rolls, somersaults, flips, etc. "
    },
    {
        name: "Animal Handling",
        source: { short:"PHB",long:"Player's Handbook" },
        ability: { short:"wis",long:"wisdom" },
        desc: "When there is any question whether you can calm down a domesticated animal, "+
        "keep a mount from getting spooked, or intuit an animal's intentions, a Wisdom (Animal Handling) check will prove your abilities. "+
        "You also make a Wisdom (Animal Handling) check to control mounts when attempting a risky maneuver."
    },
    {
        name: "Arcana",
        source: { short:"PHB",long:"Player's Handbook" },
        ability: { short:"int",long:"intelligence" },
        desc: "Your Intelligence (Arcana) check measures your ability to recall lore about "+
        "spells, magic items, eldritch symbols, magical traditions, the planes of existence, "+
        "and the inhabitants of those planes."
    },
    {
        name: "Athletics",
        source: { short:"PHB",long:"Player's Handbook" },
        ability: { short:"str",long:"strength" },
        desc: "Your Strength (Athletics) check covers difficult situations you encounter while climbing, jumping, or swimming."
    },
    {
        name: "Deception",
        source: { short:"PHB",long:"Player's Handbook" },
        ability: { short:"cha",long:"charisma" },
        desc: "Your Charisma (Deception) check determines whether you can convincingly hide the truth, either verbally or through your actions. "+
        "This deception can encompass everything from misleading others through ambiguity to telling outright lies. "+
        "Typical situations include fast-talking a guard, conning, earning money gambling, passing yourself off in a disguise, or maintain a straight face while telling a blatant lie."
    },
    {
        name: "History",
        source: { short:"PHB",long:"Player's Handbook" },
        ability: { short:"int",long:"intelligence" },
        desc: "Your Intelligence (History) check measures your ability to recall lore about historical events, legendary people, ancient kingdoms, past disputes, recent wars, and lost civilizations."
    },
    {
        name: "Insight",
        source: { short:"PHB",long:"Player's Handbook" },
        ability: { short:"wis",long:"wisdom" },
        desc: "Your Wisdom (Insight) check decides whether you can determine the true intentions of a creature, such as when searching out a lie or predicting someone's next move. "+
        "Doing so involves gleaning clues from body language, speech habits, and changes in mannerisms."
    },
    {
        name: "Intimidation",
        source: { short:"PHB",long:"Player's Handbook" },
        ability: { short:"cha",long:"charisma" },
        desc: "When you attempt to influence someone through overt threats, hostile actions, and physical violence, make a Charisma (Intimidation) check. "+
        "Examples include trying to pry information out of a prisoner, convincing street thugs to back down from a confrontation, or using the edge of a broken bottle to convince a sneering vizier to reconsider a decision."
    },
    {
        name: "Investigation",
        source: { short:"PHB",long:"Player's Handbook" },
        ability: { short:"int",long:"intelligence" },
        desc: "When you look around for clues and make deductions based on those clues, you make an Intelligence (Investigation) check. "+
        "You might deduce the location of a hidden object, discern from the appearance of a wound what kind of weapon dealt it, or determine the weakest point in a tunnel that could cause it to collapse. "+
        "Poring through ancient scrolls in search of a hidden fragment of knowledge might also call for an Intelligence (Investigation) check."
    },
    {
        name: "Medicine",
        source: { short:"PHB",long:"Player's Handbook" },
        ability: { short:"wis",long:"wisdom" },
        desc: "A Wisdom (Medicine) check lets you try to stabilize a dying companion, diagnose an illness, , or determine what killed the recently slain."
    },
    {
        name: "Nature",
        source: { short:"PHB",long:"Player's Handbook" },
        ability: { short:"int",long:"intelligence" },
        desc: "Your Intelligence (Nature) check measures your ability to recall lore about terrain, plants and animals, the weather, and natural cycles."
    },
    {
        name: "Perception",
        source: { short:"PHB",long:"Player's Handbook" },
        ability: { short:"wis",long:"wisdom" },
        desc: "Your Wisdom (Perception) check lets you spot, hear, or otherwise detect the presence of something. It measures your general awareness of your surroundings and the keenness of your senses. "+
        "You can try to hear a conversation through a closed door, eavesdrop under an open window, or hear monsters moving stealthily in the forest. "+
        "Or you might try to spot things that are obscured or easy to miss, whether they are Orcs lying in ambush on a road, thugs hiding in the shadows of an alley, or candlelight under a closed secret door."
    },
    {
        name: "Performance",
        source: { short:"PHB",long:"Player's Handbook" },
        ability: { short:"cha",long:"charisma" },
        desc: "Your Charisma (Performance) check determines how well you can delight an audience with music, dance, acting, storytelling, or some other form of entertainment."
    },
    {
        name: "Persuasion",
        source: { short:"PHB",long:"Player's Handbook" },
        ability: { short:"cha",long:"charisma" },
        desc: "When you attempt to influence someone or a group of people with tact, social graces, or good nature, you make a Charisma (Persuasion) check. "+
        "Typically, you use persuasion when acting in good faith, to foster friendships, make cordial requests, or exhibit proper etiquette. "+
        "Convincing a chamberlain to let your party see the king, negotiating peace between warring tribes, or inspiring a crowd of townsfolk."
    },
    {
        name: "Religion",
        source: { short:"PHB",long:"Player's Handbook" },
        ability: { short:"int",long:"intelligence" },
        desc: "Your Intelligence (Religion) check measures your ability to recall lore about deities, rites and prayers, religious hierarchies, holy symbols, and the practices of secret cults."
    },
    {
        name: "Sleight of Hand",
        source: { short:"PHB",long:"Player's Handbook" },
        ability: { short:"dex",long:"dexterity" },
        desc: "Whenever you attempt an act of legerdemain or manual trickery, such as planting something on someone else or concealing an object on your person, make a Dexterity (Sleight of Hand) check. "+
        "A Dexterity (Sleight of Hand) check can be performed to determine whether you can lift a coin purse off another person or slip something in/out of another person's pocket."
    },
    {
        name: "Stealth",
        source: { short:"PHB",long:"Player's Handbook" },
        ability: { short:"dex",long:"dexterity" },
        desc: "Make a Dexterity (Stealth) check when you attempt to conceal yourself from enemies, slink past guards, slip away without being noticed, or sneak up on someone without being seen or heard."
    },
    {
        name: "Survival",
        source: { short:"PHB",long:"Player's Handbook" },
        ability: { short:"wis",long:"wisdom" },
        desc: "Make a Wisdom (Survival) check to follow tracks, hunt wild game, guide your group through frozen wastelands, identify signs that creatures live nearby, predict the weather, find trails, or avoid quicksand and other natural hazards."
    },
];
// Skills Functions
// Get Skill Object from String
DND_API.getSkill = function(str) {
    // If string is the name of a skill
    if (DND_API.Skills.find(s => s.name === str)) {
        return DND_API.Skills.find(s => s.name === str);
    }
    // If string is the source of a skill
    else if (DND_API.Skills.find(s => s.source.short === str || s.source.long === str)) {
        return DND_API.Skills.find(s => s.source.short === str || s.source.long === str);
    }
    // If string is the ability of a skill
    else if (DND_API.Skills.find(s => s.ability.short === str || s.ability.long === str)) {
        return DND_API.Skills.find(s => s.ability.short === str || s.ability.long === str);
    }
    // If string is looking for any/all skills
    else if (str === "any" || str === "all") {
        return DND_API.Skills;
    }
    // If parameter is an object inside of Skills dataset
    else if (DND_API.Skills.includes(str)) {
        return DND_API.Skills.find(s => s.name === str.name);
    }
    // If string is anything else, return an error
    else {
        console.error("DND_API.getSkill(str) Error. Invalid string passed.");
        return;
    }
}
// Get Skill Modifier
DND_API.getSkillMod = function(character, skill) {
    skill = DND_API.getSkill(skill);
    if (!skill || !character.skills[skill.name]) {
        console.error("DND_API.getSkillMod(character, skill) Error. Invalid skill passed.");
        return;
    }
    const abilityMod = DND_API.getAbilityMod(character.abilities[skill.ability.long]);
    const proficiency = character.skills[skill.name][1] || 0;
    const profBonus = character.profBonus || 2; // Default to 2 if not set
    return abilityMod + (proficiency * profBonus);
}
// Get Passive Skill
DND_API.getPassiveSkill = function(character, skill) { return 10 + DND_API.getSkillMod(character, skill); }
// Update Character Skill
DND_API.updateCharacterSkill = function(character, skill, proficiency) {
    // Validate Skill
    skill = DND_API.getSkill(skill);
    if (!skill || !character.skills[skill.name]) {
        console.error("DND_API.updateCharacterSkill(character, skill) Error. Invalid skill passed.");
        return;
    }
    // Get ability score modifier
    let mod = Math.floor((character.abilities[skill.ability.long] - 10) / 2);
    // Update skill proficiency in character schema
    if (proficiency) { character.skills[skill.name][1] = proficiency; }
    else { proficiency = character.skills[skill.name][1] || 0 }
    // Update skill modifier in character schema
    character.skills[skill.name][0] = mod + (proficiency * (character.profBonus || 2));
}
