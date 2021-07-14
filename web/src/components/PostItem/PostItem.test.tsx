import { render, screen } from '@redwoodjs/testing'

import PostItem from './PostItem'
import { standard } from './PostItem.mock'

describe('PostItem', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PostItem post={standard().post} />)
    }).not.toThrow()
  })
  it('renders the post content', () => {
    render(<PostItem post={standard().post} />)
    expect(screen.getByText('Test post')).toBeInTheDocument()
    expect(screen.getByText('Hey this is a test post!')).toBeInTheDocument()
  })
})
