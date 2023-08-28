import './index.css'

import identity from 'lodash/identity'
import PropTypes from 'prop-types'

import Button from '../Button'
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
