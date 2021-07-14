import {
  Button,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  FormControl,
  Textarea,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { FaPlus, FaPlusSquare } from 'react-icons/fa'
import { CHILDREN_COMMENTS_FOR_PARENT } from '../Comment/Comment'
import { QUERY as ROOT_COMMENTS } from '../CommentListCell'

const CREATE_COMMENT = gql`
  mutation CreateCommentMutation($input: CreateCommentInput!) {
    createComment(input: $input) {
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

const CreateCommentModal = ({ parentId, postId, modalTitle }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { currentUser } = useAuth()

  const [createComment] = useMutation(CREATE_COMMENT, {
    refetchQueries: [
      {
        query: parentId ? CHILDREN_COMMENTS_FOR_PARENT : ROOT_COMMENTS,
        variables: parentId ? { parentId } : { postId },
      },
    ],
  })

  const handleOnSubmit = async ({ body }, { resetForm }) => {
    await createComment({ variables: { input: { parentId, postId, body } } })
    resetForm()
    onClose()
  }

  return (
    <>
      {parentId ? (
        <Button
          size="sm"
          variant="unstyled"
          isDisabled={!currentUser}
          onClick={onOpen}
        >
          Reply
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<FaPlus size={10} />}
          isDisabled={!currentUser}
          onClick={onOpen}
        >
          Add comment
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={{ body: '' }}
            validate={(values) => {
              const errors: Partial<{ body: string }> = {}
              if (values.body.trim().length === 0) {
                errors.body = 'Required'
              }
              return errors
            }}
            onSubmit={handleOnSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <ModalHeader>{modalTitle}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Field name="body">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.body && form.touched.body}
                      >
                        <Textarea
                          {...field}
                          id="body"
                          placeholder="Enter comment here..."
                          height="125"
                        />
                        <FormErrorMessage>{form.errors.body}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </ModalBody>
                <ModalFooter>
                  <Button
                    data-testid="create-comment-submit-button"
                    type="submit"
                    bg="blue.600"
                    isDisabled={isSubmitting}
                    isLoading={isSubmitting}
                  >
                    Submit
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

export default CreateCommentModal
