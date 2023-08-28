import identity from 'lodash/identity'
import useSWRMutation from 'swr/mutation'

import generateBackendURL from '../utils/generateBackendURL'
import handleSWRCreate from '../utils/handleSWRCreate'

export default function useCreateTodo({ onSuccess = identity }) {
  const { trigger, isMutating } = useSWRMutation(
    generateBackendURL('/tasks'),
    handleSWRCreate,
    {
      onSuccess,
    },
  )

  return {
    createTodo: trigger,
    createTodoLoading: isMutating,
  }
}
