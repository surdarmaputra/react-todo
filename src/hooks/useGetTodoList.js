import useSWR from 'swr'

import generateBackendURL from '../utils/generateBackendURL'
import handleSWRFetch from '../utils/handleSWRFetch'

/**
 * A custom hook for fetching a todo list using the SWR pattern.
 *
 * @returns {useGetTodoListResult} - The result object containing todo list data and related status.
 *
 * @typedef {Object} useGetTodoListResult - The result object from the useGetTodoList hook.
 * @property {Todo} todoList - The fetched todo list data.
 * @property {Object} todoListError - The error object if the fetch encounters an error.
 * @property {boolean} todoListLoading - Determines whether the fetch operation is in progress.
 * @property {boolean} todoListRefetching - Determines whether the todo list is being refetched.
 * @property {function} refetchTodoList - The function to manually trigger a todo list re-fetch.
 *
 * @typedef {Object} Todo - Todo object.
 * @property {number} id - The unique ID of todo task.
 * @property {string} title - The title of todo task.
 */
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
    todoListLoading: isLoading,
    todoListRefetching: isValidating,
    refetchTodoList,
  }
}
