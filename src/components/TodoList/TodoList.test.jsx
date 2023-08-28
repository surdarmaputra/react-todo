import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'

import tasksResponse from '../../__mocks__/tasksResponse'
import server from '../../__msw__/server'
import renderApp from '../../utils/test-utils/renderApp'
import TodoList from '.'

function setup() {
  return renderApp(<TodoList />)
}

describe('TodoList', () => {
  test('show list of todo', async () => {
    setup()
    await screen.findByText(/Loading.../)

    const todos = await screen.findAllByTestId('todo-list-item')
    expect(todos.length).toBe(tasksResponse.length)
    within(todos[0]).getByText(tasksResponse[0].title)
    within(todos[1]).getByText(tasksResponse[1].title)
    within(todos[2]).getByText(tasksResponse[2].title)
  })

  test('handle retry if show list of todo has error', async () => {
    // simulate backend error
    server.use(
      rest.get('http://localhost:3001/tasks', (req, res, ctx) => {
        return res.once(ctx.status(500), ctx.json({}))
      }),
    )
    setup()

    // show error result for initial request
    await screen.findByText(/Loading.../)
    await screen.findByText(/Oops, something wrong!/)

    // retry
    userEvent.click(screen.getByRole('button', { name: /Retry/ }))
    await screen.findByText(/Loading.../)

    // show success result after retry
    const todos = await screen.findAllByTestId('todo-list-item')
    expect(todos.length).toBe(tasksResponse.length)
    within(todos[0]).getByText(tasksResponse[0].title)
    within(todos[1]).getByText(tasksResponse[1].title)
    within(todos[2]).getByText(tasksResponse[2].title)
  })

  test('create todo', async () => {
    setup()

    await screen.findAllByTestId('todo-list-item')
    const input = await screen.findByPlaceholderText(/Type any task/)
    const addButton = await screen.findByRole('button', { name: /Add/ })

    userEvent.type(input, 'any task')
    userEvent.click(addButton)

    // show loading
    await screen.findByRole('button', { name: /Submitting.../ })

    // finish loading
    await screen.findByRole('button', { name: /Add/ })
  })

  test('validate input before creating todo', async () => {
    setup()

    await screen.findAllByTestId('todo-list-item')
    const input = await screen.findByPlaceholderText(/Type any task/)
    const addButton = await screen.findByRole('button', { name: /Add/ })

    // show input validation
    userEvent.click(addButton)
    await screen.findByText(/Please input task title/)

    // fix input
    userEvent.type(input, 'any task')
    await waitFor(() =>
      expect(
        screen.queryByText(/Please input task title/),
      ).not.toBeInTheDocument(),
    )

    userEvent.click(addButton)

    // show loading
    await screen.findByRole('button', { name: /Submitting.../ })

    // finish loading
    await screen.findByRole('button', { name: /Add/ })
  })

  test('handle retry when create todo has error', async () => {
    // simulate backend error
    const errorResponseSample = {
      message: 'any error message',
    }
    server.use(
      rest.post('http://localhost:3001/tasks', (req, res, ctx) => {
        return res.once(ctx.status(500), ctx.json(errorResponseSample))
      }),
    )
    setup()

    await screen.findAllByTestId('todo-list-item')
    const input = await screen.findByPlaceholderText(/Type any task/)
    const addButton = await screen.findByRole('button', { name: /Add/ })

    // got error result after loading finished
    const expectedErrorPlaceholder = /Oops, something wrong! Please try again./
    userEvent.type(input, 'any task')
    userEvent.click(addButton)
    await screen.findByRole('button', { name: /Submitting.../ })
    await screen.findByRole('button', { name: /Add/ })
    await screen.findByText(expectedErrorPlaceholder)

    // success after retrying
    userEvent.click(addButton)
    await screen.findByRole('button', { name: /Submitting.../ })
    await screen.findByRole('button', { name: /Add/ })
    expect(screen.queryByText(expectedErrorPlaceholder)).not.toBeInTheDocument()
  })

  test('delete todo', async () => {
    setup()
    const todos = await screen.findAllByTestId('todo-list-item')
    const deletedTodo = within(todos[0])
    const deleteButton = deletedTodo.getByRole('button', { name: /Delete/ })

    userEvent.click(deleteButton)

    await screen.findByRole('button', { name: /Deleting.../ })
    await waitFor(() =>
      expect(
        screen.queryByRole('button', { name: /Deleting.../ }),
      ).not.toBeInTheDocument(),
    )
  })
})
