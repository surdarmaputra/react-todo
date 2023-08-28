import identity from 'lodash/identity'
import useSWRMutation from 'swr/mutation'

import generateBackendURL from '../utils/generateBackendURL'
import handleSWRDelete from '../utils/handleSWRDelete'

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
