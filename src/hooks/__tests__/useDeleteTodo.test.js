import { waitFor } from '@testing-library/react'
import { act } from '@testing-library/react-hooks'
import { rest } from 'msw'

import server from '../../__msw__/server'
import renderAppHook from '../../utils/test-utils/rendeApprHook'
import useDeleteTodo from '../useDeleteTodo'

beforeEach(() => {
  jest.clearAllMocks()
})

describe('useDeleteTodo', () => {
  test('trigger deleteTodo function', async () => {
    const handleSuccess = jest.fn()
    const { result } = renderAppHook(() =>
      useDeleteTodo({ onSuccess: handleSuccess }),
    )

    expect(result.current).toMatchObject({
      deleteTodoLoading: false,
      deleteTodo: expect.any(Function),
    })

    act(() => {
      result.current.deleteTodo(1)
    })

    await waitFor(() => expect(result.current.deleteTodoLoading).toBe(true))
    await waitFor(() => expect(result.current.deleteTodoLoading).toBe(false))
    expect(handleSuccess).toBeCalledTimes(1)
  })

  test('return error after triggering deleteTodo function', async () => {
    // simulate backend error
    const errorResponseSample = {
      message: 'any error message',
    }
    server.use(
      rest.delete('http://localhost:3001/tasks/1', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json(errorResponseSample))
      }),
    )

    // return no error in initial render
    const handleSuccess = jest.fn()
    const { result } = renderAppHook(() =>
      useDeleteTodo({ onSuccess: handleSuccess }),
    )
    expect(result.current.deleteTodoError).toBe(undefined)

    act(() => {
      result.current.deleteTodo(1)
    })

    // return error after loading finished
    await waitFor(() => expect(result.current.deleteTodoLoading).toBe(true))
    await waitFor(() => expect(result.current.deleteTodoLoading).toBe(false))
    expect(result.current.deleteTodoError).toMatchObject({
      response: errorResponseSample,
      status: 500,
    })
  })
})
