import { childrenCommentsForParent } from './../services/comments/comments'
export const schema = gql`
  type Comment {
    id: String!
    body: String!
    post: Post!
    postId: String!
    user: User!
    userId: String!
    parent: Comment
    parentId: String
    comments: [Comment]!
    createdAt: DateTime!
  }

  type Query {
    comments: [Comment!]!
    comment(id: String!): Comment
    rootCommentsForPost(postId: String!): [Comment!]!
    childrenCommentsForParent(parentId: String!): [Comment!]!
  }

  input CreateCommentInput {
    body: String!
    postId: String!
    userId: String
    parentId: String
  }

  input UpdateCommentInput {
    body: String
    postId: String
    userId: String
    parentId: String
  }

  type Mutation {
    createComment(input: CreateCommentInput!): Comment!
    updateComment(id: String!, input: UpdateCommentInput!): Comment!
    deleteComment(id: String!): Comment!
  }
`
