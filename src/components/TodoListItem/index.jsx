import identity from 'lodash/identity'
import PropTypes from 'prop-types'

import Button from '../Button'

export default function TodoListItem({ onDelete = identity, title }) {
  return (
    <div>
      <div>{title}</div>
      <Button onClick={onDelete}>Delete</Button>
    </div>
  )
}

TodoListItem.propTypes = {
  onDelete: PropTypes.func,
  title: PropTypes.string.isRequired,
}
