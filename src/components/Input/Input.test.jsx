import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Input from '.'

function setup(props) {
  return render(<Input {...props} />)
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe('Input', () => {
  test('set value', async () => {
    setup({
      value: 'anyvalue',
    })
    await screen.findByDisplayValue('anyvalue')
  })

  test('handle value change', async () => {
    const handleChange = jest.fn()
    expect(handleChange).not.toHaveBeenCalled()
    setup({
      value: 'anyvalue',
      onChange: handleChange,
    })

    const input = await screen.findByDisplayValue('anyvalue')
    userEvent.type(input, 'newvalue')
    expect(handleChange).toHaveBeenCalled()
  })
})
