import './index.css'

import { useState } from 'react'

import identity from 'lodash/identity'
import PropTypes from 'prop-types'

import useCreateTodo from '../../hooks/useCreateTodo'
import Button from '../Button'
import ErrorPlaceholder from '../ErrorPlaceholder'
import Input from '../Input'

export default function TodoForm({ onSuccess = identity }) {
  const { createTodo, createTodoLoading, createTodoError } = useCreateTodo({
    onSuccess,
  })
  const [title, setTitle] = useState('')

  const hasError = !createTodoLoading && Boolean(createTodoError)

  const handleSubmit = (event) => {
    event.preventDefault()
    createTodo({
      title,
    })
  }

  return (
    <>
      <form className="todo-form">
        <Input
          className="todo-form__input"
          value={title}
          onChange={(event) => setTitle(event?.target?.value)}
          placeholder="Type any task"
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
      {hasError && <ErrorPlaceholder isRetryButtonVisible={false} />}
    </>
  )
}

TodoForm.propTypes = {
  onSuccess: PropTypes.func,
}
