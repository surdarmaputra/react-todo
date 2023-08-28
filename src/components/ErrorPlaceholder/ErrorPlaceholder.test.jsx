import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import renderApp from '../../utils/test-utils/renderApp'
import ErrorPlaceholder from '.'

function setup(props) {
  return renderApp(<ErrorPlaceholder {...props} />)
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe('ErrorPlaceholder', () => {
  test('trigger retry', async () => {
    const handleRetry = jest.fn()
    setup({ onRetry: handleRetry })
    await screen.findByText(/Oops, something wrong! Please try again./)

    userEvent.click(screen.getByRole('button', { name: /Retry/ }))
    expect(handleRetry).toHaveBeenCalledTimes(1)
  })

  test('hide retry button', async () => {
    setup({
      isRetryButtonVisible: false,
    })
    await screen.findByText(/Oops, something wrong! Please try again./)
    expect(
      screen.queryByRole('button', { name: /Retry/ }),
    ).not.toBeInTheDocument()
  })
})
