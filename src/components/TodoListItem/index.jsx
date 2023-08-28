import './index.css'

import identity from 'lodash/identity'
import PropTypes from 'prop-types'

import useDeleteTodo from '../../hooks/useDeleteTodo'
import Button from '../Button'
import ErrorPlaceholder from '../ErrorPlaceholder'
export default function TodoListItem({ onDeleteSuccess = identity, todo }) {
  const { id, title } = todo
  const { deleteTodo, deleteTodoLoading, deleteTodoError } = useDeleteTodo({
    onSuccess: onDeleteSuccess,
  })

  const hasError = !deleteTodoLoading && Boolean(deleteTodoError)

  const handleDelete = () => {
    deleteTodo(id)
  }

  return (
    <li className="todo-list-item" data-testid="todo-list-item">
      <div className="todo-list-item__card">
        <div className="todo-list-item__title">{title}</div>
        <Button
          onClick={handleDelete}
          disabled={deleteTodoLoading}
          variant="secondary"
          isLoading={deleteTodoLoading}
          loadingPlaceholder="Deleting..."
        >
          Delete
        </Button>
      </div>
      {hasError && <ErrorPlaceholder isRetryButtonVisible={false} />}
    </li>
  )
}

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
  }),
  onDeleteSuccess: PropTypes.func,
}
