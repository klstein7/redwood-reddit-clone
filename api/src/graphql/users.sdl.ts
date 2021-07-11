export const schema = gql`
  type User {
    id: String!
    email: String!
    name: String
    posts: [Post]!
  }

  type Query {
    users: [User!]!
    user(id: String!): User
  }

  input CreateUserInput {
    email: String!
    name: String
  }

  input UpdateUserInput {
    email: String
    name: String
  }

  input UpsertUserInput {
    id: String
    email: String!
    name: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: String!, input: UpdateUserInput!): User!
    upsertUser(input: UpsertUserInput!): User!
    deleteUser(id: String!): User!
  }
`
