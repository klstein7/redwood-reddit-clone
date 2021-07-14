import { render, screen, waitFor, fireEvent } from '@redwoodjs/testing'

import LikeDislikePost from './LikeDislikePost'
import { standard } from './LikeDislikePost.mock'

describe('LikeDislikePost', () => {
  it('renders successfully', () => {
    mockGraphQLQuery('DidUserLikePostQuery', () => null)
    mockGraphQLQuery('DidUserDislikePostQuery', () => null)
    expect(() => {
      render(
        <LikeDislikePost
          postId={standard().postId}
          voteCount={standard().voteCount}
        />
      )
    }).not.toThrow()
  })
  it('disables like and dislike buttons when unauthenticated', () => {
    mockGraphQLQuery('DidUserLikePostQuery', () => null)
    mockGraphQLQuery('DidUserDislikePostQuery', () => null)
    render(
      <LikeDislikePost
        postId={standard().postId}
        voteCount={standard().voteCount}
      />
    )
    expect(screen.getByTestId('test-like-button')).toBeDisabled()
    expect(screen.getByTestId('test-dislike-button')).toBeDisabled()
  })
  it('enables like and dislike buttons when authenticated', async () => {
    mockCurrentUser({ sub: '123' })
    mockGraphQLQuery('DidUserLikePostQuery', () => null)
    mockGraphQLQuery('DidUserDislikePostQuery', () => null)
    render(
      <LikeDislikePost
        postId={standard().postId}
        voteCount={standard().voteCount}
      />
    )
    await waitFor(() => {
      expect(screen.getByTestId('test-like-button')).toBeEnabled()
      expect(screen.getByTestId('test-dislike-button')).toBeEnabled()
    })
  })
  it('increments like count when like button clicked', async () => {
    mockCurrentUser({ sub: '123' })
    mockGraphQLQuery('DidUserLikePostQuery', () => null)
    mockGraphQLQuery('DidUserDislikePostQuery', () => null)
    mockGraphQLMutation('CreateLikeMutation', () => ({
      id: '1',
    }))
    render(
      <LikeDislikePost
        postId={standard().postId}
        voteCount={standard().voteCount}
      />
    )
    await waitFor(() => {
      expect(screen.getByTestId('test-like-button')).toBeEnabled()
      expect(screen.getByTestId('test-dislike-button')).toBeEnabled()
    })
    await fireEvent.click(screen.getByTestId('test-like-button'))
    await waitFor(() => {
      expect(screen.getByText('4')).toBeInTheDocument()
    })
  })
  it('decrements like count when like button is clicked and user already liked', async () => {
    mockCurrentUser({ sub: '123' })
    mockGraphQLQuery('DidUserLikePostQuery', () => ({
      didUserLikePost: { id: '1' },
    }))
    mockGraphQLQuery('DidUserDislikePostQuery', () => null)
    mockGraphQLMutation('DeleteLikeMutation', () => ({
      id: '1',
    }))
    render(
      <LikeDislikePost
        postId={standard().postId}
        voteCount={standard().voteCount}
      />
    )
    await waitFor(() => {
      expect(screen.getByTestId('test-like-button')).toBeEnabled()
      expect(screen.getByTestId('test-dislike-button')).toBeEnabled()
    })
    await fireEvent.click(screen.getByTestId('test-like-button'))
    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument()
    })
  })
  it('decrements like count and increases dislike count when like button is clicked and user already liked', async () => {
    mockCurrentUser({ sub: '123' })
    mockGraphQLQuery('DidUserLikePostQuery', () => ({
      didUserLikePost: { id: '1' },
    }))
    mockGraphQLQuery('DidUserDislikePostQuery', () => null)
    mockGraphQLMutation('DeleteLikeMutation', () => ({
      id: '1',
    }))
    mockGraphQLMutation('CreateDislikeMutation', () => ({
      createDislike: {
        id: '1',
      },
    }))
    render(
      <LikeDislikePost
        postId={standard().postId}
        voteCount={standard().voteCount}
      />
    )
    await waitFor(() => {
      expect(screen.getByTestId('test-like-button')).toBeEnabled()
      expect(screen.getByTestId('test-dislike-button')).toBeEnabled()
    })
    await fireEvent.click(screen.getByTestId('test-dislike-button'))
    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument()
    })
  })
})
