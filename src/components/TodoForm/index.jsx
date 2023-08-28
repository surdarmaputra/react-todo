import { useState } from 'react'

import identity from 'lodash/identity'
import PropTypes from 'prop-types'

import useCreateTodo from '../../hooks/useCreateTodo'
import Button from '../Button'
import Input from '../Input'

export default function TodoForm({ onSuccess = identity }) {
  const { createTodo } = useCreateTodo({ onSuccess })
  const [title, setTitle] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createTodo({
      title,
    })
  }

  return (
    <form>
      <Input
        value={title}
        onChange={(event) => setTitle(event?.target?.value)}
      />
      <Button type="submit" onClick={handleSubmit}>
        Add
      </Button>
    </form>
  )
}

TodoForm.propTypes = {
  onSuccess: PropTypes.func,
}
