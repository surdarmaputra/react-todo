import './index.css'

import useGetTodoList from '../../hooks/useGetTodoList'
import ErrorPlaceholder from '../ErrorPlaceholder'
import TodoForm from '../TodoForm'
import TodoListItem from '../TodoListItem'

/**
 * Renders all functionalities of a todo list.
 *
 * @returns {JSX.Element} - The JSX element representing the todo list.
 */
export default function TodoList() {
  const {
    todoList,
    todoListError,
    todoListLoading,
    todoListRefetching,
    refetchTodoList,
  } = useGetTodoList()

  const hasError = !todoListLoading && Boolean(todoListError)
  const hasItems = !todoListLoading && !hasError && todoList?.length

  return (
    <div className="todolist">
      <h1>TODO LIST</h1>
      <TodoForm onSuccess={refetchTodoList} />
      {todoListLoading && 'Loading...'}
      {hasError && <ErrorPlaceholder onRetry={refetchTodoList} />}
      {hasItems && (
        <ul className="todolist__items">
          {todoList.map((todo) => (
            <TodoListItem todo={todo} key={todo.id} />
          ))}
          {todoListRefetching && <li>Loading...</li>}
        </ul>
      )}
    </div>
  )
}
