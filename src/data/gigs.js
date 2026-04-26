const baseSeedGigs = [
  {
    title: 'I will build a modern React landing page',
    seller: { name: 'Sarah K.', level: 'Top Rated', avatar: 'https://i.pravatar.cc/50?u=1' },
    rating: 4.9,
    reviewCount: 312,
    price: 150,
    deliveryDays: 3,
    tags: ['React', 'Responsive', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
  },
  {
    title: 'Professional logo design for your brand',
    seller: { name: 'Mike T.', level: 'Level 2', avatar: 'https://i.pravatar.cc/50?u=2' },
    rating: 4.7,
    reviewCount: 189,
    price: 75,
    deliveryDays: 5,
    tags: ['Logo', 'Branding', 'Illustrator'],
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
  },
  {
    title: 'SEO optimization for your website',
    seller: { name: 'Anna L.', level: 'Top Rated', avatar: 'https://i.pravatar.cc/50?u=3' },
    rating: 4.8,
    reviewCount: 456,
    price: 200,
    deliveryDays: 7,
    tags: ['SEO', 'Analytics', 'Marketing'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
  },
  {
    title: 'Mobile app development with React Native',
    seller: { name: 'David R.', level: 'Level 1', avatar: 'https://i.pravatar.cc/50?u=4' },
    rating: 4.6,
    reviewCount: 98,
    price: 500,
    deliveryDays: 14,
    tags: ['React Native', 'Mobile', 'iOS'],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
  },
  {
    title: 'Custom WordPress theme development',
    seller: { name: 'Emma S.', level: 'Top Rated', avatar: 'https://i.pravatar.cc/50?u=5' },
    rating: 4.9,
    reviewCount: 234,
    price: 300,
    deliveryDays: 10,
    tags: ['WordPress', 'PHP', 'CSS'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
  },
  {
    title: 'Data visualization with D3.js',
    seller: { name: 'John D.', level: 'Level 2', avatar: 'https://i.pravatar.cc/50?u=6' },
    rating: 4.5,
    reviewCount: 67,
    price: 250,
    deliveryDays: 8,
    tags: ['D3.js', 'Data', 'Charts'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
  },
];

export const gigs = Array.from({ length: 200 }, (_, i) => {
  const baseGig = baseSeedGigs[i % baseSeedGigs.length];
  
  return {
    ...baseGig,
    id: i + 1,
    title: `${baseGig.title} (${i + 1})`,
  };
});