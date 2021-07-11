import { render, screen, fireEvent, waitFor, act } from '@redwoodjs/testing'

import Navbar from './Navbar'

describe('Navbar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Navbar />)
    }).not.toThrow()
  })
  it('renders navbar components successfully', () => {
    render(<Navbar />)
    expect(screen.getByText('redditish')).toBeInTheDocument()
    expect(screen.getByText('Create Post')).toBeInTheDocument()
    expect(screen.getByText('Login')).toBeInTheDocument()
  })
  it('create post button is disabled when unauthenticated', () => {
    render(<Navbar />)
    expect(screen.getByTestId('create-post-button')).toBeDisabled()
  })
  it('create post is enabled when authenticated', async () => {
    mockCurrentUser({
      sub: '1',
      user_metadata: { full_name: 'Test' },
      email: 'test@test.com',
    })
    mockGraphQLMutation('UpsertUserMutation', () => ({
      upsertUser: { id: '1' },
    }))
    render(<Navbar />)
    await waitFor(() => {
      expect(screen.getByTestId('create-post-button')).toBeEnabled()
    })
  })
})
