import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import tasksResponse from '../../../__mocks__/tasksResponse'
import TodoList from '..'

const realConsoleError = console.error

function setup() {
  return render(<TodoList />)
}

beforeAll(() => {
  // Ignore expected networl error during request
  console.error = jest.fn()
})

afterAll(() => {
  console.error = realConsoleError
})

describe('TodoList', () => {
  test('show list of todo', async () => {
    setup()
    const todos = await screen.findAllByTestId('todo-list-item')
    expect(todos.length).toBe(tasksResponse.length)
    expect(await within(todos[0]).getByText(tasksResponse[0].title))
    expect(await within(todos[1]).getByText(tasksResponse[1].title))
    expect(await within(todos[2]).getByText(tasksResponse[2].title))
  })

  test.skip('show loading when submitting new task', async () => {
    setup()

    const input = await screen.findByPlaceholderText(/Type any task/)
    const addButton = await screen.findByRole('button', { name: /Add/ })
    userEvent.type(input, 'new task')
    userEvent.click(addButton)
    await screen.findByRole('button', { name: 'Submitting...' })
  })
})
