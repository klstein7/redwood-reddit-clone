import { render } from '@redwoodjs/testing'

import CreateCommentModal from './CreateCommentModal'

describe('CreateCommentModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreateCommentModal />)
    }).not.toThrow()
  })
})
