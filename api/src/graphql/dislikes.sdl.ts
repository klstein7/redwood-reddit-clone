export const schema = gql`
  type Dislike {
    id: String!
    post: Post!
    postId: String!
    user: User!
    userId: String!
    createdAt: DateTime!
  }

  type Query {
    dislikes: [Dislike!]!
    dislike(id: String!): Dislike
    didUserDislikePost(postId: String!): Dislike
  }

  input CreateDislikeInput {
    postId: String!
  }

  input UpdateDislikeInput {
    postId: String
    userId: String
  }

  type Mutation {
    createDislike(input: CreateDislikeInput!): Dislike!
    updateDislike(id: String!, input: UpdateDislikeInput!): Dislike!
    deleteDislike(id: String!): Dislike!
  }
`
