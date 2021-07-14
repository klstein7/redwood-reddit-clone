import {
  Box,
  Button,
  Divider,
  Flex,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { FaPlus } from 'react-icons/fa'
import PostItem from '../PostItem/PostItem'
import CommentListCell from 'src/components/CommentListCell'
import CreateCommentModal from '../CreateCommentModal/CreateCommentModal'

export const QUERY = gql`
  query FindPostDetailQuery($postId: String!) {
    post(id: $postId) {
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

export const Success = ({ post }: CellSuccessProps) => {
  return (
    <>
      <Stack direction="column" w="100%" bg="gray.900" p={5} rounded="md">
        <PostItem post={post} />
        <Box w="100%" bg="gray.800" p={5} rounded="md">
          <Flex align="center">
            <Text fontSize={'lg'} fontWeight={500}>
              Comments
            </Text>
            <Spacer />
            <CreateCommentModal
              parentId={null}
              postId={post.id}
              modalTitle="Add Comment"
            />
          </Flex>
          <Divider variant="dashed" />
          <CommentListCell postId={post.id} />
        </Box>
      </Stack>
    </>
  )
}
