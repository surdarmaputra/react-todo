import identity from 'lodash/identity'
import PropTypes from 'prop-types'

export default function Button({
  children,
  onClick = identity,
  ...buttonNativeProps
}) {
  return (
    <button onClick={onClick} {...buttonNativeProps}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
}
