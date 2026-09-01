export const identity = {
  name: 'Abhash Deep',
  role: 'Creative & Social Media Professional',
  descriptor: 'Content • Design • Branding • Digital Experience',
  summary: 'Creative by instinct, technical by experience — I build ideas that move people, look sharp, and work across content, design, and digital experiences.',
};

export type PortfolioAsset = {
  id: string;
  src: string;
  alt: string;
  label: string;
  externalUrl?: string;
};

export const portfolioAssets = {
  youtubeChannel: {
    id: 'youtube-channel',
    src: '/portfolio/01_youtube_noobsuckk.png',
    alt: 'NoobSuckk YouTube channel screenshot',
    label: 'NoobSuckk / YouTube',
    externalUrl: 'https://www.youtube.com/@noobsuckk9677',
  },
  cannibalsOffer: {
    id: 'cannibals-offer',
    src: '/portfolio/02_cannibals_offer_letter.png',
    alt: 'Cannibals Media offer letter',
    label: 'Cannibals Media / Documentation',
  },
  flipkartTeam: {
    id: 'flipkart-team',
    src: '/portfolio/03_flipkart_experience.jpg',
    alt: 'Flipkart team photo',
    label: 'Flipkart / Experience',
  },
  aicteCertificate: {
    id: 'aicte-certificate',
    src: '/portfolio/04_aicte_first_place_certificate.png',
    alt: 'AICTE ICUBE Innovation Council Logo Design Competition certificate',
    label: 'AICTE / Recognition',
  },
  cannibalsWebsite: {
    id: 'cannibals-website',
    src: '/portfolio/05_cannibals_website.png',
    alt: 'Cannibals website screenshot',
    label: 'Cannibals Media / Graphic design',
    externalUrl: 'https://cannibals.digital/',
  },
  instagramNoobSuckk: {
    id: 'instagram-noobsuckk',
    src: '/portfolio/06_instagram_noobsuckk.jpeg',
    alt: 'NoobSuckk Instagram screenshot',
    label: 'NoobSuckk / Instagram / Content & Short-form Video',
  },
  instagramUndrCntrl: {
    id: 'instagram-undrcntrl',
    src: '/portfolio/07_instagram_undrctrl.jpeg',
    alt: 'UndrCntrl Instagram screenshot',
    label: 'UndrCntrl / Social Media / Brand Content',
  },
  instagramJethalal: {
    id: 'instagram-jethalal',
    src: '/portfolio/08_instagram_jethalal.jpeg',
    alt: 'Jethalal Instagram screenshot',
    label: 'Jethalal / Entertainment Content',
  },
} satisfies Record<string, PortfolioAsset>;

export type Experience = {
  period: string;
  company: string;
  title: string;
  focus: string[];
  primaryAssetId?: keyof typeof portfolioAssets;
  supportingAssetIds?: (keyof typeof portfolioAssets)[];
};

export const socialMedia = [
  { name: 'NoobSuckk', category: 'Instagram / Short-form video & creator content', assetId: 'instagramNoobSuckk' as const, note: 'A creator-led presence focused on storytelling, hooks, and platform-native content.' },
  { name: 'UndrCntrl', category: 'Social media / Brand content', assetId: 'instagramUndrCntrl' as const, note: 'Visual communication built around mood, audience behavior, and clear brand direction.' },
  { name: 'Jethalal', category: 'Entertainment content', assetId: 'instagramJethalal' as const, note: 'A content style study shaped by performance, timing, and audience relevance.' },
];

export const experience: Experience[] = [
  {
    period: 'Nov 2024 — Feb 2025',
    company: 'Cannibals Media',
    title: 'Graphic Designer & Client Coordination',
    focus: ['Graphic design', 'Client coordination', 'Brand communication'],
    primaryAssetId: 'cannibalsWebsite',
    supportingAssetIds: ['cannibalsOffer'],
  },
  {
    period: 'Aug 2025 — Feb 2026',
    company: 'Flipkart',
    title: 'Executive Director – On-site Operations',
    focus: ['Operations', 'Stakeholder coordination', 'Process improvement'],
    primaryAssetId: 'flipkartTeam',
  },
  {
    period: '2026 — Present',
    company: 'Capgemini',
    title: 'Software Engineer',
    focus: ['Software engineering', 'Product thinking', 'Digital execution'],
  },
];

export const skills = [
  { name: 'Social media strategy', detail: 'Content / audience / positioning' },
  { name: 'Graphic design', detail: 'Visual systems / branding / identity' },
  { name: 'Creative direction', detail: 'Mood / story / digital expression' },
  { name: 'Content production', detail: 'Hooks / scripting / publishing' },
  { name: 'Software engineering', detail: 'Build / debug / ship' },
  { name: 'Client communication', detail: 'Listen / align / clarify' },
  { name: 'Operations', detail: 'Coordinate / run / improve' },
];

export const socials = [
  { label: 'LinkedIn', url: 'https://linkedin.com/in/abhashdeep' },
  { label: 'GitHub', url: 'https://github.com/abazzzdeep' },
  { label: 'YouTube', url: 'https://www.youtube.com/@noobsuckk9677' },
  { label: 'Instagram', url: 'https://www.instagram.com/abhash_deep' },
];

export const mediaPillars = [
  { name: 'Instagram', status: '@abhash_deep', note: 'Short-form stories, creator-led content, and visual identity work.' },
  { name: 'YouTube', status: '@noobsuckk9677', note: 'Video concepts, scripting, edits, thumbnails, and publishing flow.' },
  { name: 'Content strategy', status: 'Creative lens', note: 'Audience-first thinking shaped by clarity, consistency, and relevance.' },
  { name: 'Design', status: 'Brand-first', note: 'Visual direction built to land across content, pages, and digital touchpoints.' },
  { name: 'Creative direction', status: 'System thinking', note: 'A balance of concept, craft, and technical clarity.' },
  { name: 'Publishing', status: 'Workflow', note: 'Built for release cycles, channel consistency, and responsive creative output.' },
  { name: 'Digital experience', status: 'Product thinking', note: 'Where creative work meets usability, logic, and real-world execution.' },
];

export const youtubePipeline = [
  'Idea',
  'Script',
  'Edit',
  'Thumbnail',
  'Publish',
];

export const exploring = [
  'The overlap between a good story and a good system.',
  'How creative thinking becomes stronger with technical execution.',
  'Building digital work that feels clear, human, and useful.',
];