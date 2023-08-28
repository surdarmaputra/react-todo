import identity from 'lodash/identity'
import useSWRMutation from 'swr/mutation'

import generateBackendURL from '../utils/generateBackendURL'
import handleSWRCreate from '../utils/handleSWRCreate'

/**
 * A custom hook for creating a new todo using the SWR pattern.
 *
 * @param {Object} options - The options for the create todo operation.
 * @param {function} [options.onSuccess=identity] - The callback function to be executed after successful creation.
 * @returns {useCreateTodoResult} - The result object containing create todo functions and status.
 *
 * @typedef {Object} useCreateTodoResult - The result object from the useCreateTodo hook.
 * @property {function} createTodo - The function to create a new todo.
 * @property {boolean} createTodoLoading - Determines whether the create operation is in progress.
 * @property {Object} createTodoError - The error object if the create operation encounters an error.
 *
 * @example
 * const { createTodo, createTodoLoading, createTodoError } = useCreateTodo({
 *   onSuccess: () => handleCreateSuccess(),
 * });
 * // ...
 * const handleCreateTodo = () => {
 *   createTodo({ title: 'New Task' });
 * };
 */
export default function useCreateTodo({ onSuccess = identity }) {
  const { trigger, isMutating, error } = useSWRMutation(
    generateBackendURL('/tasks'),
    handleSWRCreate,
    {
      onSuccess,
      throwOnError: false,
    },
  )

  return {
    createTodo: trigger,
    createTodoLoading: isMutating,
    createTodoError: error,
  }
}
