import useSWR from 'swr'

import generateBackendURL from '../utils/generateBackendURL'
import handleSWRFetch from '../utils/handleSWRFetch'

export default function useGetTodoList() {
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    generateBackendURL('/tasks'),
    handleSWRFetch,
    {
      revalidateOnFocus: false,
    },
  )

  const refetchTodoList = () => mutate()

  return {
    todoList: data,
    todoListError: error,
    todoListLoading: isLoading || isValidating,
    refetchTodoList,
  }
}
