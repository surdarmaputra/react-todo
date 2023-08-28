import './index.css'

import identity from 'lodash/identity'
import PropTypes from 'prop-types'

import useDeleteTodo from '../../hooks/useDeleteTodo'
import Button from '../Button'
import ErrorPlaceholder from '../ErrorPlaceholder'

/**
 * Renders a single todo list item with delete functionality and error handling.
 *
 * @param {Object} props - The component props.
 * @param {function} [props.onDeleteSuccess=identity] - The callback function to be executed after successful deletion.
 * @param {Object} props.todo - The todo object containing ID and title.
 * @param {string} props.todo.id - The ID of the todo item.
 * @param {string} props.todo.title - The title of the todo item.
 * @returns {JSX.Element} - The JSX element representing the todo list item.
 */
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
