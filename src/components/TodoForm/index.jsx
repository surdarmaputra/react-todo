import './index.css'

import { useForm } from 'react-hook-form'

import identity from 'lodash/identity'
import PropTypes from 'prop-types'

import useCreateTodo from '../../hooks/useCreateTodo'
import Button from '../Button'
import ErrorPlaceholder from '../ErrorPlaceholder'

/**
 * Renders a form to create new todo.
 *
 * @param {Object} props - The component props.
 * @param {function} [props.onSuccess] - The callback function to be executed when successfully submit todo to backend.
 * @returns {JSX.Element} - The JSX element representing the form.
 */
export default function TodoForm({ onSuccess = identity }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const handleSuccess = () => {
    reset()
    onSuccess()
  }

  const { createTodo, createTodoLoading, createTodoError } = useCreateTodo({
    onSuccess: handleSuccess,
  })

  const hasError = !createTodoLoading && Boolean(createTodoError)

  const submit = (formData) => {
    createTodo({
      title: formData?.title,
    })
  }

  return (
    <>
      <form className="todo-form" onSubmit={handleSubmit(submit)}>
        <input
          type="text"
          className="todo-form__input"
          placeholder="Type any task"
          {...register('title', { required: true })}
        />
        <Button
          type="submit"
          onClick={handleSubmit}
          className="todo-form__action"
          loadingPlaceholder="Submitting..."
          isLoading={createTodoLoading}
        >
          Add
        </Button>
      </form>
      {errors?.title && (
        <div className="todo-form__input-error">Please input task title</div>
      )}
      {hasError && <ErrorPlaceholder isRetryButtonVisible={false} />}
    </>
  )
}

TodoForm.propTypes = {
  onSuccess: PropTypes.func,
}
