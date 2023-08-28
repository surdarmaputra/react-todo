import identity from 'lodash/identity'
import PropTypes from 'prop-types'

export default function Button({ children, onClick = identity }) {
  return <button onClick={onClick}>{children}</button>
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
}
