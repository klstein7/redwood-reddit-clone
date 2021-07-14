import {
  Box,
  Divider,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Stack,
  StackDivider,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react'
import { Link, routes } from '@redwoodjs/router'

import { FaChevronRight, FaCommentAlt } from 'react-icons/fa'
import LikeDislikePost from '../LikeDislikePost/LikeDislikePost'

const PostItem = ({ post }) => {
  return (
    <Stack
      w="100%"
      bg="gray.800"
      p={4}
      rounded="xl"
      direction="row"
      align="center"
      spacing={4}
    >
      <LikeDislikePost postId={post.id} voteCount={post._count} />
      <Stack w="100%" direction="column" spacing={1}>
        {post.url ? (
          <ChakraLink href={post.url} target="_blank">
            <Heading fontSize="xl">{post.title}</Heading>
          </ChakraLink>
        ) : (
          <Link to={routes.postDetail({ postId: post.id })}>
            <Heading fontSize="xl">{post.title}</Heading>
          </Link>
        )}
        {post.body && <Text color="gray.300">{post.body}</Text>}
        {post.url && <Text color="gray.400">{post.url}</Text>}
        <Spacer />
        <Stack direction="row" align="center">
          <Flex align="center">
            <FaCommentAlt size={13} />
            <Link to={routes.postDetail({ postId: post.id })}>
              <Text fontSize="sm" color="gray.400" ml={2}>
                {post._count.comments} comments
              </Text>
            </Link>
            <Text color="gray.500" fontWeight={50} px={1} pb={1}>
              |
            </Text>
            <Text fontSize="sm" color="gray.500">
              Posted by <b>{post.user.name}</b> at{' '}
              {post.createdAt.replace('T', ' ').split('.')[0]}
            </Text>
          </Flex>
          <Spacer />
        </Stack>
      </Stack>

      {!post.url ? (
        <Link to={routes.postDetail({ postId: post.id })}>
          <IconButton
            aria-label="Go to post detail"
            variant="ghost"
            icon={<FaChevronRight />}
          />
        </Link>
      ) : (
        <ChakraLink href={post.url} target="_blank">
          <IconButton
            aria-label="Go to post detail"
            variant="ghost"
            icon={<FaChevronRight />}
          />
        </ChakraLink>
      )}
    </Stack>
  )
}

export default PostItem
