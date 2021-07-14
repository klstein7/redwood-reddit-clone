import { Stack, IconButton, Text } from '@chakra-ui/react'
import { useAuth } from '@redwoodjs/auth'
import { useMutation, useQuery } from '@redwoodjs/web'
import { useState } from 'react'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'

const DID_USER_LIKE_POST = gql`
  query DidUserLikePostQuery($postId: String!) {
    didUserLikePost(postId: $postId) {
      id
    }
  }
`
const DID_USER_DISLIKE_POST = gql`
  query DidUserDislikePostQuery($postId: String!) {
    didUserDislikePost(postId: $postId) {
      id
    }
  }
`

const DELETE_LIKE = gql`
  mutation DeleteLikeMutation($id: String!) {
    deleteLike(id: $id) {
      id
    }
  }
`

const CREATE_LIKE = gql`
  mutation CreateLikeMutation($input: CreateLikeInput!) {
    createLike(input: $input) {
      id
    }
  }
`

const DELETE_DISLIKE = gql`
  mutation DeleteDislikeMutation($id: String!) {
    deleteDislike(id: $id) {
      id
    }
  }
`

const CREATE_DISLIKE = gql`
  mutation CreateDislikeMutation($input: CreateDislikeInput!) {
    createDislike(input: $input) {
      id
    }
  }
`

const LikeDislikePost = ({ postId, voteCount }) => {
  const [likeCount, setLikeCount] = useState(voteCount.likes)
  const [dislikeCount, setDislikeCount] = useState(voteCount.dislikes)
  const [loading, setLoading] = useState(false)
  const { currentUser } = useAuth()

  const { data: userLike } = useQuery(DID_USER_LIKE_POST, {
    variables: { postId },
  })
  const { data: userDislike } = useQuery(DID_USER_DISLIKE_POST, {
    variables: { postId },
  })

  const [deleteLike] = useMutation(DELETE_LIKE, {
    refetchQueries: [{ query: DID_USER_LIKE_POST, variables: { postId } }],
  })
  const [createLike] = useMutation(CREATE_LIKE, {
    refetchQueries: [{ query: DID_USER_LIKE_POST, variables: { postId } }],
  })

  const [deleteDislike] = useMutation(DELETE_DISLIKE, {
    refetchQueries: [{ query: DID_USER_DISLIKE_POST, variables: { postId } }],
  })

  const [createDislike] = useMutation(CREATE_DISLIKE, {
    refetchQueries: [{ query: DID_USER_DISLIKE_POST, variables: { postId } }],
  })

  const handleOnLikeButtonClicked = async () => {
    setLoading(true)
    if (userDislike?.didUserDislikePost) {
      await deleteDislike({
        variables: { id: userDislike.didUserDislikePost.id },
      })
      await createLike({ variables: { input: { postId } } })
      setDislikeCount(dislikeCount - 1)
      setLikeCount(likeCount + 1)
    } else if (userLike?.didUserLikePost) {
      await deleteLike({ variables: { id: userLike.didUserLikePost.id } })
      setLikeCount(likeCount - 1)
    } else {
      await createLike({ variables: { input: { postId } } })
      setLikeCount(likeCount + 1)
    }
    setLoading(false)
  }

  const handleOnDislikeButtonClicked = async () => {
    setLoading(true)
    if (userLike?.didUserLikePost) {
      await deleteLike({
        variables: { id: userLike.didUserLikePost.id },
      })
      await createDislike({ variables: { input: { postId } } })
      setLikeCount(likeCount - 1)
      setDislikeCount(dislikeCount + 1)
    } else if (userDislike?.didUserDislikePost) {
      await deleteDislike({
        variables: { id: userDislike.didUserDislikePost.id },
      })
      setDislikeCount(dislikeCount - 1)
    } else {
      await createDislike({ variables: { input: { postId } } })
      setDislikeCount(dislikeCount + 1)
    }
    setLoading(false)
  }

  return (
    <Stack maxW="10%" direction="column" align="center" justify="center">
      <IconButton
        data-testid="test-like-button"
        aria-label="Like post"
        color={userLike?.didUserLikePost ? 'red.300' : null}
        size="xs"
        variant="ghost"
        icon={<FaChevronUp />}
        isDisabled={loading || !currentUser}
        onClick={handleOnLikeButtonClicked}
      />
      <Text fontSize="sm" color="gray.300">
        {likeCount - dislikeCount}
      </Text>
      <IconButton
        data-testid="test-dislike-button"
        aria-label="Dislike post"
        color={userDislike?.didUserDislikePost ? 'blue.300' : null}
        size="xs"
        variant="ghost"
        icon={<FaChevronDown />}
        isDisabled={loading || !currentUser}
        onClick={handleOnDislikeButtonClicked}
      />
    </Stack>
  )
}

export default LikeDislikePost
