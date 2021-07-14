import { Divider, Flex, Stack, Text, Box, Button } from '@chakra-ui/react'
import { useQuery } from '@redwoodjs/web'
import CreateCommentModal from '../CreateCommentModal/CreateCommentModal'

export const CHILDREN_COMMENTS_FOR_PARENT = gql`
  query ChildrenCommentsForParentQuery($parentId: String!) {
    childrenCommentsForParent(parentId: $parentId) {
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

const Comment = ({ comment }) => {
  const { data: children } = useQuery(CHILDREN_COMMENTS_FOR_PARENT, {
    variables: { parentId: comment.id },
  })
  return (
    <Stack
      direction="column"
      border="1px"
      rounded="md"
      borderColor="gray.700"
      borderLeft="2px"
      borderLeftColor="gray.500"
      p={3}
      spacing={3}
      bg="gray.900"
    >
      <Box>
        <Flex align="flex-end">
          <Text>{comment.user.name}</Text>
          <Text fontSize="sm" ml={1} color="gray.400">
            {comment.createdAt.replace('T', ' ').split('.')[0]}
          </Text>
        </Flex>
        <Divider variant="dashed" mt={1} />
      </Box>
      <Text color="gray.300">{comment.body}</Text>
      <Box>
        <CreateCommentModal
          parentId={comment.id}
          postId={comment.postId}
          modalTitle="Add Reply"
        />
      </Box>
      {children?.childrenCommentsForParent.map((child) => (
        <Comment key={child.id} comment={child} />
      ))}
    </Stack>
  )
}

export default Comment
