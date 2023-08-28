import identity from 'lodash/identity'
import PropTypes from 'prop-types'

export default function Input({ onChange = identity, value }) {
  return <input onChange={onChange} value={value} />
}

Input.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
}
