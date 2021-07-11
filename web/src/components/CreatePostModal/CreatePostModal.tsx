import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Text,
  Stack,
  Input,
  Box,
  Textarea,
  FormControl,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react'
import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { FaPlusSquare } from 'react-icons/fa'

const CREATE_POST = gql`
  mutation CreatePostMutation($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      url
      body
    }
  }
`

const CreatePostModal = () => {
  const { currentUser } = useAuth()
  const { onOpen, isOpen, onClose } = useDisclosure()
  const [createPost] = useMutation(CREATE_POST)
  const toast = useToast()

  const handleOnSubmit = async (values, { resetForm }) => {
    const { data } = await createPost({ variables: { input: values } })
    resetForm()
    onClose()
    toast({
      title: 'Post created!',
      description: 'Redirecting to your post now...',
      status: 'success',
      variant: 'subtle',
      duration: 5000,
      isClosable: true,
    })
    navigate(routes.postDetail({ postId: data.createPost.id }))
  }

  return (
    <>
      <Button
        data-testid={'create-post-button'}
        bg="blue.600"
        onClick={onOpen}
        isDisabled={!currentUser}
      >
        <Stack direction="row" align="center">
          <FaPlusSquare size={15} />
          <Text>Create Post</Text>
        </Stack>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={{ title: '', url: '', body: '' }}
            validate={(values) => {
              const errors: Partial<{ title: string }> = {}
              if (values.title.trim().length === 0) {
                errors.title = 'Required'
              }
              return errors
            }}
            onSubmit={handleOnSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <ModalHeader>Create Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Stack direction="column">
                    <Field name="title">
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.title}>
                          <Input
                            {...field}
                            id="name"
                            size="lg"
                            placeholder="Title"
                            variant="filled"
                          />
                          <FormErrorMessage>
                            {form.errors.title}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="url">
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.url}>
                          <Input
                            {...field}
                            id="url"
                            size="lg"
                            placeholder="URL"
                            variant="filled"
                          />
                          <FormErrorMessage>{form.errors.url}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="body">
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.body}>
                          <Textarea
                            {...field}
                            id="body"
                            size="lg"
                            placeholder="Enter post content here...(optional)"
                            height="150"
                          />
                          <FormErrorMessage>
                            {form.errors.body}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Stack>
                </ModalBody>

                <ModalFooter>
                  <Button
                    data-testid="create-post-submit-button"
                    type="submit"
                    isLoading={isSubmitting}
                    isDisabled={isSubmitting}
                    bg="blue.600"
                  >
                    Create
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreatePostModal
