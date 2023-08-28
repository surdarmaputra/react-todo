import './index.css'

import useGetTodoList from '../../hooks/useGetTodoList'
import TodoForm from '../TodoForm'
import TodoListItem from '../TodoListItem'

/**
 * TODO List
 */
export default function TodoList() {
  const { todoList, todoListError, todoListLoading, refetchTodoList } =
    useGetTodoList()
  const hasError = !todoListLoading && Boolean(todoListError)
  const hasItems = !todoListLoading && !hasError && todoList?.length

  return (
    <div className="todolist">
      <h1>TODO LIST</h1>
      <TodoForm onSuccess={() => refetchTodoList()} />
      {todoListLoading && 'Loading...'}
      {hasError && 'Error!'}
      {hasItems &&
        todoList.map((todo) => <TodoListItem todo={todo} key={todo.id} />)}
    </div>
  )
}
