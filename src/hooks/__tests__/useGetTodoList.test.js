import { waitFor } from '@testing-library/react'
import { act } from '@testing-library/react-hooks'
import { rest } from 'msw'

import tasksResponse from '../../__mocks__/tasksResponse'
import server from '../../__msw__/server'
import renderAppHook from '../../utils/test-utils/rendeApprHook'
import useGetTodoList from '../useGetTodoList'

describe('useGetTodoList', () => {
  test('return todo list data', async () => {
    const { result } = renderAppHook(() => useGetTodoList())
    expect(result.current).toMatchObject({
      todoList: undefined,
      todoListError: undefined,
      todoListLoading: true,
      refetchTodoList: expect.any(Function),
    })

    await waitFor(() => expect(result.current.todoListLoading).toBe(false))
    expect(result.current).toMatchObject({
      todoList: tasksResponse,
      todoListError: undefined,
      todoListLoading: false,
      refetchTodoList: expect.any(Function),
    })
  })

  test('return error', async () => {
    const errorResponseSample = {
      message: 'any error message',
    }
    server.use(
      rest.get('http://localhost:3001/tasks', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json(errorResponseSample))
      }),
    )

    const { result } = renderAppHook(() => useGetTodoList())
    expect(result.current.todoListError).toBe(undefined)

    await waitFor(() => expect(result.current.todoListLoading).toBe(false))
    expect(result.current.todoListError).toMatchObject({
      response: errorResponseSample,
      status: 500,
    })
  })

  test('trigger refetch', async () => {
    const { result } = renderAppHook(() => useGetTodoList())
    expect(result.current).toMatchObject({
      todoList: undefined,
      todoListError: undefined,
      todoListLoading: true,
      refetchTodoList: expect.any(Function),
    })

    await waitFor(() => expect(result.current.todoListLoading).toBe(false))
    act(() => {
      result.current.refetchTodoList()
    })

    await waitFor(() => expect(result.current.todoListLoading).toBe(true))
    await waitFor(() => expect(result.current.todoListLoading).toBe(false))
    expect(result.current.todoList).toEqual(tasksResponse)
  })
})
