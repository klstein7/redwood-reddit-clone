import { render } from '@redwoodjs/testing'

import PostDetailPage from './PostDetailPage'

describe('PostDetailPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PostDetailPage />)
    }).not.toThrow()
  })
})
