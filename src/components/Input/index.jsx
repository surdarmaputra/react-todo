import identity from 'lodash/identity'
import PropTypes from 'prop-types'

export default function Input({
  onChange = identity,
  value,
  ...nativeInputProps
}) {
  return <input onChange={onChange} value={value} {...nativeInputProps} />
}

Input.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
}
