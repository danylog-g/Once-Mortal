const LORE = {
    "Garna": [
        "Our weapons improve... Only for more of us to die... Wars fought on behalf of Gods result in mass graves.",
        "I have seen so many cry... Their bullets do not reach me... Mine do not miss...",
        "To live a life hunting monsters... I will hunt the most dangerous one... Myself.",
        "The Gods and Priests wage wars... Mortals like us dig graves... Nothing will ever change.",
    ],
    "Jotunheim": [
        "The fortresses and mines flood with tears when the ground shakes... Titans... They could kill us all if they wanted... But they enjoy it... Seeing us struggle...",
        "Decades spent to reinforce bunkers and weaponize mountains... A Giant trips, and we dig graves for eternity...",
        "Centuries ago the mountains could shelter us... The mountains have been paved, a Titan had a bad dream...",
        "The Titans cause chaos, just by waking from their slumber... The Giants cause chaos by playing with eachother... We starve.",
    ],
    "Endless City": [
        "The city resets... But we remember... The real curse is surviving...",
        "I watched my friends vanish into the fog... Moments later, not even their blood remained on the roads...",
        "The towers provide for us, every six hours... Making us complacent... We are a farm for the stalkers...",
        "The real danger is not the stalkers, or the others trapped... It is hope... That one day, there may be escape...",
    ],
    "Felled Realm": [
        "A nightmare has taken hold of my body... Lunacy has dug its way inside my mind...",
        "This is the way the world ends... Not with a war... With sickening silence.",
        "I suppose the Infernal Hell is closed off... Those who belong there walk the Realm.",
        "The rivers are filled with blood... They whisper names... Always names I once knew...",
    ],
    "Feywild": [
        "My crime was being born... Their punishment was to change me... Turn my flesh into crystals... An experiment, thats all I will ever be to the High-Elves.",
        "They do not think we are even good enough to serve them... They want absence... Our existence is a stain on their "+'"perfection."',
        "They don't hate us... Hate requires acknowledgement... We are less than dust to them...",
        "Their beauty is intoxicating... It is a weapon... I thanked them as they chose me for an experiment... I thanked them as they flayed my soul...",
        "Elven eyes reflect only your imperfections and insecurities... Magnified.",
    ],
    "Aerialis": [
        "I've never looked negatively upon my decision to give them freedom... If they want to kill eachother until the end of time... I just want them to leave me out of it.",
        "This sky isn't freedom... I was born as livestock... Raised to die...",
        "Our prayers don't reach Him... Nothing does... How we wish for Him to enslave us once more...",
        "Lerranmoraxitro's "+'"gift"'+" was abandonment... Dragons filled His absence... With fire, blood, and chains.",
        "Those who are not enslaved pray to the God of Freedom... We know He listens... He just never answers...",
        "It was our mistake not to see freedom when we had it... Now we are falling... Endlessly... Into a pit...",
    ],
    "Kyofu": [
        "Freedom was Lerranmoraxitro's punishment... We once prayed to be freed from Him... Now we pray for His chains...",
        "The Dragon War left wounds which will never heal... The mountains bleed... And we are forced to drink it... Gratefully.",
        "The Council promises order... One which will benefit us all... Their "+'"order"'+" tastes like rationed poison... We pray to Him, but there is no answer... There will never be an answer...",
        "We won... Caused the Dragons to flee to Aerialis... We stayed... Now we float in tombs...",
    ],
    "Realm of Beasts": [
        "I came to claim eternal glory... I found... Teeth... So many teeth... In things which should not have mouths...",
        "When Her Glory, Soniya's, arena glows with invitation... The Titans grin... They await their feast of champions...",
        "Weapons break on the hides of the beasts... They like to see the fear and panic in our eyes... They like to chase us...",
        "I prayed to The Goddess Lyssia, and my ancestors... The jungle responded to my prayers... "+'"We at them."',
    ],
    "Astral Sea": [
        // VPF / Pirate
        "Bahgyel birthed a storm-whale with crystals for teeth! Each tooth is worth hundreds of crowns! Load you harpoons and sail to glory!",
        "My crew spotted a Titan today! Hundreds of eyes and singing death for our souls! We answered with enough cannon fire to burst each eye twice!",
        "The Leviathans hide is carpet for our flagship now! Its final scream bought us twenty rounds! A toast, to Bahgyel's next masterpiece!",
        // Neo-Neprad
        "My children keep asking me, why does the Sea hate us? The screens show nothing but static...",
        // Empire of Shaire
        "The pirates cheer on the Goddess of Deep Sea. Her spawn laughs at imperial steel... Hundreds of us die... So a God can have fun...",
        "The Emperor has us claiming monster hearts... My crew returns in a bucket... With our vessels at the theoretical bottom of the Sea.",
    ],
    "Divine Realm": [
        "The Celestials from Heaven polish the thrones of the Gods... While the Devils cull Demons... All while the mortals burn at the gates...",
        "Heaven's gates have so many locks... Hell's have broken chains... The Gods subsist on our suffering...",
        "Devils and Demons brawl below our feet... Gods and the Celestials place bets above... Mortal souls and prayers are the currency...",

    ],
    _length: [
        "Garna", "Jotunheim", "Endless City", "Felled Realm",
        "Feywild", "Aerialis", "Kyofu", "Realm of Beasts",
        "Astral Sea", "Divine Realm"
    ]
};

// Function to endlessly show lore snippets
function LoreDisplay() {
    const container = document.getElementById("lore");
    if (!container) return; // edge case

    // Get Realm and Lore
    const realm = LORE._length[_math.GetRnd(LORE._length.length)];
    const lore = LORE[realm];

    if (!lore) return; // edge case
    
    // Get Snippet and update
    const snippet = lore[_math.GetRnd(lore.length)];
    container.textContent = snippet;

    // Schedule next update
    setTimeout(LoreDisplay, 15000)
}
LoreDisplay();

/*
document.addEventListener('DOMContentLoaded', () => {
    const realm = LORE[Math.random() * LORE._length.length];
    const snippetContainer = document.getElementById('lore');
    
    if (LORE[realm]) {
      const randomSnippet = LORE[realm][Math.floor(Math.random() * LORE[realm].length)];
      snippetContainer.textContent = randomSnippet;
      
      // Auto-remove after animation
      setTimeout(() => {
        snippetContainer.remove();
      }, 16000);
    }
  });
  */