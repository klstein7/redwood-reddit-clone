import type { FindPostListQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { Box, Stack } from '@chakra-ui/react'
import PostItem from '../PostItem/PostItem'

export const QUERY = gql`
  query FetchPostInformationQuery {
    posts {
      id
      title
      url
      body
      createdAt
      user {
        name
      }
      _count {
        likes
        dislikes
        comments
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ posts }: CellSuccessProps<FindPostListQuery>) => {
  return (
    <Stack direction="column" w="100%" bg="gray.900" p={5} rounded="md">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </Stack>
  )
}
