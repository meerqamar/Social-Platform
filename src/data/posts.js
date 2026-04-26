export const generateMockPosts = (count, startId = 1) => {
  return Array.from({ length: count }, (_, i) => {
    const id = startId + i;
    return {
      id,
      author: {
        name: `User ${id}`,
        username: `@user${id}`,
        avatar: `https://i.pravatar.cc/150?u=${id}`
      },
      content: `This is a generic post body for post number ${id}. It represents the kind of content a user might share on this amazing new social platform!`,
      image: id % 3 === 0 ? `https://picsum.photos/seed/post${id}/600/400` : null, // Every 3rd post has an image
      likes: Math.floor(Math.random() * 500),
      comments: Math.floor(Math.random() * 50),
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    };
  });
};
