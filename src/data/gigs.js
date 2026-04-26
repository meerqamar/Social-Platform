const baseSeedGigs = [
  {
    title: 'I will build a modern React landing page',
    seller: { name: 'Sarah K.', level: 'Top Rated', avatar: 'https://i.pravatar.cc/50?u=1' },
    rating: 4.9,
    reviewCount: 312,
    price: 150,
    deliveryDays: 3,
    tags: ['React', 'Responsive', 'Tailwind'],
  },
  {
    title: 'Professional logo design for your brand',
    seller: { name: 'Mike T.', level: 'Level 2', avatar: 'https://i.pravatar.cc/50?u=2' },
    rating: 4.7,
    reviewCount: 189,
    price: 75,
    deliveryDays: 5,
    tags: ['Logo', 'Branding', 'Illustrator'],
  },
  {
    title: 'SEO optimization for your website',
    seller: { name: 'Anna L.', level: 'Top Rated', avatar: 'https://i.pravatar.cc/50?u=3' },
    rating: 4.8,
    reviewCount: 456,
    price: 200,
    deliveryDays: 7,
    tags: ['SEO', 'Analytics', 'Marketing'],
  },
  {
    title: 'Mobile app development with React Native',
    seller: { name: 'David R.', level: 'Level 1', avatar: 'https://i.pravatar.cc/50?u=4' },
    rating: 4.6,
    reviewCount: 98,
    price: 500,
    deliveryDays: 14,
    tags: ['React Native', 'Mobile', 'iOS'],
  },
  {
    title: 'Custom WordPress theme development',
    seller: { name: 'Emma S.', level: 'Top Rated', avatar: 'https://i.pravatar.cc/50?u=5' },
    rating: 4.9,
    reviewCount: 234,
    price: 300,
    deliveryDays: 10,
    tags: ['WordPress', 'PHP', 'CSS'],
  },
  {
    title: 'Data visualization with D3.js',
    seller: { name: 'John D.', level: 'Level 2', avatar: 'https://i.pravatar.cc/50?u=6' },
    rating: 4.5,
    reviewCount: 67,
    price: 250,
    deliveryDays: 8,
    tags: ['D3.js', 'Data', 'Charts'],
  },
];

export const gigs = Array.from({ length: 200 }, (_, i) => {
  const baseGig = baseSeedGigs[i % baseSeedGigs.length];
  const tagsQuery = baseGig.tags[0].toLowerCase().replace(/[^a-z]/g, '');
  
  return {
    id: i + 1,
    ...baseGig,
    title: `${baseGig.title} (${i + 1})`,
    image: `https://loremflickr.com/300/200/${tagsQuery},tech?lock=${i + 1}`,
  };
});