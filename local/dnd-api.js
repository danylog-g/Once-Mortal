// created by Danylo Gula, 2025

// Main Dungeons & Dragons API Object
const DND_API = {};

// Cybernetics 
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
        { name: "DEW-ECB", ammo: "+2.5%", damage: "0", weight: 6 },
        { name: "DEW-DCG", ammo: "+101", damage: "-2 dice", weight: 18 },
        { name: "DEW-RVC", ammo: "+5%", damage: "0", weight: 9 },
        { name: "DEW-PPB", ammo: "+25%", damage: "-1 dice -1 die size", weight: 27 },
        { name: "DEW-NRB", ammo: "+100%", damage: "-3 dice -1 die size", weight: 64 },
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
        { name: "RC-M PLUG", ammo: "-50%", range: "-20%/-20%/-100%", damage: "0", decibels: "-5%", weight: 2, type: "Piercing (Magnetic)" },
        { name: "RC-M PUNCH", ammo: "-50%", range: "-20%/-20%/-80%", damage: "0", decibels: "-5%", weight: 2.5, type: "Piercing (Magnetic)" },
        { name: "RC-M SLAM", ammo: "-50%", range: "-20%/-20%/-100%", damage: "0", decibels: "-5%", weight: 4, type: "Bludgeoning (Magnetic)" },
        { name: "RC-M DRILL", ammo: "-50%", range: "-20%/-20%/-75%", damage: "+1 dice", decibels: "-2.5%", weight: 4, type: "Piercing (Magnetic)" },
        { name: "RC-M HOLE", ammo: "-75%", range: "-20%/-20%/-100%", damage: "+2 dice -1 die size", decibels: "-7.5%", weight: 6, type: "Piercing (Magnetic)" },
        { name: "RC-E Laser", ammo: "0", range: "0", damage: "0", decibels: 0, weight: 0, type: "Radiant" },
        { name: "RC-E Plasma", ammo: "0", range: "-25%/-50%/-75%", damage: "+1 dice", decibels: "5%", weight: 0.2, type: "Fire" },
        { name: "RC-E Ion", ammo: "0", range: "0/+25%/+50%", damage: "0", decibels: "10%", weight: -0.05, type: "Radiant" },
        { name: "RC-E Particles", ammo: "0", range: "0/-50%/-75%", damage: "+1 dice size", decibels: "-33%", weight: -0.1, type: "Fire" },
        { name: "RC-E EMP", ammo: "0", range: "+10%/+20%/+10%", damage: "0", decibels: "5%", weight: 2, type: "Thunder" },
        { name: "RC-W Warhead", ammo: "0", range: "0/0/0", damage: "0", decibels: "10%", weight: 0.0, type: "Bludgeoning" },
        { name: "RC-W Wasp", ammo: "+50%", range: "0/-50%/-50%", damage: "+2 dice -1 dice size", decibels: "-10%", weight: -1, type: "Piercing" },
        { name: "RC-W HEAT", ammo: "0", range: "+15%/0/0", damage: "+1 dice, +1 dice size", decibels: "20%", weight: 2.0, type: "Force" },
        { name: "RC-W NF", ammo: "-50%", range: "0/0/0", damage: "0", decibels: "0", weight: 6.0, type: "Necrotic" },
        { name: "RC-W NG", ammo: "-25%", range: "0/0/0", damage: "0", decibels: "-15%", weight: -2.0, type: "Poison" },
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
DND_LIBRARY.Languages = [
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
        rarity: "Exotic",
        desc: "A language that is only used by Titans when conversing with oneanother, it is a language similar to Deep Speech; made up of sounds, vibrations, and gestures."
    },
];
// 