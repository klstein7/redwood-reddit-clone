import { Stack, Center } from '@chakra-ui/react'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import Comment from '../Comment/Comment'

export const QUERY = gql`
  query FindCommentListQuery($postId: String!) {
    rootComments: rootCommentsForPost(postId: $postId) {
      id
      body
      createdAt
      postId
      user {
        name
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => (
  <Center w="100%" p={5} mt={2} color="gray.300">
    No comments to show. Be the first to add a comment!
  </Center>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ rootComments }: CellSuccessProps) => {
  return (
    <Stack direction="column" p={3} mt={2}>
      {rootComments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </Stack>
  )
}
