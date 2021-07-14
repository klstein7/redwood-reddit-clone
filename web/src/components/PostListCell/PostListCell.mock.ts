// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  posts: [
    {
      id: '123',
      title: 'Test post',
      body: 'Hey this is a test post!',
      createdAt: '2021-07-11T22:24:41.238Z',
      user: {
        name: 'Test user',
      },
      _count: {
        likes: 3,
        dislikes: 0,
      },
    },
  ],
})
