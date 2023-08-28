import './index.css'

import identity from 'lodash/identity'
import PropTypes from 'prop-types'

/**
 * Renders a button with customizable props and loading state.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content within the button.
 * @param {string} [props.className=''] - Additional CSS classes for styling the button.
 * @param {boolean} [props.isLoading=false] - Determines whether the button is in loading state.
 * @param {string} [props.loadingPlaceholder='Loading...'] - The text to display when the button is in loading state.
 * @param {function} [props.onClick] - The callback function to be executed when the button is clicked.
 * @param {string} [props.variant='primary'] - The variant of the button (e.g., "primary", "secondary", "danger").
 * @param {any} [props.buttonNativeProps] - Additional native props to be passed to the button element.
 * @returns {JSX.Element} - The JSX element representing the button.
 */
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
