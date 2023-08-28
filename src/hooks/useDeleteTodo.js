import identity from 'lodash/identity'
import useSWRMutation from 'swr/mutation'

import generateBackendURL from '../utils/generateBackendURL'
import handleSWRDelete from '../utils/handleSWRDelete'

export default function useDeleteTodo({ onSuccess = identity }) {
  const { trigger, isMutating } = useSWRMutation(
    generateBackendURL('/tasks'),
    handleSWRDelete,
    {
      onSuccess,
    },
  )

  const deleteTodo = (id) => trigger({ id })

  return {
    deleteTodo,
    deleteTodoLoading: isMutating,
  }
}
