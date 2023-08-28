import './index.css'

import identity from 'lodash/identity'
import PropTypes from 'prop-types'

import useDeleteTodo from '../../hooks/useDeleteTodo'
import Button from '../Button'
export default function TodoListItem({ onDeleteSuccess = identity, todo }) {
  const { id, title } = todo
  const { deleteTodo, deleteTodoLoading } = useDeleteTodo({
    onSuccess: onDeleteSuccess,
  })

  const handleDelete = () => {
    deleteTodo(id)
  }

  return (
    <div className="todo-list-item" data-testid="todo-list-item">
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
  )
}

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
  }),
  onDeleteSuccess: PropTypes.func,
}
