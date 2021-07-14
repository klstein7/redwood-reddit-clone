export const schema = gql`
  type Like {
    id: String!
    post: Post!
    postId: String!
    user: User!
    userId: String!
    createdAt: DateTime!
  }

  type Query {
    likes: [Like!]!
    like(id: String!): Like
    didUserLikePost(postId: String!): Like
  }

  input CreateLikeInput {
    postId: String!
  }

  input UpdateLikeInput {
    postId: String
    userId: String
  }

  type Mutation {
    createLike(input: CreateLikeInput!): Like!
    updateLike(id: String!, input: UpdateLikeInput!): Like!
    deleteLike(id: String!): Like!
  }
`
