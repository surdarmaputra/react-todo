import identity from 'lodash/identity'
import PropTypes from 'prop-types'

export default function Button({
  children,
  isLoading = false,
  loadingPlaceholder = 'Loading...',
  onClick = identity,
  ...buttonNativeProps
}) {
  return (
    <button
      disabled={buttonNativeProps.disabled || isLoading}
      onClick={onClick}
      {...buttonNativeProps}
    >
      {isLoading ? loadingPlaceholder : children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  loadingPlaceholder: PropTypes.node,
  onClick: PropTypes.func,
}
