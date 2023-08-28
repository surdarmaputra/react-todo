import './index.css'

import identity from 'lodash/identity'
import PropTypes from 'prop-types'
export default function Button({
  children,
  className = '',
  isLoading = false,
  loadingPlaceholder = 'Loading...',
  onClick = identity,
  variant = 'primary',
  ...buttonNativeProps
}) {
  const variantClassName = {
    primary: '',
    secondary: 'button--secondary',
    danger: 'button--danger',
  }[variant]

  return (
    <button
      className={`button ${variantClassName} ${className}`}
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
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  loadingPlaceholder: PropTypes.node,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
}
