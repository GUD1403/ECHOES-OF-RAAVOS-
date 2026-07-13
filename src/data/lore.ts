import { Character, Book, SupportTier } from '../types';

export const BOOKS: Book[] = [
  {
    id: 'book1',
    volume: 'I',
    title: 'Echoes of Raavos',
    subtitle: 'The Rise',
    description1: 'Saved from an execution platform in Regishire by a magnificent knight, Raavos is carried across the sea to Sonaria — a fortress of green-lit corridors and hollow soldiers — and placed before King Blood Borne V. His life is payment for becoming a weapon. The target: the empire of Regishire.',
    description2: 'Eight years pass in secret. Three in Sonaria\'s dark. Five more in the mountain stronghold of Starborne. When the monstrous Raga, the Munchkin of Doom, invades with an army of 100,000 wyverns, the frightened boy from the docks must awaken his ancient "Great Power" to survive.',
    stakes: 'When the last wall falls and there is nowhere left to run — a sealed beast beneath the mountain opens one eye. And inside Raavos, something ancient finally answers, clashing with the giant Raga in a duel that shatters the dimensions.',
    characters: ['Raavos', 'Soreign', 'King Blood Borne V', 'Munchkin of Doom', 'Beast of Starborne']
  },
  {
    id: 'book2',
    volume: 'II',
    title: 'Echoes of Raavos',
    subtitle: 'The Destroyer of Worlds',
    description1: 'Raavos is not dead. He is sealed — swallowed whole by something older than gods — and offered as the grand prize of a game played across every civilisation. The rules burn across every sky: defeat your assigned God, or face total extinction.',
    description2: 'Soreign hunts thirteen Alpha Beasts across alien forests, oceans, and gravity-torn landmasses — creatures that adapt mid-battle to counter every wound. Alongside him are his students (Rex, Rega, Toro, Koni, Daren) and a mysterious Doctor with biokinetic powers.',
    stakes: 'Inside Crius, God of Light, a fragment of Raavos stirs — dark lightning pressing against divine walls — waiting for the moment the final trial begins as Jormungdar, the World Serpent, descends in absolute fury.',
    characters: ['Raavos', 'Soreign', 'Crius', 'The Doctor', 'The Gatekeeper']
  },
  {
    id: 'book3',
    volume: 'III',
    title: 'Echoes of Raavos',
    subtitle: 'The Final Trial',
    description1: 'Raavos awakens inside the body of Crius, God of Light, but there is no time to adapt. A colossal boom shatters the castle as the system initiates, dragging them into a planet-sized Colosseum of Gods where thousands of divine entities await.',
    description2: 'Soreign, Daren, Rex, Robby, Toro, Koni, Rega, the Doctor, and the kitchen-menace Gatekeeper are pitted against a gauntlet of terrifying gods, including Mahoraga, the God of Adaptation, and Sukuna, the World Destroyer.',
    stakes: 'To survive the ultimate trial, Raga must make the ultimate sacrifice, allowing Soreign to coat his blades in Raavos\'s permanent, god-killing black-and-gold lightning to rewrite the laws of existence itself.',
    characters: ['Raavos', 'Soreign', 'Munchkin of Doom', 'The Gatekeeper', 'Daren', 'Rex', 'Robby']
  }
];

export const CHAPTERS_BOOK_I = [
  { num: '01', title: 'The Execution Docks' },
  { num: '02', title: 'The Throne of Thorns' },
  { num: '03', title: 'Years in the Dark' },
  { num: '04', title: 'The Fall of Sonaria' },
  { num: '05', title: 'The Munchkin of Doom' },
  { num: '06', title: 'The Awakening' }
];

export const CHAPTERS_BOOK_II = [
  { num: '01', title: 'The Serpent\'s Demise' },
  { num: '02', title: 'The Warrior of Death' },
  { num: '03', title: 'The Reckoning' },
  { num: '04', title: 'The Departure' },
  { num: '05', title: 'The Hunt' },
  { num: '06', title: 'The Reveal' }
];

export const CHAPTERS_BOOK_III = [
  { num: '01', title: 'The Colosseum of Gods' },
  { num: '02', title: 'Nyxaroth\'s Illusion' },
  { num: '03', title: 'The Divine Hunt' },
  { num: '04', title: 'The Kitchen Nightmare' },
  { num: '05', title: 'Causality & Adaptation' },
  { num: '06', title: 'The Permanent Lightning' }
];

export const CHARACTERS: Record<string, Character> = {
  'char-raavos': {
    id: 'char-raavos',
    icon: '⚡',
    name: 'Raavos',
    books: 'Book I · Book II · Book III',
    role: 'The Archangel · Vessel of Lightning',
    tagline: 'He was never supposed to survive the execution. That was the first mistake the world made about him.',
    themePrimary: '#88bbee',
    themeGlow: 'rgba(136,187,238,.42)',
    lore: [
      'Raavos stood on the execution platform in Regishire, certain he was about to die. He was wrong. Soreign pulled him off before the blade could fall — carrying him to Sonaria, where King Blood Borne V forged him into a weapon through years of brutal training in the dark.',
      'When the Munchkin of Doom drove a dagger through his chest in the mountain ruins of Starborne, something ancient inside Raavos refused to die. The Great Power tore itself open. Raavos awakened, unleashing golden and black lightning.',
      'In Book II, he was sealed inside Crius, God of Light. In Book III, his soul takes control of Crius\'s body, navigating a planet-sized Colosseum of Gods. Here, he unlocks a third power: Blinding White Light, allowing him to create gravitational black holes and manipulate physics itself.',
      'During the climax, Raavos channels his lightning through Soreign\'s blades, poisoning the laws keeping divine beings alive. When his soul is finally returned to his original body by Qin Chi, he stands whole, holding twenty kilograms of Celestial Steel.'
    ],
    traits: ['Black Lightning', 'Blinding Light', 'Soul Strike', 'Gravitational Singularity', 'Archangel Vessel', 'Celestial Steel']
  },
  'char-soreign': {
    id: 'char-soreign',
    icon: '⚔️',
    name: 'Soreign',
    books: 'Book I · Book II · Book III',
    role: 'The Great Knight · Three Blades',
    tagline: 'He has never once waited for permission to do what needs to be done. That has saved a great many lives.',
    themePrimary: '#b0b8c8',
    themeGlow: 'rgba(176,184,200,.38)',
    lore: [
      'Soreign rescued Raavos from Regishire\'s execution docks and trained him for eight years. He trained him without patience and without cruelty — just relentless, honest pressure that made Raavos unbreakable.',
      'In Book II, Soreign carries the weight of the hunt against the thirteen Alpha Beasts. He plans each engagement like a surgeon and fights like a force of nature, cutting Jormungdar down in one perfect strike.',
      'In Book III, Soreign reaches god-killer status. High above the Colosseum, he battles the Gods of Suns, Metal, and Space simultaneously. He stabs physics itself to create dead zones in gravity and cuts through causality to break the God of Revelation\'s future sight.',
      'With his black, silver, and crimson blades coated in Raavos\'s permanent, anti-divine black lightning, Soreign slashes the World Destroyer Sukuna and the remaining gods into dead light, ending their immortality forever.'
    ],
    traits: ['Three Blades', 'Causality Slasher', 'Tactician', 'Rule-Splitting', 'God-Killer', 'Permanent Damage']
  },
  'char-crius': {
    id: 'char-crius',
    icon: '🌟',
    name: 'Crius',
    books: 'Book II · Book III',
    role: 'God of Light · Reluctant Vessel',
    tagline: 'He was sent to end a world. He chose, instead, to save it. Neither decision was easy.',
    themePrimary: '#d0d0ff',
    themeGlow: 'rgba(200,200,255,.38)',
    lore: [
      'Crius is the God of Light. When the cosmic game assigned him to Earth as its extinction trial, he descended to destroy it but was stopped by Soreign and his students. Inside Crius, a fragment of Raavos stirred, dark lightning pressing against divine walls.',
      'In Book III, Raavos pilots Crius\'s body through the Colosseum. Despite having his body broken, Crius remains a silent, guiding presence in the soulscape, eventually speaking directly to Raga as the black hole within him reaches critical instability.',
      'Crius willingly cooperates with Raga\'s plan to "seal" the tiny giant in his palm. He raises his hand, spiraling black lightning around the singularity to contain Raga and stabilize Raavos\'s original body, letting the world continue.'
    ],
    traits: ['God of Light', 'Sealed Vessel', 'Soulscape Guardian', 'Gravity Anomaly', 'Divine Fusion', 'Vessel Stabilizer']
  },
  'char-munchkin': {
    id: 'char-munchkin',
    icon: '🗡️',
    name: 'Raga (Munchkin of Doom)',
    books: 'Book I · Book II · Book III',
    role: 'Munchkin of Doom · Ancient Giant',
    tagline: 'He was one foot tall, blindfolded, and more dangerous than anything Raavos had faced. That combination should not be possible.',
    themePrimary: '#c05060',
    themeGlow: 'rgba(192,80,96,.38)',
    lore: [
      'Originally a shadow of the Hierarchy, Raga wore a blindfold through every fight he had ever won. His dagger ended kings, and his true form was an Ancient Giant, the son of the Munchkin of Destruction and Munchkin of Stars.',
      'In Book III, Raga stands atop the God of War Valdrak\'s shoulder like furniture, kicking him into orbit with a pebble ("HE LOST TO GEOMETRY"). When the God of Adaptation, Mahoraga, threatens the team, Raga lightly taps its chest, introducing a condition adaptation cannot process, causing Mahoraga to shatter forever.',
      'Inside the soulscape, Raga makes the ultimate choice: "Seal me. I interfere too much by existing. If I stay, everything dies. Gods become dependent. Humans stop struggling. Reality loses meaning."',
      'Raga steps willingly into the infinite singularity in Crius\'s palm, choosing a nap over godhood so that the world can grow on its own terms.'
    ],
    traits: ['Blindfolded Giant', 'Logical Paradox', 'Causality Bypass', 'Infinite Pocket Dimension', 'God-Kicker', 'The Ultimate Sacrifice']
  },
  'char-gatekeeper': {
    id: 'char-gatekeeper',
    icon: '🍳',
    name: 'The Gatekeeper',
    books: 'Book I · Book II · Book III',
    role: 'The Kitchen Nightmare · Personal Chef',
    tagline: 'The Hierarchy cut his budget, so he brought a spatula to guard Malakor. By Book III, he brought an entire oven to war.',
    themePrimary: '#e09858',
    themeGlow: 'rgba(224,152,88,.38)',
    lore: [
      'The Gatekeeper of Malakor originally tripped over his own chain and spilled a rubber duck, a spoon, and a spatula ("Tactical Flipper") from his budget-cut chest plate. After Raavos chopped his head off, he conscripted the talking head and headless body to build and pilot the S.S. Kitchen Sink.',
      'In Book III, the Gatekeeper becomes a complete battlefield menace. He smacks celestial warriors with frying pans, throws spoons that explode like artillery, uppercuts beasts with metal pots, and plugs a toaster into thin air to vaporize enemies with burning light.',
      'He drags a medieval iron furnace behind him, releasing torrents of burning coals, and slams a cauldron over a warrior\'s head. When the God of Will orders everyone to kneel, the Gatekeeper slams a giant iron meat tenderizer to crack reality and disrupt divine authority, prompting Rex to scream: "THE CHEF SAVED US!"'
    ],
    traits: ['Tactical Flipper', 'Pressure Cooker Artillery', 'Air Fryer Blade-Sucker', 'Toaster Beam of Light', 'Oven Furnace', 'Meat Tenderizer reality-cracker']
  },
  'char-daren': {
    id: 'char-daren',
    icon: '💤',
    name: 'Daren',
    books: 'Book II · Book III',
    role: 'The Sleepy Gravity User · Soreign\'s Student',
    tagline: 'He fell asleep in the castle and slept straight through the literal collapse of reality. The walls were thick.',
    themePrimary: '#a860e0',
    themeGlow: 'rgba(168,96,224,.38)',
    lore: [
      'Daren is Soreign\'s exceptionally lazy but impossibly powerful gravity-manipulating student. During Book II\'s Hunt, he trained to adjust density in their own bodies to move through deep oceans. In Book III, he accidentally fell asleep in the castle, sleeping through the apocalypse.',
      'Stumbling out of a portal yawning with a blanket on his shoulder, Daren casually raises a hand to stop a planetary-scale compression wave. He pockets the gravity, compressing it into several black spheres orbiting him like obedient moons, and flicks one to launch the God of Gravity through continents.',
      'When Raga orders him to "increase the singularity output by three thousand percent," Daren casually raises both hands, multiplying the orbiting spheres into millions and folding every gravitational layer in the Colosseum inward, sealing Raga forever.'
    ],
    traits: ['Gravity Pocketing', 'Compression Wave Stop', 'Singularity Boost', 'Space Inversion', 'Sleep-Walking', 'Spherical Moons']
  },
  'char-rex': {
    id: 'char-rex',
    icon: '🥊',
    name: 'Rex',
    books: 'Book II · Book III',
    role: 'The Kinetic Brawler · Soreign\'s Student',
    tagline: 'He has no interest in analyzing the apocalypse. He just wants his mountain bears back.',
    themePrimary: '#e07030',
    themeGlow: 'rgba(224,112,48,.38)',
    lore: [
      'Rex is the physical muscle of Soreign\'s students, relying entirely on raw kinetic buildup, physical impact, and an absolute lack of self-preservation. During the Hunt, he tackled colossal bears and Leviathans head-on to hold their attention.',
      'In Book III, Rex\'s patience with the "extra" nature of gods and the Doctor\'s scientific commentary completely evaporates. When the Doctor says "Interesting" after crawling out of a massive celestial beast by using biokinesis to force its jaws apart, Rex immediately tackles him into the rubble, shouting: "YOU ARE NOT ALLOWED TO SAY THAT ANYMORE!"',
      'Faced with the God of Ruin, whose touch decays stone, rusts weapons, and dissolves flesh, Rex punches it with everything he has, shattering his own wrist but laughing: "WORTH IT!" as he is launched through three continents.'
    ],
    traits: ['Kinetic Buildup', 'Shattered Arm Punch', 'High Durability', 'Unstoppable Force', 'Doctor-Thrower', 'Bear Hater']
  },
  'char-robby': {
    id: 'char-robby',
    icon: '🧠',
    name: 'Robby',
    books: 'Book III',
    role: 'The Mind-Control Prodigy · Soreign\'s Student',
    tagline: 'He has a recurring nightmare about being back in school, which makes the actual end of the world look incredibly unserious.',
    themePrimary: '#b050c0',
    themeGlow: 'rgba(176,80,192,.38)',
    lore: [
      'Robby is Soreign\'s mind-control specialist, whose hilarious and chaotic commentary provides a bizarre contrast to the apocalyptic stakes. Because his power was too unstable, he stayed behind in the castle during the Hunt in Book II, making him fresh and ready to mind-control entire armies of celestial warriors in Book III.',
      'His mind-control is immensely powerful but carries a heavy physical toll, causing blood to continuously pour from his nose and ears. Yet, Robby keeps laughing like a psychopath, calling his moves "CORPORATE COLLAPSE," "WORKPLACE DISTRUST," and "BETRAYAL ARC" as he forces enemy forces to slaughter each other.',
      'When the God of Dreams traps Robby in his deepest psychological fear—which is being naked back in school with missing assignments—the dream god smiles and says "Your mind is remarkably pathetic." But Robby instantly shatters the illusion, shouting: "I ALREADY SURVIVED SCHOOL!"',
      'Robby then reverse-traps the God of Dreams inside his own memories of pure chaos, involving Rex screaming, Rega on fire, and the Doctor saying "Interesting" twenty-seven times. The dream god escapes, looking genuinely disturbed by how messed-up Robby\'s mind is.'
    ],
    traits: ['Mind Control', 'Mass Redirection', 'Causality Overload', 'Trauma-Proof Mind', 'Nosebleed Catalyst', 'Betrayal Arc']
  },
  'char-koni': {
    id: 'char-koni',
    icon: '💨',
    name: 'Koni',
    books: 'Book II · Book III',
    role: 'The Atmospheric Controller · Soreign\'s Student',
    tagline: 'The air you breathe is his to give or take. He suggests you stay in his good books.',
    themePrimary: '#8ae0db',
    themeGlow: 'rgba(138,224,219,.38)',
    lore: [
      'Koni is Soreign\'s highly composed student who controls atmospheric pressure, air currents, and gases. While the others charge headfirst into battles, Koni cools his tea by manipulating tiny streams of air and calculates density fields.',
      'In Book III, Koni becomes the strategic field anchor. When facing the divine legion, he casually shifts the atmospheric composition, thinning oxygen in some areas to render thousands of enemy soldiers unconscious without landing a single physical blow.',
      'During the ultimate trial in the Colosseum of Gods, Koni creates high-pressure walls that deflect nuclear-level bursts from the God of Suns, while generating high-altitude jet streams to carry Soreign and the team across the battlefield.'
    ],
    traits: ['Atmospheric Control', 'Pressure Wall', 'Anoxia Field', 'Jet Stream', 'Composition Shift', 'Composed Tactician']
  },
  'char-rega': {
    id: 'char-rega',
    icon: '🔥',
    name: 'Rega',
    books: 'Book II · Book III',
    role: 'The Pyrokinetic Catalyst · Soreign\'s Student',
    tagline: 'He has a bad habit of catching fire mid-sentence. He claims it helps him concentrate.',
    themePrimary: '#f05030',
    themeGlow: 'rgba(240,80,48,.38)',
    lore: [
      'Rega is Soreign\'s highly volatile pyrokinetic student. Renowned for his explosive temper and absolute lack of heat control, he frequently catches himself on fire—a fact that both terrifies enemy soldiers and deeply annoys his classmate Koni.',
      'In Book III, Rega unleashes devastating, planet-wide columns of white-hot plasma inside the Colosseum of Gods. His accidental fire blasts are powerful enough to melt divine metal armor, creating massive pools of molten celestial steel.',
      'During the final confrontation, Rega pushes his core temperature to divine thresholds, turning into a living supernova that provides the massive thermal energy needed to help Soreign bypass the God of Metal\'s defenses.'
    ],
    traits: ['Pyrokinetic Catalyst', 'White-Hot Plasma', 'Living Supernova', 'Molten Armor', 'Thermal Backlash', 'Accidental Combustion']
  },
  'char-toro': {
    id: 'char-toro',
    icon: '🌀',
    name: 'Toro',
    books: 'Book II · Book III',
    role: 'The Spatial Swapper · Soreign\'s Student',
    tagline: 'He can trade places with anything from a falling leaf to an entire mountain range. Do not stand too close.',
    themePrimary: '#f4a261',
    themeGlow: 'rgba(244,162,97,.38)',
    lore: [
      'Toro is Soreign\'s spatial manipulation specialist. Quiet but incredibly precise, Toro has the unique ability to instantaneously swap the locations of physical matter, ranging from tiny weapons to colossal chunks of battlefield terrain.',
      'In Book III, Toro is the team\'s absolute savior during chaotic encounters. When the Gods unleash world-ending collapse coordinates, Toro simply swaps the collapsing terrain beneath the gods, dropping them into their own cataclysms.',
      'His coordination with Soreign is legendary: mid-strike, Toro swaps Soreign\'s position with a nearby dust particle, placing Soreign directly behind a god\'s blind spot to land a decisive, god-killing blow.'
    ],
    traits: ['Spatial Swapping', 'Matter Exchange', 'Position Displacement', 'Coordinate Substitution', 'Blind Spot Relocator', 'Tactical Swap']
  },
  'char-doctor': {
    id: 'char-doctor',
    icon: '🩺',
    name: 'The Doctor',
    books: 'Book II · Book III',
    role: 'Survivor of Sonaria · Biokinetic',
    tagline: 'Everyone from Sonaria died. He did too, for a while. Then he came back different.',
    themePrimary: '#3ca860',
    themeGlow: 'rgba(60,168,96,.38)',
    lore: [
      'When Regishire\'s army swept through Sonaria and left nothing standing, the death toll was total. Every knight, every servant, every prisoner in the cells below — gone. Except one. Nobody knows exactly how he survived.',
      'He was found three weeks later inside a structure that had no right to exist: a cocoon of living wood, woven together from the roots of six separate trees, sealed with something biological and warm.',
      'When he emerged, he was changed. The power he\'d had before — minor, theoretical, never tested under real pressure — had become something different entirely. Biokinesis. The ability to shape, command, and rebuild all living organic matter at will.',
      'In Book III, the Doctor is the team\'s survival mechanism. He heals bones in seconds. He rebuilds severed muscle mid-combat. He can reshape the battlefield itself if there are enough roots and living material to work with. The Alpha Beasts learned quickly that injuring the team was not always the advantage it seemed.'
    ],
    traits: ['Biokinesis', 'Full Organic Reshaping', 'Combat Healing', 'Sonaria Survivor', 'Living Architecture', 'Rebuilt']
  },
  'char-bloodborne': {
    id: 'char-bloodborne',
    icon: '👑',
    name: 'King Blood Borne V',
    books: 'Book I',
    role: 'The Pale King · Throne of Thorns',
    tagline: 'He sat on a throne of frozen black thorns and spoke in a voice like dry leaves across a grave. He was always the most dangerous person in any room.',
    themePrimary: '#c03030',
    themeGlow: 'rgba(192,48,48,.38)',
    lore: [
      'King Blood Borne V ruled Sonaria from a throne of twisted black metal that looked like frozen thorns. His skin was pale as parchment. His voice sounded like dry leaves skittering across a grave. His eyes glint glinted in the green torchlight with the intelligence of someone who has been waiting for exactly the right piece to arrive.',
      'He had been waiting for Raavos. He saw the Great Power inside the boy long before Raavos had any idea what he carried. When the knight brought Raavos before him, he didn\'t waste time on kindness. He said: "You are the key to destroying Regishire. Train until your blood turns to fire."',
      'Blood Borne V built Sonaria\'s training program around Raavos specifically. Every hollow armour, every green torch, every dripping stone corridor — it was all designed to produce one thing. A weapon precise enough to reach Regishire\'s heart.',
      'When Regishire\'s army reached Sonaria and the Munchkin of Doom\'s arrow found his throat in the ruins of the throne room, he died alone in the dark with no audience. What mattered was that he had already set everything in motion. Raavos was already gone. Already on his way to becoming exactly what the Pale King designed.'
    ],
    traits: ['The Pale King', 'Throne of Thorns', 'Strategic Vision', 'Sonaria\'s Architect', 'Cold Intelligence', 'Dead but Not Gone']
  }
};

export const SUPPORT_TIERS: SupportTier[] = [
  {
    id: 'witness',
    name: 'The Witness',
    concept: 'Free · Always',
    subtitle: 'Observer of Echoes',
    price: 'Free',
    priceNote: 'No cost. No conditions.',
    perks: [
      'Recommend ideas for the story',
      'Be part of the community',
      'Access to public chapters',
      'First to know about new releases'
    ],
    glyph: '🕯'
  },
  {
    id: 'mark',
    name: 'Bearer of the Mark',
    concept: 'Member · Recognised',
    subtitle: 'Marked by the Saga',
    price: '£4.99',
    priceNote: 'One time · Forever marked',
    perks: [
      'Exclusive supporter badge',
      'Your name in acknowledgments',
      'Minor character role in the book',
      'Early access to new chapters',
      'Direct line to the author'
    ],
    glyph: '⚔️',
    recommended: true
  },
  {
    id: 'breaker',
    name: 'Breaker of Fate',
    concept: 'Patron · Reality Breaker',
    subtitle: 'Patron of Worlds',
    price: '£19.99',
    priceNote: 'One time · You reshape the saga',
    perks: [
      'Highest tier supporter badge',
      'Fully personalised character',
      'Custom story element written for you',
      'Name in ALL acknowledgments',
      'Co-author credit on your chapter',
      'Signed digital copy of both books'
    ],
    glyph: '⚡',
    p2w: true
  }
];

export const LORE_KB = [
  {
    keys: ['raavos', 'archangel', 'lightning', 'great power', 'golden lightning', 'black lightning'],
    answer: 'Raavos is the archangel sealed — not destroyed — by something older than the gods themselves. Born cursed by golden lightning that always found him at the worst moment, he spent eight years being forged into a weapon by those who saw his potential before he did. The Great Power inside him did not awaken gently. It tore itself open when death came for him and refused to arrive.'
  },
  {
    keys: ['soul strike', 'heaven and hell', 'awakening', 'power', 'ability', 'technique'],
    answer: 'The techniques Raavos wields are not learned. They are remembered — dredged up from whatever ancient thing lives inside him. Soul Strike bypasses armour, flesh, and reason entirely. It strikes the essence. Heaven and Hell Strikes are what happens when the golden curse and the black lightning finally stop fighting each other. The result has ended things that should not be possible to end.'
  },
  {
    keys: ['soreign', 'great knight', 'three blades', 'knight', 'sonaria'],
    answer: 'Soreign, the Great Knight of Sonaria, arrived at the execution platform not because he was ordered to — but because he had already done the calculation. He trained Raavos for eight years without cruelty and without patience, only honest pressure. When the sky filled with wyverns and Raavos said now we fight, Soreign sheathed his doubt alongside his fear and drew all three blades.'
  },
  {
    keys: ['sonaria', 'king blood borne', 'blood borne', 'pale king', 'throne', 'fortress'],
    answer: 'Sonaria was a fortress carved from jagged stone, lit by green torches, and ruled by King Blood Borne V — a pale man whose voice sounded like dry leaves crossing a grave. He saw the weapon inside Raavos before Raavos did. He built Sonaria\'s entire training apparatus around one purpose: producing something lethal enough to reach the heart of Regishire. He succeeded. He did not survive to see it.'
  },
  {
    keys: ['regishire', 'hierarchy', 'empire', 'execution', 'docks', 'kingdom'],
    answer: 'Regishire is the empire that ordered Raavos executed. Its ruling body — the Hierarchy — controls through absolute force, and when Sonaria fell, they swept through it with 300,000 foot soldiers and 100,000 wyverns. They believed this ended the threat. They were wrong. The boy they tried to behead was already gone, already becoming something they had no framework to understand.'
  },
  {
    keys: ['munchkin', 'blind', 'dagger', 'blindfold', 'doom', 'tiny', 'small', 'raga'],
    answer: 'The Munchkin of Doom, Raga, stood one foot tall, wore a blindfold through every fight he had ever won, and worked for the Hierarchy as its most certain instrument. His dagger had ended kings. When he finally removed the cloth from his eyes and turned them on Raavos in the ruins of Starborne — the cave began to disintegrate around them. His last recorded words were: "Nah, I\'d win."'
  },
  {
    keys: ['starborne', 'mountain', 'beast', 'beast of starborne', 'cavern'],
    answer: 'Starborne was the mountain sanctuary where Soreign trained Raavos for five years after Sonaria fell. Beneath it slept the Beast — an ancient guardian that had never been fully woken, not for any reason, not by anyone. Raavos woke it with an axe. The Beast emerged into the burning mountain city, took one look at what the Hierarchy had done to its domain, and resolved the situation like a living landslide.'
  },
  {
    keys: ['cosmic', 'trial', 'game', 'universe', 'extinction', 'planet', 'world', 'god', 'alpha', 'beast'],
    answer: 'The cosmic trial is simple in concept and total in consequence. Every intelligent world receives the message at once, burned across its sky: defeat your assigned God, or face extinction. On Earth, the God assigned was Crius — divine, radiant, and carrying something inside him that should not have been possible. The Alpha Beasts that followed were thirteen in number, each one adapting mid-battle to every wound they received.'
  },
  {
    keys: ['crius', 'god of light', 'god', 'light', 'divine', 'vessel'],
    answer: 'Crius descended as Earth\'s extinction — and chose, against every divine instinct, to become its defender instead. What changed him is not fully understood. What is known: inside his radiant form, a fragment of dark lightning presses against the walls. It whispers strategy. It flickers warnings. It waits, with extraordinary patience, for the moment the final trial demands it act.'
  },
  {
    keys: ['doctor', 'biokinesis', 'biokinetic', 'wood', 'cocoon', 'organic', 'healing'],
    answer: 'Everyone from Sonaria perished. He did too, for a while. He was found three weeks later inside a cocoon of living wood — six trees woven together, sealed with something biological and warm. When he emerged, the power he had carried before had become something else entirely. Biokinesis. He can rebuild severed muscle mid-combat, reshape the battlefield from its roots, heal what should not heal in the time it takes to breathe.'
  },
  {
    keys: ['alpha', 'mammoth', 'dragon', 'titan', 'leviathan', 'serpent', 'python', 'jormungandar', 'stalker', 'colossus'],
    answer: 'The thirteen Alpha Beasts were not merely powerful — they were adaptive. Each wound they received became information. Each strategy used against them was accounted for within moments. The only viable counter was total, overwhelming force before adaptation completed. Soreign\'s team learned this through cost. The World Serpent Jormungandar was the last to fall. Three blades. One perfect strike. The hunt ended. The real trial was still waiting.'
  },
  {
    keys: ['python', 'serpent', 'son of jormungandar', 'son'],
    answer: 'Python — son of Jormungandar — was the creature Raavos faced when the black lightning first cracked through his restraint. It devoured earth and stone and emerged from below to swallow everything in its path. Raavos let it come. Then he gathered the lightning in his palm and removed the serpent\'s head from the situation entirely. "What was that serpent\'s name?" he asked afterward, breathing hard. The answer came from the dark.'
  },
  {
    keys: ['sealed', 'fragment', 'sealed inside', 'vessel', 'inside', 'imprisoned'],
    answer: 'Raavos is sealed, not dead. The distinction matters. A fragment of him — dark lightning pressing against the walls of a god — has been biding its time with patience that borders on the inhuman. It communicates in flickers. It advises in whispers. It is waiting for something specific. When that moment arrives, the divine walls holding it will not be enough.'
  },
  {
    keys: ['book', 'book 1', 'book one', 'the rise', 'book 2', 'book two', 'destroyer', 'worlds', 'book 3', 'book three', 'final trial', 'colosseum'],
    answer: 'The saga spans three books. The first traces the making of a weapon — a boy who survived his own execution and spent eight years being hammered into something far more dangerous. The second begins after the weapon is sealed, and follows the people left behind as the universe itself places every world on trial. The third, "The Final Trial," takes place in the planet-sized Colosseum of Gods, where the laws of existence are deconstructed in a final, absolute struggle.'
  },
  {
    keys: ['author', 'who wrote', 'who made', 'creator', 'written', 'wrote'],
    answer: 'The author of the Raavos saga has not chosen to be named here. What is known is this: the story began as a random thought in school — something small, something private — and refused to stay small. All three books emerged from a single refusal to let an idea die. The authorship is real. The story is real. The rest is still being written.'
  },
  {
    keys: ['order', 'witness', 'bearer', 'breaker', 'patron', 'mark', 'fate', 'support', 'tier'],
    answer: 'The Order exists for those who wish to be more than readers. The Witness stands at the edge of the world, watching. The Bearer of the Mark is written into the acknowledgments — a name that survives in print. The Breaker of Fate shapes the saga itself: a personalised character, a custom story element, a permanent mark on every book that follows. Choose carefully. All three are real.'
  },
  {
    keys: ['gatekeeper', 'chef', 'spatula', 'toaster', 'oven', 'frying pan', 'air fryer', 'microwave', 'appliances'],
    answer: 'In Book III, the Gatekeeper of Malakor brings kitchen appliances to war inside the Colosseum of Gods. He smacks enemies with frying pans and cutting boards, sucks up blades with air fryers, and uses pressure cookers and toasters to fire explosive artillery and burning light, proving to be an absolute menace.'
  },
  {
    keys: ['daren', 'sleepy', 'gravity', 'singularity', 'pocketing'],
    answer: 'Daren is a sleepy gravity user who slept through the apocalypse in Book III. Upon waking, he easily pockets gravity, compressing planetary-scale compression waves into black orbiting spheres, and eventually folds gravity layers inward by three thousand percent to seal Raga.'
  },
  {
    keys: ['rex', 'brawler', 'punch', 'kinetic', 'ruin'],
    answer: 'Rex is a kinetic brawler who absorbs impacts to charge up massive punches. In Book III, he punches through the decaying touch of the God of Ruin, breaking his own bones but declaring it "worth it" with absolute bravado.'
  },
  {
    keys: ['robby', 'mind control', 'school', 'dream', 'maid'],
    answer: 'Robby is a mind-control user who causes large-scale infighting among celestial soldiers. When the God of Dreams attempts to traumatize him with school-related illusions (such as wearing a maid outfit in a classroom), Robby breaks it instantly and reverse-traps the god in his own chaotic memories.'
  },
  {
    keys: ['sukuna', 'world destroyer', 'mahoraga', 'adaptation'],
    answer: 'In Book III, Sukuna, the World Destroyer, and Mahoraga, the God of Adaptation, join the final trial. Mahoraga is shattered when Raga introduces an impossible condition, and Sukuna is sliced apart when Soreign coats his blades in Raavos\'s permanent anti-divine lightning.'
  },
  {
    keys: ['koni', 'wind', 'atmosphere', 'pressure', 'air'],
    answer: 'Koni is Soreign\'s highly composed student who controls atmospheric pressure, air currents, and gases. In Book III, he becomes the strategic field anchor, thinning oxygen in some areas to render thousands of enemy soldiers unconscious, and creating high-pressure walls that deflect solar-level bursts.'
  },
  {
    keys: ['rega', 'fire', 'plasma', 'supernova', 'heat', 'burn'],
    answer: 'Rega is Soreign\'s highly volatile pyrokinetic student. In Book III, Rega unleashes devastating columns of white-hot plasma inside the Colosseum of Gods, melting divine armor and eventually pushing his core temperature to divine thresholds as a living supernova.'
  },
  {
    keys: ['toro', 'swap', 'spatial', 'swapper', 'matter'],
    answer: 'Toro is Soreign\'s spatial manipulation specialist. He has the unique ability to swap the physical locations of matter. In Book III, he swaps collapsing terrain coordinates beneath gods, and swaps Soreign with particles of dust to land decisive, blind-spot strikes.'
  }
];

export const SEARCH_CORE_NOUNS = ['raavos', 'soreign', 'sonaria', 'starborne', 'regishire', 'crius', 'munchkin', 'doctor', 'gatekeeper', 'daren', 'rex', 'robby', 'sukuna', 'mahoraga', 'clownpierce', 'koni', 'rega', 'toro'];
