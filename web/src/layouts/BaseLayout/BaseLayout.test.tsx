import { render } from '@redwoodjs/testing'

import BaseLayout from './BaseLayout'

describe('BaseLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BaseLayout />)
    }).not.toThrow()
  })
})
