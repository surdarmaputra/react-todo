import identity from 'lodash/identity'
import useSWRMutation from 'swr/mutation'

import generateBackendURL from '../utils/generateBackendURL'
import handleSWRDelete from '../utils/handleSWRDelete'

/**
 * A custom hook for deleting a todo using the SWR pattern.
 *
 * @param {Object} options - The options for the delete todo operation.
 * @param {function} [options.onSuccess=identity] - The callback function to be executed after successful deletion.
 * @returns {useDeleteTodoResult} - The result object containing delete todo functions and status.
 *
 * @typedef {Object} useDeleteTodoResult - The result object from the useDeleteTodo hook.
 * @property {function} deleteTodo - The function to delete a todo.
 * @property {boolean} deleteTodoLoading - Determines whether the delete operation is in progress.
 * @property {Object} deleteTodoError - The error object if the delete operation encounters an error.
 *
 * @example
 * const { deleteTodo, deleteTodoLoading, deleteTodoError } = useDeleteTodo({
 *   onSuccess: () => handleDeleteSuccess(),
 * });
 * // ...
 * const handleDeleteTodo = (id) => {
 *   deleteTodo(id);
 * };
 */
export default function useDeleteTodo({ onSuccess = identity }) {
  const { trigger, isMutating, error } = useSWRMutation(
    generateBackendURL('/tasks'),
    handleSWRDelete,
    {
      onSuccess,
      throwOnError: false,
    },
  )

  const deleteTodo = (id) => trigger({ id })

  return {
    deleteTodo,
    deleteTodoLoading: isMutating,
    deleteTodoError: error,
  }
}
