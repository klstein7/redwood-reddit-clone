import { Box, Button, Flex, Spacer, Stack, Text } from '@chakra-ui/react'
import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { useEffect } from 'react'
import { FaPlus, FaPlusSquare, FaRedditAlien } from 'react-icons/fa'
import CreatePostModal from '../CreatePostModal/CreatePostModal'

const UPSERT_USER = gql`
  mutation UpsertUserMutation($input: UpsertUserInput!) {
    upsertUser(input: $input) {
      id
    }
  }
`

const Navbar = () => {
  const { currentUser, logIn, logOut, isAuthenticated, reauthenticate } =
    useAuth()
  const [upsertUser] = useMutation(UPSERT_USER)

  console.log(isAuthenticated)

  useEffect(() => {
    const syncUser = async () => {
      if (currentUser) {
        await upsertUser({
          variables: {
            input: {
              id: currentUser.sub,
              name: currentUser.user_metadata.full_name,
              email: currentUser.email,
            },
          },
        })
      }
    }
    syncUser()
  }, [])

  const handleOnLoginButtonClicked = async () => {
    await logIn()
    console.log('test')
  }

  const handleOnLogoutButtonClicked = async () => {
    await logOut()
  }

  return (
    <Box w="100%" bg="gray.900" p={2} px={3}>
      <Stack direction="row" align="center">
        <Link to={routes.home()}>
          <Flex align="center">
            <FaRedditAlien size={22} />
            <Text fontSize="xl" fontWeight={600} pl={2}>
              redditish
            </Text>
          </Flex>
        </Link>
        <Spacer />
        <Flex>
          <CreatePostModal />
          {!currentUser ? (
            <Button
              variant="outline"
              rounded="3xl"
              px={6}
              ml={2}
              colorScheme="facebook"
              onClick={handleOnLoginButtonClicked}
            >
              Login
            </Button>
          ) : (
            <Button
              variant="outline"
              rounded="3xl"
              px={6}
              ml={2}
              colorScheme="facebook"
              onClick={handleOnLogoutButtonClicked}
            >
              Log out
            </Button>
          )}
        </Flex>
      </Stack>
    </Box>
  )
}

export default Navbar
