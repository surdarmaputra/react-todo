import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Button from '.'

function setup(props) {
  render(<Button {...props}>Submit</Button>)
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe('Button', () => {
  test('render children', async () => {
    setup()
    await screen.findByRole('button', { name: /Submit/ })
  })

  test('trigger onClick render', async () => {
    const handleClick = jest.fn()
    setup({
      onClick: handleClick,
    })

    userEvent.click(await screen.findByRole('button', { name: /Submit/ }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('loading state with default loading placeholder', async () => {
    setup({
      isLoading: true,
    })
    await screen.findByText('Loading...')
  })

  test('loading state with custom loading placeholder', async () => {
    setup({
      isLoading: true,
      loadingPlaceholder: 'Submitting...',
    })
    await screen.findByText('Submitting...')
  })

  test('disable click when loading', async () => {
    const handleClick = jest.fn()
    setup({
      isLoading: true,
      onClick: handleClick,
    })

    userEvent.click(await screen.findByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })
})
