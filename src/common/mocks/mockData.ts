export interface Movie {
  id: string;
  title: string;
  description: string;
  backdrop_path: string;
  poster_path: string;
  video_url: string;
  category: string;
  match_percentage: string;
}

export const mockData: Movie[] = [
  {
    id: '1',
    title: 'Big Buck Bunny',
    description:
      'A large and lovable rabbit deals with three bullying rodents who are determined to squelch his happiness. This animated short showcases stunning visuals and a heartwarming story.',
    backdrop_path:
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80',
    poster_path:
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    category: 'Trending Now',
    match_percentage: '98% Match',
  },
  {
    id: '2',
    title: 'Elephants Dream',
    description:
      'Friends Proog and Emo journey inside the folds of a seemingly infinite Machine, exploring a dark and twisted labyrinth of wires, gears, and cogs that challenges their perception of reality.',
    backdrop_path:
      'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=1200&q=80',
    poster_path:
      'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=600&q=80',
    video_url:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    category: 'Trending Now',
    match_percentage: '95% Match',
  },
  {
    id: '3',
    title: 'Sintel',
    description:
      'A lonely young woman befriends a baby dragon she names Scales. When Scales is kidnapped by an adult dragon, Sintel embarks on a perilous quest across treacherous landscapes to rescue her only companion.',
    backdrop_path:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    poster_path:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    category: 'Trending Now',
    match_percentage: '99% Match',
  },

  {
    id: '4',
    title: 'Tears of Steel',
    description:
      'In an apocalyptic future, a group of soldiers and scientists takes refuge in Amsterdam to stop an army of sentient robots threatening to wipe out humanity.',
    backdrop_path:
      'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&w=1200&q=80',
    poster_path:
      'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&w=600&q=80',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    category: 'Action Movies',
    match_percentage: '92% Match',
  },
  {
    id: '5',
    title: 'For Bigger Blazes',
    description:
      'An intense short showcasing fiery explosions and high-octane stunts. When the heat is turned up, only the boldest survive the inferno of relentless action.',
    backdrop_path:
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&q=80',
    poster_path:
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=600&q=80',
    video_url:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    category: 'Action Movies',
    match_percentage: '88% Match',
  },
  {
    id: '6',
    title: 'For Bigger Joyrides',
    description:
      "Buckle up for a high-speed chase across sweeping desert highways. Adrenaline-fueled driving sequences push the limits of what's possible behind the wheel.",
    backdrop_path:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80',
    poster_path:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=600&q=80',
    video_url:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    category: 'Action Movies',
    match_percentage: '94% Match',
  },

  {
    id: '7',
    title: 'For Bigger Escapes',
    description:
      'A hilarious romp through increasingly absurd escape scenarios. When things go wrong, the only way out is through laughter and sheer improvisation.',
    backdrop_path:
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80',
    poster_path:
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80',
    video_url:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    category: 'Comedies',
    match_percentage: '85% Match',
  },
  {
    id: '8',
    title: 'For Bigger Fun',
    description:
      'A feel-good comedy that celebrates the simple joys of life. Friends gather for a weekend of unexpected adventures that bring them closer together.',
    backdrop_path:
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80',
    poster_path:
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    category: 'Comedies',
    match_percentage: '91% Match',
  },
  {
    id: '9',
    title: 'For Bigger Meltdowns',
    description:
      'When everything that can go wrong does, chaos becomes the punchline. A side-splitting series of escalating disasters turns an ordinary day into comedic gold.',
    backdrop_path:
      'https://images.unsplash.com/photo-1535016120720-40c746a6580c?auto=format&fit=crop&w=1200&q=80',
    poster_path:
      'https://images.unsplash.com/photo-1535016120720-40c746a6580c?auto=format&fit=crop&w=600&q=80',
    video_url:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    category: 'Comedies',
    match_percentage: '89% Match',
  },

  {
    id: '10',
    title: 'Cosmos Wanderer',
    description:
      'A lone astronaut drifts through uncharted galaxies searching for the origin signal that birthed all intelligent life. Stunning visuals meet existential wonder in this deep-space odyssey.',
    backdrop_path:
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80',
    poster_path:
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=600&q=80',
    video_url:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    category: 'Sci-Fi & Fantasy',
    match_percentage: '96% Match',
  },
  {
    id: '11',
    title: 'Neon Frontier',
    description:
      'In a rain-soaked cyberpunk metropolis, a rogue hacker uncovers a conspiracy that could collapse the boundary between the digital realm and reality itself.',
    backdrop_path:
      'https://images.unsplash.com/photo-1515634928627-2a4e0dae3ddf?auto=format&fit=crop&w=1200&q=80',
    poster_path:
      'https://images.unsplash.com/photo-1515634928627-2a4e0dae3ddf?auto=format&fit=crop&w=600&q=80',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    category: 'Sci-Fi & Fantasy',
    match_percentage: '93% Match',
  },
  {
    id: '12',
    title: "Dragon's Hollow",
    description:
      'An outcast blacksmith discovers she can forge weapons from dragon fire, launching a rebellion against the sorcerer-king who rules the five kingdoms with an iron grip.',
    backdrop_path:
      'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',
    poster_path:
      'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=600&q=80',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    category: 'Sci-Fi & Fantasy',
    match_percentage: '97% Match',
  },

  {
    id: '13',
    title: 'Ocean Horizons',
    description:
      "Dive into the deepest trenches of our oceans to witness bioluminescent creatures and geological wonders never before captured on film. A breathtaking exploration of Earth's final frontier.",
    backdrop_path:
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80',
    poster_path:
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=600&q=80',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    category: 'Documentaries',
    match_percentage: '94% Match',
  },
  {
    id: '14',
    title: 'Wild Serengeti',
    description:
      'Follow the great migration across the African savanna as millions of wildebeest brave crocodile-infested rivers and stalking predators in their relentless pursuit of green pastures.',
    backdrop_path:
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
    poster_path:
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    category: 'Documentaries',
    match_percentage: '90% Match',
  },
  {
    id: '15',
    title: 'Peak to Peak',
    description:
      "Elite mountaineers attempt to summit the world's seven highest peaks in a single year. Stunning aerial footage captures the brutal beauty and lethal danger of life above 8,000 meters.",
    backdrop_path:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    poster_path:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    video_url:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    category: 'Documentaries',
    match_percentage: '87% Match',
  },

  {
    id: '16',
    title: 'Midnight Protocol',
    description:
      'A retired spy is pulled back into the shadows when classified documents surface, pointing to a mole embedded at the highest level of government. Trust no one.',
    backdrop_path:
      'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&w=1200&q=80',
    poster_path:
      'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&w=600&q=80',
    video_url:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    category: 'Thrillers',
    match_percentage: '91% Match',
  },
  {
    id: '17',
    title: 'The Silent Witness',
    description:
      'A court stenographer stumbles upon evidence buried in trial transcripts that links a powerful judge to a decades-old murder. Silence becomes the deadliest weapon.',
    backdrop_path:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
    poster_path:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    video_url:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    category: 'Thrillers',
    match_percentage: '86% Match',
  },
  {
    id: '18',
    title: 'Glass Cage',
    description:
      'Twelve strangers wake up inside a transparent maze with no memory of how they arrived. As walls shift and alliances fracture, only one will find the way out alive.',
    backdrop_path:
      'https://images.unsplash.com/photo-1533613220915-609f661697d4?auto=format&fit=crop&w=1200&q=80',
    poster_path:
      'https://images.unsplash.com/photo-1533613220915-609f661697d4?auto=format&fit=crop&w=600&q=80',
    video_url:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    category: 'Thrillers',
    match_percentage: '93% Match',
  },
];
