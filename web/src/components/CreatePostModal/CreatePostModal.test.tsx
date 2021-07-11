import { render, screen, waitFor, fireEvent } from '@redwoodjs/testing'

import CreatePostModal from './CreatePostModal'

describe('CreatePostModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreatePostModal />)
    }).not.toThrow()
  })
  it('disables modal trigger button when unauthenticated', () => {
    render(<CreatePostModal />)
    expect(screen.getByTestId('create-post-button')).toBeDisabled()
  })
  it('enables modal trigger button when authenticated', async () => {
    mockCurrentUser({ sub: '1' })
    render(<CreatePostModal />)
    await waitFor(() => {
      expect(screen.getByTestId('create-post-button')).toBeEnabled()
    })
  })
  it('shows error on submit when title is blank', async () => {
    mockCurrentUser({ sub: '1' })
    render(<CreatePostModal />)
    await waitFor(() => {
      expect(screen.getByTestId('create-post-button')).toBeEnabled()
    })
    fireEvent.click(screen.getByTestId('create-post-button'))
    fireEvent.click(screen.getByTestId('create-post-submit-button'))
    await waitFor(() => {
      expect(screen.getByText('Required')).toBeInTheDocument()
    })
  })
  it('shows success message on successful submit', async () => {
    mockCurrentUser({ sub: '1' })
    mockGraphQLMutation('CreatePostMutation', () => ({
      createPost: {
        id: '1',
        title: 'Test post',
        url: '',
        body: '',
      },
    }))
    render(<CreatePostModal />)
    await waitFor(() => {
      expect(screen.getByTestId('create-post-button')).toBeEnabled()
    })
    fireEvent.click(screen.getByTestId('create-post-button'))
    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'Test post' },
    })
    fireEvent.click(screen.getByTestId('create-post-submit-button'))
    await waitFor(() => {
      expect(screen.getByText('Post created!')).toBeInTheDocument()
    })
  })
})
