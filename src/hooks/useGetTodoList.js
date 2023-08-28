import useSWR from 'swr'

import generateBackendURL from '../utils/generateBackendURL'
import handleSWRFetch from '../utils/handleSWRFetch'

export default function useGetTodoList() {
  const { data, error, isLoading, mutate } = useSWR(
    generateBackendURL('/tasks'),
    handleSWRFetch,
  )

  return {
    todoList: data,
    todoListError: error,
    todoListLoading: isLoading,
    refetchTodoList: mutate,
  }
}
