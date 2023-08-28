import { waitFor } from '@testing-library/react'
import { act } from '@testing-library/react-hooks'
import { rest } from 'msw'

import server from '../../__msw__/server'
import renderAppHook from '../../utils/test-utils/rendeApprHook'
import useCreateTodo from '../useCreateTodo'

beforeEach(() => {
  jest.clearAllMocks()
})

describe('useCreateTodo', () => {
  test('trigger createTodo function', async () => {
    const handleSuccess = jest.fn()
    const { result } = renderAppHook(() =>
      useCreateTodo({ onSuccess: handleSuccess }),
    )

    expect(result.current).toMatchObject({
      createTodoError: undefined,
      createTodoLoading: false,
      createTodo: expect.any(Function),
    })

    act(() => {
      result.current.createTodo({
        title: 'any string',
      })
    })

    await waitFor(() => expect(result.current.createTodoLoading).toBe(true))
    await waitFor(() => expect(result.current.createTodoLoading).toBe(false))
    expect(handleSuccess).toBeCalledTimes(1)
  })

  test('return error after triggering createTodo function', async () => {
    // simulate backend error
    const errorResponseSample = {
      message: 'any error message',
    }
    server.use(
      rest.post('http://localhost:3001/tasks', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json(errorResponseSample))
      }),
    )

    // return no error in initial render
    const handleSuccess = jest.fn()
    const { result } = renderAppHook(() =>
      useCreateTodo({ onSuccess: handleSuccess }),
    )
    expect(result.current.createTodoError).toBe(undefined)

    act(() => {
      result.current.createTodo({
        title: 'any string',
      })
    })

    // return error after loading finished
    await waitFor(() => expect(result.current.createTodoLoading).toBe(true))
    await waitFor(() => expect(result.current.createTodoLoading).toBe(false))
    expect(result.current.createTodoError).toMatchObject({
      response: errorResponseSample,
      status: 500,
    })
  })
})
