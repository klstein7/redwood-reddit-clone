export const schema = gql`
  type Count {
    likes: Int!
    dislikes: Int!
    comments: Int!
  }
  type Post {
    id: String!
    title: String!
    url: String
    body: String
    createdAt: DateTime!
    user: User!
    userId: String!
    _count: Count!
  }

  type Query {
    posts: [Post!]!
    post(id: String!): Post
  }

  input CreatePostInput {
    title: String!
    url: String
    body: String
  }

  input UpdatePostInput {
    title: String
    url: String
    body: String
    userId: String
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post!
    updatePost(id: String!, input: UpdatePostInput!): Post!
    deletePost(id: String!): Post!
  }
`
