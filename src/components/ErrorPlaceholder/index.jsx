import './index.css'

import identity from 'lodash/identity'
import PropTypes from 'prop-types'

import Button from '../Button'

/**
 * Renders an error placeholder UI with an optional retry button.
 *
 * @param {Object} props - The component props.
 * @param {boolean} [props.isRetryButtonVisible=true] - Determines whether the retry button should be visible.
 * @param {function} [props.onRetry] - The callback function to be executed when the retry button is clicked.
 * @returns {JSX.Element} - The JSX element representing the error placeholder UI.
 */
export default function ErrorPlaceholder({
  isRetryButtonVisible = true,
  onRetry = identity,
}) {
  return (
    <div className="error-placeholder">
      <div className="error-placeholder__title">
        Oops, something wrong! Please try again.
      </div>
      {isRetryButtonVisible && (
        <Button
          variant="danger"
          className="error-placeholder__action"
          onClick={onRetry}
        >
          Retry
        </Button>
      )}
    </div>
  )
}

ErrorPlaceholder.propTypes = {
  isRetryButtonVisible: PropTypes.bool,
  onRetry: PropTypes.func,
}
