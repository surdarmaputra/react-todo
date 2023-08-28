import { renderHook } from '@testing-library/react-hooks'
import { SWRConfig } from 'swr'

export default function renderAppHook(callback) {
  const wrapper = ({ children }) => (
    <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
  )
  return renderHook(callback, { wrapper })
}
